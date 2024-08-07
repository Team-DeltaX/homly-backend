import schedule from "node-schedule";
import {
  deleteExpiredOTPs,
  deleteExpiredVerificationCodes,
} from "./UserController";
import { deleteExpiredReservations } from "./ReservationController";

//every 10s- */10 * * * * *
//every day 12am-0 0 * * *

export const scheduleFunctions = () => {
  schedule.scheduleJob("0 0 * * *", async () => {
    console.log(
      "Task executed every day 12 am 🚀",
      new Date().toLocaleTimeString()
    );
    try {
      deleteExpiredVerificationCodes();
      deleteExpiredOTPs();
      deleteExpiredReservations();
    } catch (err) {}
  });
};
