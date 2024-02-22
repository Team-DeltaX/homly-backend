import express from "express";
import {AddSpecialResrvation} from "../controllers/SpecialReservaionController"

const SpecialReservationRouter = express.Router ();
SpecialReservationRouter.post("/",AddSpecialResrvation)
export {SpecialReservationRouter}