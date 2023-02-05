const { authJwt } = require("../middleware");
const controller = require("../controllers/auditoria.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/auditoria/list", controller.list);
  app.delete("/api/auditoria/remove/:id", controller.remove);
};