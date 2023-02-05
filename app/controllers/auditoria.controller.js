const db = require("../models");
const Auditoria = db.auditoria;

async function list(req, res) {
  try {
    const categorias = await Auditoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


 async function remove(req, res) {
    const { id } = req.params;
    try {
      await Auditoria.destroy({
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

module.exports = {list,remove,};

