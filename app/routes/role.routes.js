module.exports = (app) => {
    const role = require("../controllers/role.controller.js");
    const {
        authenticate, 
        isAdmin,

    } = require("../authorization/authorization.js");

    var router = require("express").Router();

    // Create a new Role
    router.post("/", [authenticate, isAdmin], role.create);

    // Retrieve all Role
    router.get("/", [authenticate, isAdmin], role.findAll);

    // Retrieve a single Role with id
    router.get("/:id", [authenticate], role.findOne);

    // Update a Role with id
    router.put("/:id", [authenticate, isAdmin], role.update);

    // Delete a Role with id
    router.delete("/:id", [authenticate, isAdmin], role.delete);

    app.use("/EsportsAPI/role", router);
}