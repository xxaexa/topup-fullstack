import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
  updateTransaction
} from "../controllers/transactionController";

const router = express.Router();

// router.use(authenticateToken); 


router.post("/", createTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.get("/update-status/:id", updateTransactionStatus);
router.delete("/:id", deleteTransaction);

export default router;
