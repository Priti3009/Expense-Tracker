import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createExpense,getExpense,updateExpense,deleteExpense } from "../controllers/expense.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,createExpense)

router.route("/all").get(verifyJWT,getExpense)

router.route("/:id/update").put(verifyJWT,updateExpense)

router.route("/:id/delete").delete(verifyJWT,deleteExpense)

export default router;