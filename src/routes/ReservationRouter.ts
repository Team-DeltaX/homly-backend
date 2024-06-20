import express from "express";
import { getReservation, AddResrvation, AddSpecialResrvation, getHolidayHomeNames, getRooms, getHalls, AddComplaint,getAvailableRooms, getAvailableHalls, getTotalRoomRental, CompletePayment, getUserFromEmployee, getRefund, addRefundByUser, UpdateRefundByAdmin, getRefundById} from "../controllers/ReservationController"
import { getOngoingReservation, getPastReservation, getSpecialReservation, getCanceledReservation } from "../controllers/PrimaryAdminController";

const ReservationRouter = express.Router ();

ReservationRouter.get("/admin/auth/reservation/",getReservation);
ReservationRouter.post("/user/auth/reservation",AddResrvation);
ReservationRouter.post("/admin/auth/specialreservation",AddSpecialResrvation);
ReservationRouter.get("/user/reservation/holidayhomes",getHolidayHomeNames);
ReservationRouter.get("/user/reservation/rooms",getRooms);
ReservationRouter.get("/user/reservation/halls",getHalls);
ReservationRouter.post("/admin/auth/reservation/AddComplaint",AddComplaint);
ReservationRouter.get("/admin/auth/reservation/ongoing",getOngoingReservation);
ReservationRouter.get("/admin/auth/reservation/past",getPastReservation);
ReservationRouter.get("/admin/auth/reservation/special",getSpecialReservation);
ReservationRouter.get("/admin/auth/reservation/cancelled",getCanceledReservation);
ReservationRouter.get("/user/reservation/availableRooms",getAvailableRooms);
ReservationRouter.get("/user/reservation/availableHalls",getAvailableHalls);
ReservationRouter.get("/user/reservation/getTotalRoomRental/:HolidayHomeId",getTotalRoomRental);
ReservationRouter.put("/user/auth/reservation/completePayment",CompletePayment);
ReservationRouter.get("/admin/auth/reservation/employee/:serviceno",getUserFromEmployee);
ReservationRouter.get("/admin/auth/reservation/refund",getRefund);
ReservationRouter.post("/user/auth/reservation/addRefundByUser",addRefundByUser);
ReservationRouter.put("/admin/auth/reservation/updateRefundByAdmin",UpdateRefundByAdmin);
ReservationRouter.get("/user/auth/reservation/getRefundById/:reservationNo",getRefundById);
ReservationRouter.get("/admin/auth/reservation/getRefundById/:reservationNo",getRefundById);

export {ReservationRouter}