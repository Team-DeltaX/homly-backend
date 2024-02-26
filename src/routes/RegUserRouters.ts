import express from "express";

import { allUsers, userById, updateUserDetails, updateUserPassword } from "../controllers/UserController";

const reg_users = express.Router();


reg_users.get("/auth/",allUsers);
reg_users.get("/auth/:serviceNo",userById)
reg_users.put("/auth/", updateUserDetails);
reg_users.put("/auth/password", updateUserPassword);


export { reg_users}