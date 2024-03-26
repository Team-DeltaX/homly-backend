import express from "express";

import {
  reviewSentiment,
  addUserReview,
  getUserReview,
} from "../controllers/ReviewController";

const homly_review = express.Router();

homly_review.post("/review/value", reviewSentiment);
homly_review.post("/review", addUserReview);
homly_review.get("/review", getUserReview);

export { homly_review };
