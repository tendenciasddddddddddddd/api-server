const db = require("../models");
const Op = require('../models').Sequelize.Op;
const Ventas = db.ventas;
const Detalles = db.detalles;
const Personas = db.personas;
const User = db.user;
const Articulo = db.articulos;

async function disminuirStock(idarticulo,cantidad){
  let {stock}=await Articulo.findOne({ 
    where: {
     id:idarticulo
    }
  });
  let nStock=parseInt(stock)-parseInt(cantidad);
  await Articulo.update({stock:nStock},  { where: { id: idarticulo } });
}

async function aumentarStock(idarticulo,cantidad){
  let {stock}=await Articulo.findOne({ 
    where: {
     id:idarticulo
    }
  });
  let nStock=parseInt(stock)+parseInt(cantidad);
  await Articulo.update({stock:nStock},  { where: { id: idarticulo } });
}

async function list(req, res) {
  try {
    const reg = await Ventas.findAll({ include: [{model: Personas},{model: User}] });
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { tipo_comprobante, serie_comprobante,num_comprobante,impuesto,total,personaId,userId } = req.body;
    try {
        const newVentas = await Ventas.create(
        {
          tipo_comprobante,
          serie_comprobante,
          num_comprobante,
          impuesto,
          total,
          personaId,
          userId
        },
        {
          fields: ["tipo_comprobante", "serie_comprobante","num_comprobante", "impuesto","total","personaId","userId"],
        }
      ); 
        let detalles=req.body.detalles;
        detalles.map(async(x)=> {
            const { nombre, cantidad,precio,descuento,articuloId } = x;
            const ventaId = newVentas.id
            await Detalles.create({
                nombre, cantidad,precio,descuento,articuloId, ventaId 
            },
            {
              fields: ["nombre", "cantidad","precio", "descuento","articuloId","ventaId"],
            })
            disminuirStock(articuloId, cantidad);
        }); 

      return res.json(newVentas);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
    res.json("received");
  }
  async function query(req, res) {
    const  id = req.query.id;
    try {
      const red = await Ventas.findOne({
        where: {
          id,
        },
      });
      res.json(red);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async function queryDetalles(req, res) {
    const  id = req.query.id;
    try {
      const red = await Detalles.findAll({
        where: {
            ventaId: id
        },
      });
      res.json(red);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async function grafico12Meses(req, res) {
    try {
      const red = await Ventas.findAll();
      res.json(red);
    } catch (error) {
        console.log(error)
      res.status(500).json({
        message: error.message,
      });
    }
  }
 const update = async (req, res) => {
    try {
      const id = req.body.id;
      const reg = await Ventas.update(
        { nombre: req.body.nombre, descripcion : req.body.descripcion },
        { where: { id: id } }
      );
      res.json(reg);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  const activate = async (req, res) => {
    try {
      const id = req.body.id;
      const reg = await Ventas.update(
        { estado:true },
        { where: { id: id } }
      );
      res.json(reg);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };
  const deactivate = async (req, res) => {
    try {
      const id = req.body.id;
      const reg = await Ventas.update(
        { estado:false },
        { where: { id: id } }
      );
      res.json(reg);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

 async function remove(req, res) {
    const { id } = req.params;
    try {
      const ress = await Detalles.findAll({ where: { ventaId: id, },});
      ress.forEach( 
        (x) => { 
          aumentarStock(x.articuloId, x.cantidad);
        }
      );
       
      await Detalles.destroy({
        where: {
            ventaId: id,
        },
      });
      await Ventas.destroy({
        where: {
          id,
        },
       
      });
     
      return res.sendStatus(204);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
  async function consultaFechas(req, res) {
    let start= req.query.start;
    let end= req.query.end;
    try {
      const red = await Ventas.findAll({
        where: {
            createdAt:{
                [Op.between]: [start, end],  
            }
        },
        include: [{model: Personas},{model: User}]
      });
      res.json(red);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

module.exports = {list, add, query, update, activate, deactivate, remove,queryDetalles, grafico12Meses, consultaFechas};

