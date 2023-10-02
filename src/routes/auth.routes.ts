import { Router } from "express";
import { createUser, deleteUser, renewToken, userLogin } from "../controllers";
import { check } from "express-validator";
import { FieldsValidate } from "../middlewares/FieldsValidate";
import {validarJWT} from "../middlewares/validateJWT";

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
router.get("/renew",validarJWT , renewToken);

router.delete("/:id", deleteUser);
