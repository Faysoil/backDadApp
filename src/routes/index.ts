import express from "express";
import prospectsRoutes from "./prospectsRoutes";
import routesRoutes from "./routesRoutes";
import csvRoutes from "./csvRoutes"
import routeCsvRoutes from "./routeCsvRoutes"
import routeStopRoutes from "./routeStopRoutes"

const router = express.Router();

router.use("/prospects", prospectsRoutes);
router.use("/routes", routesRoutes);
router.use("/csv", csvRoutes);
router.use("/routeCsv", routeCsvRoutes);
router.use("/stops", routeStopRoutes);

export default router;
