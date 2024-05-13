import express from "express";

import { adminLogin,changeDefaultPassword } from "../controllers/AdminController";
import { getNotifications, deleteNotification } from "../controllers/UserController";

const admin_router = express.Router();

admin_router.post("/", adminLogin);
admin_router.put("/",changeDefaultPassword);
admin_router.get("/auth/notifications", getNotifications);
admin_router.delete("/auth/notifications", deleteNotification);


export { admin_router };