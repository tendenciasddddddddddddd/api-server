const nodemailer = require('nodemailer');
const ejs = require("ejs");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'inventariotesis@gmail.com', // generated ethereal user
      pass: 'kphsvsxryhfrlwvw', // generated ethereal password
    },
  });


const sendMail = async (user, code) => {
  try {
      await transporter.sendMail({
          from: '"CREDITOS BRYAN" <inventariotesis@gmail.com>', 
          to : `${user}`,
          subject: "RESETEAR CONTRASEÑAS", 
          text: code
        });
        
  } catch (error) {
      console.log('fallo email');
  }

}

exports.sendMail = (user, code) => sendMail(user, code);