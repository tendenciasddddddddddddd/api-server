const { authJwt } = require("../middleware");
const controller = require("../controllers/personas.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/persona/listProveedores", controller.listProveedores);
  app.get("/api/persona/listClientes", controller.listClientes);
  app.post("/api/persona/add",authJwt.verifyToken, controller.add);
  app.get("/api/persona/query", controller.query);
  app.put("/api/persona/update", controller.update);
  app.put("/api/persona/activate", controller.activate);
  app.put("/api/persona/deactivate", controller.deactivate);
  app.delete("/api/persona/remove/:id",authJwt.verifyToken, controller.remove);
};