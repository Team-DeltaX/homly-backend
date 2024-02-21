import express from "express";

import { adminLogin } from "../controllers/AdminController";

const admin_router = express.Router();

admin_router.post("/", adminLogin);

export { admin_router };