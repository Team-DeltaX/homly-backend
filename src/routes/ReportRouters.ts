import express from "express";
import { getGeneratedReport,getHolidayHomeId,getReservationReport,getBlackListHistory, getLocHolidayHomeId } from "../controllers/ReportController";

const ReportsRouter = express.Router();

ReportsRouter.get("/auth/report/income", getGeneratedReport);
ReportsRouter.get("/auth/HHnames", getHolidayHomeId);
ReportsRouter.get("/auth/locHHnames", getLocHolidayHomeId);
ReportsRouter.get("/auth/auth/report/reservation", getReservationReport);
ReportsRouter.get("/report/blacklist", getBlackListHistory);




export { ReportsRouter };
