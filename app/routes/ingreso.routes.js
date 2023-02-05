const { authJwt } = require("../middleware");
const controller = require("../controllers/ingreso.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/ingreso/list", controller.list);
  app.post("/api/ingreso/add",authJwt.verifyToken, controller.add);
  app.get("/api/ingreso/query", controller.query);
  app.get("/api/ingreso/reporte", controller.reporte);
  app.get("/api/ingreso/queryDetalles", controller.queryDetalles);
  app.get("/api/ingreso/grafico12Meses", controller.grafico12Meses);
  app.get("/api/ingreso/consultaFechas", controller.consultaFechas);
  app.put("/api/ingreso/update", controller.update);
  app.put("/api/ingreso/activate", controller.activate);
  app.put("/api/ingreso/deactivate", controller.deactivate);
  app.delete("/api/ingreso/remove/:id",authJwt.verifyToken, controller.remove);
};