import express from "express";
import { contactValidation } from "../validations/contact.validation.js";
import ContactController from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.get("/", ContactController.getContacts);

contactRouter.get("/:id", ContactController.getContactById);

contactRouter.post("/", contactValidation, ContactController.createContact);

contactRouter.put("/:id", contactValidation, ContactController.updateContact);

contactRouter.delete("/:id", ContactController.deleteContact);

export default contactRouter;
