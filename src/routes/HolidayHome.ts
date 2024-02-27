import express from "express";
import { getHolidayHomes, getHolidayHomesDetails, createHolidayHome } from "../controllers/HolidayHomeController";


const HolidayHomeRouter = express.Router();

HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails);
HolidayHomeRouter.post("/", createHolidayHome);


export { HolidayHomeRouter }