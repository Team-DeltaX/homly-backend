import express from "express";
import { AddSpecialResrvation } from "../controllers/PrimaryAdminController";

const SpecialReservationRouter = express.Router ();
SpecialReservationRouter.post("/",AddSpecialResrvation)
export {SpecialReservationRouter}