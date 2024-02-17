import express from "express";

import { updateUserDetails } from "../controllers/UserController";

const reg_users = express.Router();

reg_users.put("/", updateUserDetails);


export { reg_users}