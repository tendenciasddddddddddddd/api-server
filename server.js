const express = require("express");
var morgan = require('morgan')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
//db.sequelize.sync();
//  const Role = db.role;
//  db.sequelize.sync({force: true}).then(() => {
//    console.log('Drop and Resync Db');
//    initial();
//  });
//  function initial() {
//    Role.create({
//      id: 1,
//      name: "Vendedor"
//    });
 
//    Role.create({
//      id: 2,
//      name: "Administrador"
//    });
 
//    Role.create({
//      id: 3,
//      name: "Almacenero"
//    });
//  }
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/categorias.routes')(app);
require('./app/routes/articulos.routes')(app);
require('./app/routes/personas.routes')(app);
require('./app/routes/proveedors.routes')(app);
require('./app/routes/ventas.routes')(app);
require('./app/routes/ingreso.routes')(app);
require('./app/routes/marca.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});