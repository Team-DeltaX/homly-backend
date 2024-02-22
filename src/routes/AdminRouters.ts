import express from "express";

import { adminLogin,changeDefaultPassword } from "../controllers/AdminController";

const admin_router = express.Router();

admin_router.post("/", adminLogin);
admin_router.put("/",changeDefaultPassword);

export { admin_router };