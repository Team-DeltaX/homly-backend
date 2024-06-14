import express from "express";

import {
  addUserReview,
  getUserReview,
  updateUserReview,
  getUserReviewForHolidayHome,
} from "../controllers/ReviewController";

const homly_review = express.Router();

homly_review.post("/auth/review", addUserReview);
homly_review.get("/auth/review", getUserReview);
homly_review.put("/auth/review", updateUserReview);
homly_review.get("/auth/review/holidayhome", getUserReviewForHolidayHome);

export { homly_review };
