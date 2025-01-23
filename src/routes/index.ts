import express from "express";
import prospectsRoutes from "./prospectsRoutes";
import routesRoutes from "./routesRoutes";

const router = express.Router();

router.use("/prospects", prospectsRoutes);
router.use("/routes", routesRoutes);

export default router;
