import express from "express";
import { getGeneratedReport,getHolidayHomeId,getReservationReport,getBlackListHistory } from "../controllers/ReportController";

const ReportsRouter = express.Router();

ReportsRouter.get("/report/income", getGeneratedReport);
ReportsRouter.get("/HHnames", getHolidayHomeId);
ReportsRouter.get("/report/reservation", getReservationReport);
ReportsRouter.get("/report/blacklist", getBlackListHistory);




export { ReportsRouter };
