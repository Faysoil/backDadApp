import express from "express";
import { createRoute, getRoutes, deleteRoute } from "../controllers/routesController";

const router = express.Router();

router.post("/", createRoute);
router.get("/", getRoutes);
router.delete("/:id", deleteRoute);

export default router;
