import { Router } from "express";
import {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

// Create a new income
router.route("/create").post(verifyJWT, createIncome);

// Get all incomes for the logged-in user
router.route("/all").get(verifyJWT, getIncomes);

// Get a single income by ID
router.route("/:id").get(verifyJWT, getIncome);

// Update income by ID
router.route("/:id/update").put(verifyJWT, updateIncome);

// Delete income by ID
router.route("/:id/delete").delete(verifyJWT, deleteIncome);

export default router;
