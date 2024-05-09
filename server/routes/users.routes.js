import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/api/users", getUsers);

router.get("/api/users/:id", getUserById);

router.post("/api/users", createUser);

router.delete("/api/users/:id", deleteUser);

router.put("/api/users/:id", updateUser);

export default router;
