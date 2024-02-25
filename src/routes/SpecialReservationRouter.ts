import express from "express";
import { AddSpecialReservation } from "../controllers/SpecialReservaionController";

const SpecialReservationRouter = express.Router();
SpecialReservationRouter.post("/",AddSpecialReservation)
export {SpecialReservationRouter}