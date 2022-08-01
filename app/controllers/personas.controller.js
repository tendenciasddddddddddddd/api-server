const db = require("../models");
const Personas = db.personas;
const Proveedors = db.proveedors;

async function listProveedores(req, res) {
  try {
    const reg = await Personas.findAll({
        where: {
            tipo_persona: 'Proveedor'
        }
      });
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function listClientes(req, res) {
  try {
    const reg = await Personas.findAll({
        where: {
            tipo_persona: 'Cliente'
        }
      });
    res.json(reg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function add(req, res) {
    const { nombre, email, telefono,direccion, num_documento, tipo_documento,tipo_persona } = req.body;
    try {
      let newCategoria = await Personas.create(
        {
          nombre,
          email,
          telefono,
          direccion,
          num_documento,
          tipo_documento,
          tipo_persona
        },
        {
          fields: ["nombre", "email","telefono", "direccion","num_documento", "tipo_documento", "tipo_persona"],
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
      const project = await Personas.findOne({
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
      const reg = await Personas.update(
        { 
            nombre: req.body.nombre,
            email : req.body.email,
            telefono : req.body.telefono,
            direccion : req.body.direccion,
            num_documento : req.body.num_documento,
            tipo_documento : req.body.tipo_documento,
            tipo_persona : req.body.tipo_persona,
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
      const reg = await Personas.update(
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
      const reg = await Personas.update(
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
          personaId: id,
        },
      });
      await Personas.destroy({
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

module.exports = {listProveedores, add, query, update, activate, deactivate, remove,listClientes};

