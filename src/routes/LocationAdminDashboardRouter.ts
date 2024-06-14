import express from "express";
import {
  Active_InActive_HHcount,
  Earning,
  HHcount,
  Hallincome,
  Roomincome,
  getBookingscounts,
  get_holiday_home_rating,
  get_income_in_date,
  get_income_in_date_specificHH,
  get_not_approved_count,
  getallHH,
  gethallcount,
  getroomcount,
  holidayHomeRatings,
  ratingCatogeries,
} from "../controllers/HolidayHomeController";
const LocationAdminDashboardRouter = express.Router();

LocationAdminDashboardRouter.get(
  "/auth/locationadmin/holidayhomeratings",
  holidayHomeRatings
);

LocationAdminDashboardRouter.get(
  "/auth/locationadmin/holidayhomecount",
  HHcount
);
LocationAdminDashboardRouter.get("/auth/locationadmin/earning", Earning);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/holidayhomehstatus",
  Active_InActive_HHcount
);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/bookingcount",
  getBookingscounts
);
LocationAdminDashboardRouter.get("/auth/locationadmin/hall", gethallcount);
LocationAdminDashboardRouter.get("/auth/locationadmin/room", getroomcount);
LocationAdminDashboardRouter.get("/auth/locationadmin/hallincome", Hallincome);
LocationAdminDashboardRouter.get("/auth/locationadmin/roomincome", Roomincome);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/dayincome/:date",
  get_income_in_date
);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/holidayhomenames",
  getallHH
);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/dayincome/:date/:hhid",
  get_income_in_date_specificHH
);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/notapprovedcount",
  get_not_approved_count
);
LocationAdminDashboardRouter.get(
  "/auth/locationadmin/holidayhomerating/:homeid",
  get_holiday_home_rating
);

LocationAdminDashboardRouter.get(
  "/auth/locationadmin/ratingcatogeries/:homeId",
  ratingCatogeries
);

export { LocationAdminDashboardRouter };
