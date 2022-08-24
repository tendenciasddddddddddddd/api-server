module.exports = (sequelize, Sequelize) => {
    const ingresos = sequelize.define("ingreso", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_comprobante: {
        type: Sequelize.STRING
      },
      serie_comprobante : {
        type: Sequelize.STRING
      },
      num_comprobante : {
        type: Sequelize.STRING
      },
      impuesto : {
        type: Sequelize.DECIMAL
      },
      total : {
        type: Sequelize.DECIMAL
      },
      estado :{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
    return ingresos;
  };