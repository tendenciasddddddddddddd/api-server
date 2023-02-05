const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Auditoria = db.auditoria;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'inventariotesis@gmail.com', // generated ethereal user
    pass: 'kphsvsxryhfrlwvw', // generated ethereal password
  },
});

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    nombre : req.body.nombre,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    num_documento : req.body.num_documento,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      //---------------------PUENTE AUDITORIA ------------------------------
      var datetime = new Date().toISOString();
      Auditoria.create(
        {
          usuario: user.nombre,
          tipo: 'Ingreso al sistema',
          fecha: datetime.toString(),
          documento: user.id,
        },
        {
          fields: ["usuario", "tipo","fecha", "documento"],
        }
      )
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      //---------------------SALIDA AUDITORIA ------------------------------
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        var tokenReturn = jwt.sign({ id: user.id, rol: authorities[0], email: user.nombre }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        console.log("authorities: ", authorities[0]);
        res.status(200).send({
          user,tokenReturn
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.contrasenia = async (req, res) => {
  try {
   const user = await User.findOne({
     where: { 
       email: req.body.email
     },
   });
   if (!user) {
     return res.status(404).send({ message: "User Not found." });
   }
   let code = generateRandomString()
   sendMail(req.body.email, code)
   let contra = bcrypt.hashSync(code, 8)
   const reg = await User.update(
     { password :  contra},
     { where: { id: user.id } }
   );
   res.json("ok");
  } catch (error) {
   console.log(error)
   res.status(500).json({
    
     message: error.message,
   });
  }
 };
 
 exports.rescontrasenia = async (req, res) => {
   try {
    const user = await User.findOne({
      where: { 
        email: req.body.email
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    let contra = bcrypt.hashSync(req.body.password, 8)
    const reg = await User.update(
      { password :  contra},
      { where: { id: user.id } }
    );
    res.json("ok");
   } catch (error) {
    console.log(error)
    res.status(500).json({
     
      message: error.message,
    });
   }
  };
 
 const generateRandomString = (num) => {
   let result1 = Math.random().toString(36).substring(0, num);
   return result1;
 }