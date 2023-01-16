module.exports = (sequelize, Sequelize) => {
    const categoria = sequelize.define("ubicacion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING
      },

      estado :{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
    return categoria;
  };