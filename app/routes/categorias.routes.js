const { authJwt } = require("../middleware");
const controller = require("../controllers/categoria.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/categoria/list", controller.list);
  app.post("/api/categoria/add", controller.add);
  app.get("/api/categoria/query", controller.query);
  app.put("/api/categoria/update", controller.update);
  app.put("/api/categoria/activate", controller.activate);
  app.put("/api/categoria/deactivate", controller.deactivate);
  app.delete("/api/categoria/remove/:id", controller.remove);
};