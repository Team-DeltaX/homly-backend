import express from "express";

import {
  addUserReview,
  getUserReview,
  updateUserReview,
  getUserReviewForHolidayHome,
  getUserImage,
  getEmployeeName,
} from "../controllers/ReviewController";

const homly_review = express.Router();

homly_review.post("/auth/review", addUserReview);
homly_review.get("/auth/review", getUserReview);
homly_review.put("/auth/review", updateUserReview);
homly_review.get("/auth/review/:holidayHomeId", getUserReviewForHolidayHome);
homly_review.get("/auth/review/employee/:serviceNo", getEmployeeName);
homly_review.get("/auth/review/user/:serviceNo", getUserImage);

export { homly_review };
