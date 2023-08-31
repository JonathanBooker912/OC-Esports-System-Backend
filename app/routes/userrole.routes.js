module.exports = (app) => {
    const userrole = require("../controllers/userrole.controller.js");
    const {
      authenticate,
      isAdmin,
    } = require("../authorization/authorization.js");
  
    var router = require("express").Router();
  
    // Create a new PersonRole
    router.post("/", [authenticate, isAdmin], userrole.create);
  
    // Retrieve all PersonRole
    router.get("/", [authenticate, isAdmin], userrole.findAll);
  
    // Retrieve a single PersonRole with id
    router.get("/:id", [authenticate], userrole.findOne);
  
    // Update a PersonRole with id
    router.put("/:id", [authenticate, isAdmin], userrole.update);
  
    // Delete a PersonRole with id
    router.delete("/:id", [authenticate, isAdmin], userrole.delete);
  
    app.use("/EsportsAPI/userrole", router);
  };
  