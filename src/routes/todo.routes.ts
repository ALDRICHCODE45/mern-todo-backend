import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
} from "../controllers/todocontrollers/todos";
import { check } from "express-validator";
import { FieldsValidate } from "../middlewares/FieldsValidate";
import { validarJWT } from "../middlewares/validateJWT";

export const router = Router();

router.get(
  "/:id",
  [check("id", "id is required").isMongoId(), FieldsValidate],
  getTodos
);
router.post(
  "/createTodo",
  [
    check("name", "name is required").not().isEmpty(),
    FieldsValidate,
    validarJWT,
  ],
  createTodo
);
router.put("/update/:id", updateTodo);
router.delete("/deleteTodo");
