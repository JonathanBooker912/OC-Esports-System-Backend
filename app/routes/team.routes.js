module.exports = (app) => {
  const teams = require("../controllers/team.controller.js");
  const { authenticate, isAdmin } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Team
  router.post("/", [authenticate], teams.create);

  router.put("/:id", [authenticate], teams.update);

  router.delete("/:id", [authenticate, isAdmin], teams.delete);

  // Get all teams
  router.get("/", [authenticate], teams.findAll);

  // Get one team
  router.get("/:id", [authenticate], teams.findOne);

  app.use("/EsportsAPI/teams", router);
};