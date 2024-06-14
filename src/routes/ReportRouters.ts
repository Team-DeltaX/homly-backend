import express from "express";
import { getGeneratedReport,getHolidayHomeId,getReservationReport } from "../controllers/ReportController";

const ReportsRouter = express.Router();

ReportsRouter.get("/report/income", getGeneratedReport);
ReportsRouter.get("/HHnames", getHolidayHomeId);
ReportsRouter.get("/report/reservation", getReservationReport);



export { ReportsRouter };
