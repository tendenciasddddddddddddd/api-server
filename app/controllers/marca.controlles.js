const db = require("../models");
const Marca = db.marca;
const Articulos = db.articulos;

async function list(req, res) {
  try {
    const reg = await Marca.findAll();
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre, descripcion } = req.body;
    try {
      let newMarca = await Marca.create(
        {
          nombre,
          descripcion,
        },
        {
          fields: ["nombre", "descripcion"],
        }
      );
      return res.json(newMarca);
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
      const project = await Marca.findOne({
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
      const reg = await Marca.update(
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
      const reg = await Marca.update(
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
      const reg = await Marca.update(
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
      await Marca.destroy({
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

