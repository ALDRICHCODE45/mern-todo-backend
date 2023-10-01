import { Router } from "express";
import { createUser, deleteUser, userLogin } from "../controllers";
import { check } from "express-validator";
import { FieldsValidate } from "../middlewares/FieldsValidate";

export const router = Router();

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("password", "pasword is required")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("email", "email is required").isEmail(),
    FieldsValidate,
  ],
  createUser
);
router.post(
  "/login",
  [
    check("email", "name is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    FieldsValidate,
  ],
  userLogin
);
router.delete("/:id", deleteUser);
