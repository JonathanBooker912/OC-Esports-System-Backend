module.exports = (app) => {
  const titles = require("../controllers/title.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", titles.create);

  router.get("/", titles.findAll);

  app.use("/EsportsAPI/titles", router);
};
