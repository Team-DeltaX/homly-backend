import express from "express";
import {getReservation,AddResrvation,getHolidayHomeNames, getRooms} from "../controllers/ReservationController"

const ReservationRouter = express.Router ();

ReservationRouter.get("/",getReservation)
ReservationRouter.post("/",AddResrvation)
ReservationRouter.get("/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/rooms",getRooms);

export {ReservationRouter}