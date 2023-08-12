module.exports = (app) => {
  const alias = require("../controllers/alias.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  //Create alias
  router.post("/:userId/alias", [authenticate], alias.create);

  //Find all aliases for a user
  router.get("/:userId/alias", [authenticate], alias.findAll);

  //Find one alias for a user
  router.get("/:userId/alias/:id", [authenticate], alias.findOne);

  //Update alias
  router.put("/:userId/alias/:id", [authenticate], alias.update);

  //Delete one alias
  router.delete("/:userId/alias/:id", [authenticate], alias.deleteOne);

  //Delete all aliases for one user
  router.delete("/:userId/alias", [authenticate], alias.deleteAll);

  app.use("/EsportsAPI/user", router);
};
