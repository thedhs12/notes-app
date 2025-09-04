import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";

const router = express.Router();

router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
