module.exports = (app) => {
    const alias = require("../controllers/alias.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Create alias
    router.post("/", [authenticate], alias.create);

    //Find all aliases
    router.get("/", [authenticate], alias.findAll);

    //Find one alias
    router.get("/:id", [authenticate], alias.findOne);

    //Update alias
    router.put("/:id", [authenticate], alias.update);

    //Delete one alias
    router.delete("/:id", [authenticate], alias.deleteOne);

    //Delete all aliases
    router.delete("/", [authenticate], alias.deleteAll);

    app.use("/", router);
}