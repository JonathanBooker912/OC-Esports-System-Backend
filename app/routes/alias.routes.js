module.exports = (app) => {
    const alias = require("../controllers/alias.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Create routes


    app.use("/EsportsAPI/aliases", router);
}