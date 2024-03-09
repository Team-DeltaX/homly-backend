import express from "express";
import {getReservation,AddResrvation,getHolidayHomeNames, getRooms, AddComplaint} from "../controllers/ReservationController"

const ReservationRouter = express.Router ();

ReservationRouter.get("/reservation/",getReservation)
ReservationRouter.post("/auth/reservation",AddResrvation)
ReservationRouter.get("/reservation/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/reservation/rooms",getRooms);
ReservationRouter.post("/reservation/AddComplaint",AddComplaint);

export {ReservationRouter}