const db = require("../models");
const Categoria = db.categoria;
const Articulos = db.articulos;

async function list(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre, descripcion } = req.body;
    try {
      let newCategoria = await Categoria.create(
        {
          nombre,
          descripcion,
        },
        {
          fields: ["nombre", "descripcion"],
        }
      );
      return res.json(newCategoria);
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
      const project = await Categoria.findOne({
        where: {
          id,
        },
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

 const update = async (req, res) => {
    try {
      const id = req.body.id;
      const reg = await Categoria.update(
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
      const reg = await Categoria.update(
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
      const reg = await Categoria.update(
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
                categoriumId: id,
            },
          });
      await Categoria.destroy({
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

module.exports = {list, add, query, update, activate, deactivate, remove,};

