const auth = require("../authorization/authorization.js");

module.exports = (app) => {
    const emergencyContact = require("../controllers/emergencyContact.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Add routes for later
    router.post("/", [authenticate], emergencyContact.create);

    router.get("/", [authenticate], emergencyContact.findAll);

    router.get("/:id", [authenticate], emergencyContact.findOne);

    router.put("/:id", [authenticate], emergencyContact.update);

    router.delete("/:id", [authenticate], emergencyContact.delete);

    router.delete("/", [authenticate], emergencyContact.deleteAll);
    
    app.use("/EsportsAPI/emergencyContacts", router);
}