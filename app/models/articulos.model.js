module.exports = (sequelize, Sequelize) => {
    const articulos = sequelize.define("articulos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING
      },
      codigo : {
        type: Sequelize.STRING
      },
      stock : {
        type: Sequelize.INTEGER
      },
      precio_venta : {
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
    return articulos;
  };