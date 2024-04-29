import express from "express";
import { getReservation, AddResrvation, AddSpecialResrvation, getHolidayHomeNames, getRooms, getHalls, AddComplaint,getAvailableRooms, getAvailableHalls, getTotalRoomRental} from "../controllers/ReservationController"
import {getOngoingReservation, getPastReservation} from "../controllers/PrimaryAdminController";


const ReservationRouter = express.Router ();

ReservationRouter.get("/reservation/",getReservation);
ReservationRouter.post("/auth/reservation",AddResrvation);
ReservationRouter.post("/specialreservation",AddSpecialResrvation);
ReservationRouter.get("/reservation/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/reservation/rooms",getRooms);
ReservationRouter.get("/reservation/halls",getHalls);
ReservationRouter.post("/reservation/AddComplaint",AddComplaint);
ReservationRouter.get("/reservation/ongoing",getOngoingReservation);
ReservationRouter.get("/reservation/past",getPastReservation);
// ReservationRouter.post("/reservation/storeReservedRooms",storeReservedRooms);
ReservationRouter.get("/reservation/availableRooms",getAvailableRooms);
ReservationRouter.get("/reservation/availableHalls",getAvailableHalls);
ReservationRouter.get("/reservation/getTotalRoomRental/:HolidayHomeId",getTotalRoomRental);
//getTotalRoomRental
export {ReservationRouter}