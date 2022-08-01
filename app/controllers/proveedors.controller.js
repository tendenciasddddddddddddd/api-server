const db = require("../models");
const Proveedors = db.proveedors;
const Personas = db.personas;

async function list(req, res) {
  try {
    const reg = await Proveedors.findAll({ include: Personas });
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function add(req, res) {
    const { nombre, email, telefono,direccion, personaId } = req.body;
    console.log(req.body)
    try {
      let newCategoria = await Proveedors.create(
        {
          nombre,
          email,
          telefono,
          direccion,
          personaId
        },
        {
          fields: ["nombre", "email","telefono", "direccion","personaId"],
        }
      );
      return res.json(newCategoria);
    } catch (error) {
        console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
    res.json("received");
  }
  async function query(req, res) {
    const { id } = req.query._id;
    try {
      const project = await Proveedors.findOne({
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
      const reg = await Proveedors.update(
        { 
            nombre: req.body.nombre,
            email : req.body.email,
            telefono : req.body.telefono,
            direccion : req.body.direccion,
            personaId : req.body.personaId,
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
      const reg = await Proveedors.update(
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
      const reg = await Proveedors.update(
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
      await Proveedors.destroy({
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

