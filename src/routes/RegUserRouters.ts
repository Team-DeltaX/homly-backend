import express from "express";
import {
  allUsers,
  userById,
  updateUserDetails,
  updateUserPassword,
  getTopRatedHolidayHomes,
  addUserIntersted,
  getUserIntersted,
  updateUserIntersted,
  getUserOngoingReservation,
  getUserPastReservation,
  getHolidayHomes,
  searchHolidayHomes,
  addtoWhishList,
  getWishList,
  deleteFromWishList,
  getNotifications,
  deleteNotification
} from "../controllers/UserController";
import { getHolidayHomesSorted } from "../controllers/ReviewController";

const reg_users = express.Router();

reg_users.get("/auth/", allUsers);
reg_users.get("/auth/details", userById);
reg_users.put("/auth/details", updateUserDetails);
reg_users.put("/auth/password", updateUserPassword);
reg_users.post("/auth/interested", addUserIntersted);
reg_users.get("/auth/interested", getUserIntersted);
reg_users.put("/auth/interested", updateUserIntersted);
reg_users.get("/auth/holidayhomes/sort/topRated", getTopRatedHolidayHomes);
reg_users.get("/auth/holidayhomes/sort", getHolidayHomesSorted);
reg_users.get("/auth/userOngoingReservation", getUserOngoingReservation);
reg_users.get("/auth/userPastReservation", getUserPastReservation);
reg_users.get("/auth/holidayhomes", getHolidayHomes);
reg_users.get("/auth/holidayhomes/search", searchHolidayHomes);
reg_users.post("/auth/wishlist", addtoWhishList);
reg_users.get("/auth/wishlist", getWishList);
reg_users.delete("/auth/wishlist", deleteFromWishList);
reg_users.get("/auth/notifications", getNotifications);
reg_users.delete("/auth/notifications", deleteNotification);

export { reg_users };
