import express from "express";

// email handler
import * as nodemailer from "nodemailer";

// unique string generator
import { v4 as uuidv4 } from "uuid";

// bycrypt
import bcrypt from "bcrypt";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../index";
import { HomlyUser } from "../entities/User";

const homly_user = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_PASS,
  }
});

transporter.verify((error: any, success: any) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// send verification email
const sendVerificationEmail = (email: string, serviceNo: string) => {
    const url = `http://localhost:3002/`;
    const verificationCode = uuidv4()+serviceNo;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Homly User Verification",
      html: `<h1>Homly User Verification</h1><p>Click the link below to verify your account: <a href="${url}verify/${serviceNo}/${verificationCode}">Verify</a></p>`,
      // text: `Click the link below to verify your account: ${url}verify/${serviceNo}/${verificationCode}`,
    
      // hash the verification code
      
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const userExist = async (ServiceNo: string) => {
  const usersWithSameNo = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: ServiceNo,
  });
  
  if (usersWithSameNo && usersWithSameNo.verified) {
    return false;
  } else {
    return true;
  }
  
};



homly_user.get("/users", async (req, res) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
});

homly_user.post("/users/add", async (req, res) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;

  if (await userExist(ServiceNo)) {
    sendVerificationEmail(Email, ServiceNo);
    // const user = HomlyUser.create({
    //   service_number: ServiceNo,
    //   password: Password,
    //   email: Email,
    //   contact_number: ContactNo,
    //   image,
    // });
    //  await user.save();
    return res.status(201).json({message: "User successfully registred",success:true});
  }else{
    return res.status(201).json({message:'User already exists!',success:false})
  }
});

export { homly_user };
