// unique string generator
import { v4 as uuidv4 } from "uuid";

// bycrypt
import bcrypt from "bcrypt";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

// import jwt
import jwt from "jsonwebtoken";



// import html email template
import emailVerify from "../template/emailVerify";
import sentOTPEmail from "../template/sentOTPEmail";

import sentEmail from "../services/sentEmal";

import { AppDataSource } from "../index";
import { Request, Response } from "express";
import {
  HomlyUser,
  UserEmailVerification,
  UserOTPVerification,
} from "../entities/User";

import { Employee } from "../entities/Empolyee";


// create token
const maxAge = 60*60;
const createToken = (serviceNo:String) =>{
  const secretCode = process.env.JWT_SECRET;
  return jwt.sign({serviceNo},secretCode! ,{
    expiresIn: maxAge
  });
}

// send verification email
const sendVerificationEmail = (
  email: string,
  serviceNo: string,
  name: string
) => {
  const url = `http://localhost:3002/users/verify`;
  const verificationCode = uuidv4() + serviceNo;
  const link = `${url}/${serviceNo}/${verificationCode}`;

  // hash the verification code
  const saltRound = 10;
  bcrypt
    .hash(verificationCode, saltRound)
    .then((hashedVerificationCode) => {
      // add verification code to useremailverification table
      const userVerification = UserEmailVerification.create({
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
          // send email
          sentEmail(email, "Homly User Verification", emailVerify(link, name));
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
const emailVerification = async (req: Request, res: Response) => {
  let message, verified; // send details to frontend
  const { serviceNo, verificationCode } = req.params;
  const userVerification = await AppDataSource.manager.findOneBy(
    UserEmailVerification,
    {
      service_number: serviceNo,
    }
  );

  if (userVerification) {
    const expiresAt = userVerification?.expires_at; // Add null check here

    if (expiresAt && expiresAt < new Date()) {
      // record has expired, then delete data
      // delete user record from userverification table
      console.log("verified email expired");
      await AppDataSource.manager
        .delete(UserEmailVerification, {
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
            console.log("email verified");
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
                AppDataSource.manager.delete(UserEmailVerification, {
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
    const user = await AppDataSource.manager.findOneBy(HomlyUser, {
      service_number: serviceNo,
    });

    if (user && user.verified) {
      // res.status(200).json({ message: "User already verified", success: true });
      message = "User already verified";
      verified = true;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    } else {
      // res.status(200).json({ message: "User not found or Verification link is Expired", success: false });
      message = "User not found";
      verified = false;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    }
  }
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
// get all employees
const allEmployees = async (req: Request, res: Response) => {
  const employees = await AppDataSource.manager.find(Employee);
  
  res.json({ employees: employees });
};

// get all users
const allUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
};

// get user by service number
const userById = async (req: Request, res: Response) => {
  const { serviceNo } = req.params;
  AppDataSource.manager
    .findOneBy(HomlyUser, { service_number: serviceNo })
    .then((user) => {
      AppDataSource.manager
        .findOneBy(Employee, { service_number: serviceNo })
        .then((employee) => {
          res.status(200).json({
            name: employee?.name,
            nic: employee?.nic,
            work: employee?.work_place,
            address: employee?.address,
            contactNo: user?.contact_number,
            email: user?.email,
            image: user?.image,
          });
        })
        .catch(() => {
          res.status(404).json({ message: "Error", success: false });
        });
      // res.status(200).json(user);
    })
    .catch(() => {
      res.status(404).json({ message: "User not found", success: false });
    });
};

// user registration
const userRegistration = async (req: Request, res: Response) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;
  await AppDataSource.manager
    .findOneBy(Employee, {
      service_number: ServiceNo,
    })
    .then(async (employee) => {
      if (employee) {
        if (await userExist(ServiceNo)) {
          sendVerificationEmail(Email, ServiceNo, employee.name);
          // bcrypt password
          const saltRounds = 10;
          bcrypt
            .hash(Password, saltRounds)
            .then(async (hash) => {
              const user = HomlyUser.create({
                service_number: ServiceNo,
                password: hash,
                email: Email,
                contact_number: ContactNo,
                image,
              });
              await user.save();
              return res.status(201).json({
                message:
                  "Check your emails,We will send you a verification link",
                success: true,
              });
            })
            .catch((err) => {
              return res
                .status(404)
                .json({ message: "Error saving user", success: false });
            });
        } else {
          return res
            .status(201)
            .json({ message: "User already exists!", success: false });
        }
      } else {
        res
          .status(202)
          .json({ message: "Your are not an employee", success: false });
      }
    })
    .catch((err) => {
      res
        .status(202)
        .json({ message: "Your are not an employee", success: false });
    });
};

// user login
const userLogin = async (req: Request, res: Response) => {
  const { serviceNo, password } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  // res.cookie("nameAruna","aruna",{httpOnly:true}).status(200).json({ message: "Login Successful", success: false });
  if (user && user.verified) {
    if (!user.blacklisted) {
      bcrypt.compare(password, user.password).then(async (result) => {
        if (result) {
          await AppDataSource.manager.update(
            HomlyUser,
            { service_number: serviceNo },
            {
              lastLogin: new Date(),
            }
          );
          const token = createToken(serviceNo);
          res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});
          res.status(200).json({ message: "Login Successful", success: true });
        } else {
          res.status(200).json({
            message: "Incorrect password or Username",
            success: false,
          });
        }
      });
    } else {
      res
        .status(200)
        .json({ message: "You are a Blacklisted User", success: false });
    }
  } else {
    res
      .status(200)
      .json({ message: "You are not a registered user", success: false });
  }
};

// forget password
// generate OTP and send to email function
const sendOTP = (email: string, serviceNo: string, name: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  // hash the otp
  const saltRound = 10;
  bcrypt
    .hash(otp.toString(), saltRound)
    .then((hashedOTP) => {
      // add otp to userotpverification table
      const userOTPVerification = UserOTPVerification.create({
        service_number: serviceNo,
        otp: hashedOTP,
        created_at: new Date(),
        // expire after 1 minites
        expires_at: new Date(Date.now() + 1 * 60000),
      });

      userOTPVerification
        .save()
        .then(() => {
          console.log("OTP saved");
          // send email
          sentEmail(email, "Homly User OTP", sentOTPEmail(otp, name));
        })
        .catch((err) => {
          console.log("error saving otp", err);
        });
    })
    .catch((err) => {
      console.log("error hashing otp", err);
    });
};

// get user by email,serviceno
const forgetPasswordDetails = async (req: Request, res: Response) => {
  const { serviceNo, email } = req.body;
  console.log(serviceNo, email);
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  const employee = await AppDataSource.manager.findOneBy(Employee, {
    service_number: serviceNo,
  });
  
  if (user && user.verified) {
    if (!user.blacklisted) {
      if (user.email === email) {
        sendOTP(email, serviceNo, employee!.name);

        res
          .status(200)
          .json({
            message: "Check your email,We will send OTP",
            success: true,
          });
      } else {
        res
          .status(200)
          .json({ message: "Invalid Service Number or Email", success: false });
      }
    }else{
      res
      .status(200)
      .json({ message: "You are a Blacklisted User", success: false });
    }
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};

// get otp and validate
const otpVerification = async (req: Request, res: Response) => {
  const { serviceNo, otp } = req.body;
  const userOTP = await AppDataSource.manager.findOneBy(UserOTPVerification, {
    service_number: serviceNo,
  });

  if (userOTP) {
    const expiresAt = userOTP.expires_at;

    if (expiresAt && expiresAt < new Date()) {
      // record has expired, then delete data
      // delete user record from userotpverification table
      console.log("otp expired");
      await AppDataSource.manager.delete(UserOTPVerification, {
        service_number: serviceNo,
      });
      res.status(200).json({ message: "OTP Expired", success: false });
    } else {
      bcrypt.compare(otp, userOTP.otp).then(async (result) => {
        if (result) {
          console.log("OTP Verified");
          await AppDataSource.manager.update(
            UserOTPVerification,
            { service_number: serviceNo },
            { verified: true }
          );
          res.status(200).json({ message: "OTP Verified", success: true });
        } else {
          res.status(200).json({ message: "Invalid OTP", success: false });
        }
      });
    }
  } else {
    res.status(200).json({ message: "error", success: false });
  }
};

// reset password
const resetPassword = async (req: Request, res: Response) => {
  const { serviceNo, password } = req.body;
  console.log("reset password", serviceNo, password);
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    const otp = await AppDataSource.manager.findOneBy(UserOTPVerification, {
      service_number: serviceNo,
    });

    if (otp?.verified) {
      const saltRounds = 10;
      bcrypt
        .hash(password, saltRounds)
        .then(async (hash) => {
          await AppDataSource.manager.update(
            HomlyUser,
            { service_number: serviceNo },
            { password: hash }
          );
          res
            .status(200)
            .json({ message: "Password Reset Successful", success: true });
        })
        .catch((err) => {
          res
            .status(200)
            .json({ message: "Error resetting password", success: false });
        });
    } else {
      res.status(200).json({ message: "OTP not verified", success: false });
    }
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};

// update user details
const updateUserDetails = async (req: Request, res: Response) => {
  const { serviceNo, email, contactNo, image } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  try {
    if (user && user.verified) {
      await AppDataSource.manager.update(
        HomlyUser,
        { service_number: serviceNo },
        {
          email,
          contact_number: contactNo,
          image,
        }
      );
      res.status(200).json({ message: "User details updated", success: true });
    } else {
      res.status(200).json({ message: "User not found", success: false });
    }
  } catch (error: any) {
    console.log(error);
    res
      .status(200)
      .json({ message: "Error updating user details", success: false });
  }
};
// update user password
const updateUserPassword = async (req: Request, res: Response) => {
  const { serviceNo, oldPassword, newPassword } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    bcrypt.compare(oldPassword, user.password).then(async (result) => {
      if (result) {
        const saltRounds = 10;
        bcrypt
          .hash(newPassword, saltRounds)
          .then(async (hash) => {
            await AppDataSource.manager.update(
              HomlyUser,
              { service_number: serviceNo },
              {
                password: hash,
              }
            );
            res
              .status(200)
              .json({ message: "Password updated", success: true });
          })
          .catch((err) => {
            res
              .status(200)
              .json({ message: "Error updating password", success: false });
          });
      } else {
        res
          .status(200)
          .json({ message: "Incorrect old password", success: false });
      }
    });
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};



export {
  allEmployees,
  allUsers,
  userById,
  userRegistration,
  emailVerification,
  userLogin,
  forgetPasswordDetails,
  otpVerification,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
};
