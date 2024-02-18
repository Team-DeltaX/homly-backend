import express from "express";

import { allEmployees, userRegistration, emailVerification, userLogin, forgetPasswordDetails, otpVerification, resetPassword } from "../controllers/UserController";

const homly_user = express.Router();

homly_user.get("/employee",allEmployees);
homly_user.post("/",userRegistration)
homly_user.get("/verify/:serviceNo/:verificationCode",emailVerification);
homly_user.post("/login",userLogin);
homly_user.post("/forgetPassword",forgetPasswordDetails);
homly_user.post("/forgetPassword/otp",otpVerification);
homly_user.put("/forgetPassword/reset",resetPassword);

export { homly_user };