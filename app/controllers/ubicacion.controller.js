const db = require("../models");
const Ubicacion = db.ubicacion;
const Articulos = db.articulos;

async function list(req, res) {
  try {
    const ubicacion = await Ubicacion.findAll();
    res.json(ubicacion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre } = req.body;
    try {
      let newUbicacion = await Ubicacion.create(
        {
          nombre,
        },
        {
          fields: ["nombre"],
        }
      );
      return res.json(newUbicacion);
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
      const project = await Ubicacion.findOne({
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
      const reg = await Ubicacion.update(
        { nombre: req.body.nombre },
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
      const reg = await Ubicacion.update(
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
      const reg = await Ubicacion.update(
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
                ubicacionId: id,
            },
          });
      await Ubicacion.destroy({
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

