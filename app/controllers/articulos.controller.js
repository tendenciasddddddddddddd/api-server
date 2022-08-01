
const db = require("../models");
const Articulos = db.articulos;
const Categorias = db.categoria;


async function list(req, res) {
  try {
    const reg = await Articulos.findAll({ include: Categorias });
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre, descripcion, codigo, stock, precio_venta, categoriumId } = req.body;
    try {
      let reg = await Articulos.create(
        {
          nombre,
          descripcion,
          codigo,
          stock,
          precio_venta,
          categoriumId
        },
        {
          fields: ["nombre", "descripcion","codigo", "stock","precio_venta", "categoriumId"],
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

module.exports = {list, add, query, update, activate, deactivate, remove,queryCodigo};

