module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
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
      num_documento :{
        type : Sequelize.STRING
      }

    });
    return User;
  };