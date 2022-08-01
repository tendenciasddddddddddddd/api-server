const { authJwt } = require("../middleware");
const controller = require("../controllers/ventas.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/venta/list", controller.list);
  app.post("/api/venta/add", controller.add);
  app.get("/api/venta/query", controller.query);
  app.get("/api/venta/queryDetalles", controller.queryDetalles);
  app.get("/api/venta/grafico12Meses", controller.grafico12Meses);
  app.get("/api/venta/consultaFechas", controller.consultaFechas);
  app.put("/api/venta/update", controller.update);
  app.put("/api/venta/activate", controller.activate);
  app.put("/api/venta/deactivate", controller.deactivate);
  app.delete("/api/venta/remove/:id", controller.remove);
};