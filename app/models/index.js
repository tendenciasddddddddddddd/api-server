const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);
db.articulos = require("./articulos.model.js")(sequelize, Sequelize);
db.personas = require("./personas.model")(sequelize, Sequelize);
db.proveedors = require("./proveedors.model.js")(sequelize, Sequelize);
db.ventas = require("./ventas.model.js")(sequelize, Sequelize);
db.detalles = require("./detalles.model.js")(sequelize, Sequelize);

//-----------Relacion de ROLES Y USUARIOS MUCHOS A MUCHOS------------------------
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//-----------Relacion de CATEGORIAS Y ARTICULOS UNO A MUCHOS------------------------
db.categoria.hasMany(db.articulos, {
  foreinkey: "categId",
  sourceKey: "id",
});
db.articulos.belongsTo(db.categoria, { foreinkey: "categId", targetId: "id" });

//-----------Relacion de PERSONAS Y PROVEEDORS UNO A MUCHOS------------------------
db.personas.hasMany(db.proveedors, {
  foreinkey: "proveedors",
  sourceKey: "id",
});
db.proveedors.belongsTo(db.personas, { foreinkey: "proveedors", targetId: "id" });

//-----------Relacion de  VENTAS PERSONAS PROVEEDORS UNO A MUCHOS------------------------
db.personas.hasMany(db.ventas, {
  foreinkey: "clientId",
  sourceKey: "id",
});
db.ventas.belongsTo(db.personas, { foreinkey: "clientId", targetId: "id" });

db.user.hasMany(db.ventas, {
  foreinkey: "userId",
  sourceKey: "id",
});
db.ventas.belongsTo(db.user, { foreinkey: "userId", targetId: "id" });

//-----------Relacion de VENTAS Y DETALLES UNO A MUCHOS------------------------
db.ventas.hasMany(db.detalles, {
  foreinkey: "ventasId",
  sourceKey: "id",
});
db.detalles.belongsTo(db.ventas, { foreinkey: "ventasId", targetId: "id" });

db.articulos.hasMany(db.detalles, {
  foreinkey: "articulId",
  sourceKey: "id",
});
db.detalles.belongsTo(db.articulos, { foreinkey: "articulId", targetId: "id" });


db.ROLES = ["Vendedor", "Administrador", "Almacenero"];
module.exports = db;