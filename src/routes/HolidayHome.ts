import express from "express";
import { getHolidayHomes, getHolidayHomesDetails, createHolidayHome, getSelectedRooms, getRoom } from "../controllers/HolidayHomeController";


const HolidayHomeRouter = express.Router();

HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails);
HolidayHomeRouter.get("/:HolidayHomeId/:unitCode", getSelectedRooms);
HolidayHomeRouter.get("/:HolidayHomeId/:roomCode", getRoom);
HolidayHomeRouter.post("/", createHolidayHome);


export { HolidayHomeRouter }