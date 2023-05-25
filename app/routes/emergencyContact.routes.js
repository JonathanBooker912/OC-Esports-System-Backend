module.exports = (app) => {
    const emergencyContacts = require("../controllers/emergencyContact.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Add routes for later



    app.use("/EsportsAPI/emergencyContacts", router);
}