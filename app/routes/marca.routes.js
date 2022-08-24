const { authJwt } = require("../middleware");
const controller = require("../controllers/marca.controlles");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/marca/list", controller.list);
  app.post("/api/marca/add", controller.add);
  app.get("/api/marca/query", controller.query);
  app.put("/api/marca/update", controller.update);
  app.put("/api/marca/activate", controller.activate);
  app.put("/api/marca/deactivate", controller.deactivate);
  app.delete("/api/marca/remove/:id", controller.remove);
};