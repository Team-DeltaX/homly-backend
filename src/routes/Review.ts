import express from "express";

import { reviewSentiment } from "../controllers/ReviewController";

const homly_review = express.Router();

homly_review.post("/review",reviewSentiment);

export { homly_review };