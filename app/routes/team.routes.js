module.exports = (app) => {
  const teams = require("../controllers/team.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Team
  router.post("/", teams.create);

  router.put("/:id", teams.update);

  router.delete("/:id", teams.delete);

  router.get("/", teams.findAll);

  app.use("/EsportsAPI/teams", router);
};
