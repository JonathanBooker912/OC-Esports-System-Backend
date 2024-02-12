import formController from "../controllers/form.controller.js";
import signedFormController from "../controllers/signedForm.controller.js";
import { authenticate, isAdmin } from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Create a new Form
router.post("/", [authenticate, isAdmin], formController.create);

// Update one form
router.put("/:id", [authenticate, isAdmin], formController.update);

// Delete one form
router.delete("/:id", [authenticate, isAdmin], formController.delete);

// Get all forms
router.get("/", [authenticate], formController.findAll);

// Get one form
router.get("/:id", [authenticate], formController.findOne);

router.get(
  "/user/:userId/form/:formVersionId",
  signedFormController.modifyAndReturn,
);

export default router;
