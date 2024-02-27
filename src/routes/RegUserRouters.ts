import express from "express";

import { allUsers, userById, updateUserDetails, updateUserPassword, addUserIntersted } from "../controllers/UserController";

const reg_users = express.Router();


reg_users.get("/auth/",allUsers);
reg_users.get("/auth/details",userById)
reg_users.put("/auth/", updateUserDetails);
reg_users.put("/auth/password", updateUserPassword);
reg_users.post("/auth/interested", addUserIntersted);


export { reg_users}