module.exports = (sequelize, Sequelize) => {
    const Proveedors = sequelize.define("proveedors", {
      email: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      estado :{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      telefono : {
        type: Sequelize.STRING
      },
      direccion : {
        type: Sequelize.STRING
      },

    });
    return Proveedors;
  };