import express from "express";

import {
  allUsers,
  userById,
  updateUserDetails,
  updateUserPassword,
  addUserIntersted,
  getUserIntersted,
  updateUserIntersted
} from "../controllers/UserController";

import { getHolidayHomesSorted } from "../controllers/ReviewController";

const reg_users = express.Router();

reg_users.get("/auth/", allUsers);
reg_users.get("/auth/details", userById);
reg_users.put("/auth/", updateUserDetails);
reg_users.put("/auth/password", updateUserPassword);
reg_users.post("/auth/interested", addUserIntersted);
reg_users.get("/auth/interested", getUserIntersted);
reg_users.put("/auth/interested", updateUserIntersted);
reg_users.get("/auth/holidayhomes/sort", getHolidayHomesSorted);

export { reg_users };
