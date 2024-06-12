import express from "express";
// import { getHolidayHomes } from "../controllers/HolidayHomeController";

import { getHolidayHomes, getHolidayHomesDetails, createHolidayHome, getSelectedRooms, getRoom, getRoomRental, updateHolidayHome, getHolidayHomeNames, getReservationDetails, getReservedRooms } from "../controllers/HolidayHomeController";
import { approveHH, getNotApprovedHomes, rejectHH, } from "../controllers/PrimaryAdminController";
import { HolidayHome } from "../entities/HolidayHome";



const HolidayHomeRouter = express.Router();
HolidayHomeRouter.delete("/reject", rejectHH)
HolidayHomeRouter.put("/accept", approveHH)
HolidayHomeRouter.get("/pending", getNotApprovedHomes)
HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/reserved/", getReservedRooms);
HolidayHomeRouter.get("/reservation/:HolidayHomeId", getReservationDetails);
HolidayHomeRouter.get("/names", getHolidayHomeNames);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails);
HolidayHomeRouter.get("/:HolidayHomeId/:unitCode", getSelectedRooms);
HolidayHomeRouter.get("/room/:HolidayHomeId/:roomCode", getRoom);
HolidayHomeRouter.get("/rental/:HolidayHomeId/:HRUId", getRoomRental);

HolidayHomeRouter.post("/", createHolidayHome);
HolidayHomeRouter.post("/update", updateHolidayHome)



export { HolidayHomeRouter }