const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const controller2 = require("../controllers/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/usuario/list", controller.list);
  app.post("/api/usuario/add", controller2.signup);
  app.get("/api/usuario/query", controller.query);
  app.put("/api/usuario/update", controller.update);
  app.put("/api/usuario/activate", controller.activate);
  app.put("/api/usuario/deactivate", controller.deactivate);
  app.delete("/api/usuario/remove/:id", controller.remove);
};