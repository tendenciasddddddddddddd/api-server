const Op = require('../models').Sequelize.Op;
const db = require("../models");
const Articulos = db.articulos;
const Categorias = db.categoria;
const Marca = db.marca;


async function list(req, res) {
  try {
    const reg = await Articulos.findAll({ include: [{model:Categorias}, {model:Marca}]});
    res.json(reg);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre, descripcion,  codigo, stock, precio_venta, categoriumId, marcaId } = req.body;
    try {
      let reg = await Articulos.create(
        {
          nombre,
          descripcion,
          codigo,
          stock,
          precio_venta,
          categoriumId,
          marcaId
        },
        {
          fields: ["nombre", "descripcion","codigo", "stock","precio_venta", "categoriumId", "marcaId"],
        }
      );
      return res.json(reg);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
    res.json("received");
  }
  async function query(req, res) {
    const { id } = req.query._id;
    try {
      const reg = await Articulos.findOne({
        where: {
          id,
        },
      });
      res.json(reg);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async function queryCodigo(req, res) {
    try {
      const reg = await Articulos.findOne({
        where: {
          codigo:req.query.codigo
        },
      });
      res.json(reg);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async function listName(req, res) {
    try {
      var search = req.query.nombre
      const noPuncuationSearch = search?.replace(/[^A-Za-z0-9]+/g,'[^A-Za-z0-9]+');
      const reg = await Articulos.findAll({ 
        where: {
          nombre: {
            [Op.iRegexp]: noPuncuationSearch,
          },
        }, include:  [{model:Categorias}, {model:Marca}] });
      res.json(reg);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  
 const update = async (req, res) => {
    try {
      const id = req.body.id;
      const reg = await Articulos.update(
        { 
            nombre: req.body.nombre, 
            descripcion : req.body.descripcion,
            codigo : req.body.codigo,
            stock : req.body.stock,
            precio_venta : req.body.precio_venta,
            categoriumId : req.body.categoriumId,
        },
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
      const reg = await Articulos.update(
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
      const reg = await Articulos.update(
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
      await Articulos.destroy({
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

module.exports = {list, add, query, update, activate, deactivate, remove,queryCodigo, listName};

