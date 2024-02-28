import express from "express";
import {getSpecialReservation,AddSpecialResrvation} from "../controllers/SpecialReservaionController"

const SpecialReservationRouter = express.Router ();

SpecialReservationRouter.get("/",getSpecialReservation)
SpecialReservationRouter.post("/",AddSpecialResrvation)

export {SpecialReservationRouter}