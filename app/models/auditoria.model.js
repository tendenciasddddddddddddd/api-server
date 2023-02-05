module.exports = (sequelize, Sequelize) => {
    const auditoria = sequelize.define("auditoria", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario: {
        type: Sequelize.STRING
      },
      tipo : {
        type: Sequelize.STRING
      },
      fecha :{
        type: Sequelize.STRING
      },
      documento :{
        type: Sequelize.STRING
      },
    });
    return auditoria;
  };