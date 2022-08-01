module.exports = (sequelize, Sequelize) => {
    const categoria = sequelize.define("detalles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING
      },
      cantidad : {
        type: Sequelize.INTEGER
      },
      precio : {
        type: Sequelize.DECIMAL
      },
      descuento : {
        type: Sequelize.DECIMAL
      },
    });
    return categoria;
  };