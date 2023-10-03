const auth = require("../authorization/authorization.js");

module.exports = (app) => {
  const match = require("../controllers/match.controller.js");
  const { authenticate, isAdmin } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Match
  router.post("/", [authenticate], match.create);

  // Update one match
  router.put("/:id", [authenticate], match.update);

  // Delete one match
  router.delete("/:id",[authenticate, isAdmin], match.delete);

  // Get all matches
  router.get("/",[authenticate], match.findAll);

  // Get one match
  router.get("/:id",[authenticate], match.findOne);

  app.use("/EsportsAPI/match", router);
};