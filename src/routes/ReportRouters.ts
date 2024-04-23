import express from "express";
import { getGeneratedReport,getHolidayHomeId } from "../controllers/ReportController";

const ReportsRouter = express.Router();

ReportsRouter.get("/report/income", getGeneratedReport);
ReportsRouter.get("/HHnames", getHolidayHomeId);

export { ReportsRouter };
