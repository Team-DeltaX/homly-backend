import express from "express";
import { getReservation, AddResrvation, AddSpecialResrvation, getHolidayHomeNames, getRooms, getHalls, AddComplaint,getAvailableRooms, getAvailableHalls, getTotalRoomRental} from "../controllers/ReservationController"
import {getOngoingReservation, getPastReservation} from "../controllers/PrimaryAdminController";


const ReservationRouter = express.Router ();

ReservationRouter.get("/admin/auth/reservation/",getReservation);
ReservationRouter.post("/user/auth/reservation",AddResrvation);
ReservationRouter.post("/admin/auth/specialreservation",AddSpecialResrvation);
ReservationRouter.get("/user/reservation/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/user/reservation/rooms",getRooms);
ReservationRouter.get("/user/reservation/halls",getHalls);
ReservationRouter.post("/admin/auth/reservation/AddComplaint",AddComplaint);
ReservationRouter.get("/admin/auth/reservation/ongoing",getOngoingReservation);
//ReservationRouter.get("/admin/auth/reservation/ongoingLocationAdmin",getOngoingReservationForAdmin);
ReservationRouter.get("/admin/auth/reservation/past",getPastReservation);
// ReservationRouter.post("/reservation/storeReservedRooms",storeReservedRooms);
ReservationRouter.get("/user/reservation/availableRooms",getAvailableRooms);
ReservationRouter.get("/user/reservation/availableHalls",getAvailableHalls);
ReservationRouter.get("/user/reservation/getTotalRoomRental/:HolidayHomeId",getTotalRoomRental);
//getTotalRoomRental
export {ReservationRouter}