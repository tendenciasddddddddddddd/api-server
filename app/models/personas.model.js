module.exports = (sequelize, Sequelize) => {
    const Personas = sequelize.define("personas", {
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
      num_documento :{
        type : Sequelize.STRING
      },
      tipo_documento : {
        type : Sequelize.STRING
      },
      tipo_persona : {
        type : Sequelize.STRING
      }

    });
    return Personas;
  };