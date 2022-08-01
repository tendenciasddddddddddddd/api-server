module.exports = (sequelize, Sequelize) => {
    const categoria = sequelize.define("categoria", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion : {
        type: Sequelize.STRING
      },
      estado :{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
    return categoria;
  };