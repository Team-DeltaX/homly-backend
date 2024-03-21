import express from "express";
import { getGeneratedReport } from "../controllers/ReportController";

const ReportsRouter = express.Router();

ReportsRouter.get("/report", getGeneratedReport);

export { ReportsRouter };
