import express from "express";

import { allUsers, userById, updateUserDetails, updateUserPassword } from "../controllers/UserController";

const reg_users = express.Router();


reg_users.get("/",allUsers);
reg_users.get("/:serviceNo",userById)
reg_users.put("/", updateUserDetails);
reg_users.put("/password", updateUserPassword);


export { reg_users}