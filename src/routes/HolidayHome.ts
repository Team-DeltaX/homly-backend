import express from "express";
// import { getHolidayHomes } from "../controllers/HolidayHomeController";

import {
  getHolidayHomes,
  getAllHolidayHomes,
  getHolidayHomesDetails,
  createHolidayHome,
  getSelectedRooms,
  getRoom,
  getRoomRental,
  updateHolidayHome,
  getHolidayHomeNames,
  getAllHolidayHomeNames,
  getReservationDetails,
  getReservedRooms,
  updateStatus,
} from "../controllers/HolidayHomeController";
import {
  approveHH,
  getNotApprovedHomes,
  rejectHH,
} from "../controllers/PrimaryAdminController";
import { HolidayHome } from "../entities/HolidayHome";

const HolidayHomeRouter = express.Router();
HolidayHomeRouter.put("/reject", rejectHH);
HolidayHomeRouter.put("/accept", approveHH);
HolidayHomeRouter.get("/pending", getNotApprovedHomes);
HolidayHomeRouter.get("/", getHolidayHomes);
HolidayHomeRouter.get("/all", getAllHolidayHomes);
HolidayHomeRouter.get("/reserved/", getReservedRooms);
HolidayHomeRouter.get("/reservation/:HolidayHomeId", getReservationDetails);
HolidayHomeRouter.get("/names", getHolidayHomeNames);
HolidayHomeRouter.get("/allnames", getAllHolidayHomeNames);
HolidayHomeRouter.get("/:HolidayHomeId", getHolidayHomesDetails);
HolidayHomeRouter.get("/:HolidayHomeId/:unitCode", getSelectedRooms);
HolidayHomeRouter.get("/room/:HolidayHomeId/:roomCode", getRoom);
HolidayHomeRouter.get("/rental/:HolidayHomeId/:HRUId", getRoomRental);

HolidayHomeRouter.post("/", createHolidayHome);
HolidayHomeRouter.post("/update", updateHolidayHome);
HolidayHomeRouter.post("/status", updateStatus);

export { HolidayHomeRouter };
