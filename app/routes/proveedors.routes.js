const { authJwt } = require("../middleware");
const controller = require("../controllers/proveedors.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/proveedor/list", controller.list);
  app.post("/api/proveedor/add", controller.add);
  app.get("/api/proveedor/query", controller.query);
  app.put("/api/proveedor/update", controller.update);
  app.put("/api/proveedor/activate", controller.activate);
  app.put("/api/proveedor/deactivate", controller.deactivate);
  app.delete("/api/proveedor/remove/:id", controller.remove);
};