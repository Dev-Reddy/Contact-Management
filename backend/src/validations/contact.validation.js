import { body, validationResult } from "express-validator";

export const contactValidation = async (req, res, next) => {
  // setup validation rules
  const rules = [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("jobTitle").notEmpty().withMessage("Job Title is required"),
  ];

  // run validation rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // check validation results
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).send({ message: errors.array() });
};
