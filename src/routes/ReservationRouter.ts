import express from "express";
import {getReservation,AddResrvation} from "../controllers/ReservationController"

const ReservationRouter = express.Router ();

ReservationRouter.get("/",getReservation)
ReservationRouter.post("/",AddResrvation)

export {ReservationRouter}