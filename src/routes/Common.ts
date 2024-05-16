import express from "express";

import { getNotifications, deleteNotification } from "../controllers/UserController";

const common_router = express.Router();

common_router.get("/auth/notifications", getNotifications);
common_router.delete("/auth/notifications", deleteNotification);

export { common_router };