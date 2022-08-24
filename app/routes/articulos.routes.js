const { authJwt } = require("../middleware");
const controller = require("../controllers/articulos.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/articulo/list", controller.list);
  app.get("/api/articulo/queryCodigo", controller.queryCodigo);
  app.get("/api/articulo/listName", controller.listName);
  app.post("/api/articulo/add", controller.add);
  app.get("/api/articulo/query", controller.query);
  app.put("/api/articulo/update", controller.update);
  app.put("/api/articulo/activate", controller.activate);
  app.put("/api/articulo/deactivate", controller.deactivate);
  app.delete("/api/articulo/remove/:id", controller.remove);
};