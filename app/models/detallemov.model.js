module.exports = (sequelize, Sequelize) => {
    const detall = sequelize.define("detallemov", {
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

    });
    return detall;
  };