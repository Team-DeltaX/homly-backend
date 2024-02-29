import express from "express";
// import { getHolidayHomes } from "../controllers/HolidayHomeController";
import { getHolidayHomes, getHolidayHomesDetails, createHolidayHome, getSelectedRooms, getRoom, getRoomRental } from "../controllers/HolidayHomeController";


const HolidayHomeRouter = express.Router();

HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails);
HolidayHomeRouter.get("/:HolidayHomeId/:unitCode", getSelectedRooms);
HolidayHomeRouter.get("/room/:HolidayHomeId/:roomCode", getRoom);
HolidayHomeRouter.get("/rental/:HolidayHomeId/:HRUId", getRoomRental);

HolidayHomeRouter.post("/", createHolidayHome);


export { HolidayHomeRouter }