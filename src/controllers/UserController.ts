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
import { HomlyUser, UserVerification } from "../entities/User";

const homly_user = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_PASS,
  },
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
  const url = `http://localhost:3002/users/verify`;
  const verificationCode = uuidv4() + serviceNo;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Homly User Verification",
    html: `<h1>Homly User Verification</h1><p>Click the link below to verify your account: <a href="${url}/${serviceNo}/${verificationCode}">Verify</a></p>`,
  };
  // hash the verification code
  const saltRound = 10;
  bcrypt
    .hash(verificationCode, saltRound)
    .then((hashedVerificationCode) => {
      console.log(hashedVerificationCode);
      // set calues in userverification
      const userVerification = UserVerification.create({
        service_number: serviceNo,
        verification_code: hashedVerificationCode,
        created_at: new Date(),
        // expire after 1 minites
        expires_at: new Date(Date.now() + 1 * 60000),
      });

      userVerification
        .save()
        .then(() => {
          console.log("verification code saved");
          transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        })
        .catch((err) => {
          console.log("error saving verification code", err);
        });
    })
    .catch((err) => {
      console.log("error hashing verification code", err);
    });
};

// verify email
// url with verification code and service number
homly_user.get("/verify/:serviceNo/:verificationCode", async (req, res) => {
  let message, verified; // send details to frontend
  const { serviceNo, verificationCode } = req.params;
  const userVerification = await AppDataSource.manager.findOneBy(
    UserVerification,
    {
      service_number: serviceNo,
    }
  );

  if (userVerification) {
    const expiresAt = userVerification?.expires_at; // Add null check here

    if (expiresAt && expiresAt < new Date()) {
      // record has expired, then delete data
      // delete user record from userverification table
      console.log("expired");
      await AppDataSource.manager
        .delete(UserVerification, {
          service_number: serviceNo,
        })
        .then((result) => {
          AppDataSource.manager.delete(HomlyUser, {
            service_number: serviceNo,
          });
        });
      message = "Verification Link is Expired";
      verified = false;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    } else {
      bcrypt
        .compare(verificationCode, userVerification.verification_code)
        .then((result) => {
          if (result) {
            // update user
            console.log("verified");
            AppDataSource.manager
              .update(
                HomlyUser,
                { service_number: serviceNo },
                { verified: true }
              )
              .then(() => {
                console.log(
                  "user verified and deleted from userverification table"
                );
                AppDataSource.manager.delete(UserVerification, {
                  service_number: serviceNo,
                });
              });
            verified = true;
            message = "User is Verified";
            res.redirect(
              `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
            );
          }
        });
    }
  } else {
    message = "User not found";
    verified = false;
    res.status(200).json({ message: "User not found", success: false });
    res.redirect(
      `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
    );
  }
});

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

homly_user.get("/", async (req, res) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
});

// user registration
homly_user.post("/add", async (req, res) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;

  if (await userExist(ServiceNo)) {
    sendVerificationEmail(Email, ServiceNo);
    let hashedPassword;
    // bcrypt password
    const saltRounds = 10;
    bcrypt.hash(Password, saltRounds).then(async (hash) => {
      const user = HomlyUser.create({
        service_number: ServiceNo,
        password: hash,
        email: Email,
        contact_number: ContactNo,
        image,
      });
      await user.save();
      return res.status(201).json({
        message: "Check your emails,We will send you a verification link",
        success: true,
      });
    });
  } else {
    return res
      .status(201)
      .json({ message: "User already exists!", success: false });
  }
});

// user login
homly_user.post("/login", async (req, res) => {
  const { serviceNo, password } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        res.status(200);
      } else {
        res
          .status(200)
          .json({ message: "Incorrect password or Username", success: false });
      }
    });
  } else {
    res
      .status(200)
      .json({ message: "You are not a registered user", success: false });
  }
});

// forget password
// generate OTP and send to email
const sendOTP = (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1><p>Your OTP is: ${otp}</p>`,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email OTP sent: " + info.response);
    }
  });
  return otp;
};


// get user by email,serviceno
homly_user.post("/forgetPassword/details", async (req, res) => {
  const { serviceNo, email } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    if (user.email === email) {
      const otp = sendOTP(email);
      res.status(200).json({ message: "Check your email", success: true });
    } else {
      res.status(200).json({ message: "Invalid Service Number or Email", success: false });
    }
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
});

export { homly_user };
