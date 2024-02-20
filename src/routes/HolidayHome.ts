import express from "express";
import { getHolidayHomes, getHolidayHomesDetails } from "../controllers/HolidayHomeController";


const HolidayHomeRouter = express.Router();

HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails)


export { HolidayHomeRouter }