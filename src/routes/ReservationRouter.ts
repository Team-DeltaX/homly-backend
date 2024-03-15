import express from "express";
import {getReservation, AddResrvation, getHolidayHomeNames, getRooms, AddComplaint,getAvailableRooms} from "../controllers/ReservationController"
import {getOngoingReservation, getPastReservation} from "../controllers/PrimaryAdminController";

const ReservationRouter = express.Router ();

ReservationRouter.get("/reservation/",getReservation)
ReservationRouter.post("/auth/reservation",AddResrvation)
ReservationRouter.get("/reservation/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/reservation/rooms",getRooms);
ReservationRouter.post("/reservation/AddComplaint",AddComplaint);
ReservationRouter.get("/reservation/ongoing",getOngoingReservation);
ReservationRouter.get("/reservation/past",getPastReservation);
// ReservationRouter.post("/reservation/storeReservedRooms",storeReservedRooms);
ReservationRouter.get("/reservation/availableRooms",getAvailableRooms);

export {ReservationRouter}