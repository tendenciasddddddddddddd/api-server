const { authJwt } = require("../middleware");
const controller = require("../controllers/ubicacion.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/ubicacion/list", controller.list);
  app.post("/api/ubicacion/add", controller.add);
  app.get("/api/ubicacion/query", controller.query);
  app.put("/api/ubicacion/update", controller.update);
  app.put("/api/ubicacion/activate", controller.activate);
  app.put("/api/ubicacion/deactivate", controller.deactivate);
  app.delete("/api/ubicacion/remove/:id", controller.remove);
};