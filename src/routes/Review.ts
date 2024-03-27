import express from "express";

import {
  reviewSentiment,
  addUserReview,
  getUserReview,
} from "../controllers/ReviewController";

const homly_review = express.Router();

homly_review.post("/review/value", reviewSentiment);
homly_review.post("/auth/review", addUserReview);
homly_review.get("/auth/review", getUserReview);

export { homly_review };
