import express from "express";
import {getReservation,AddResrvation,getHolidayHomeNames} from "../controllers/ReservationController"

const ReservationRouter = express.Router ();

ReservationRouter.get("/",getReservation)
ReservationRouter.post("/",AddResrvation)
ReservationRouter.get("/holidayhomes",getHolidayHomeNames);

export {ReservationRouter}