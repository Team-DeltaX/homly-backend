// unique string generator
import { v4 as uuidv4 } from "uuid";

// bycrypt
import bcrypt from "bcrypt";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

// import jwt
import jwt from "jsonwebtoken";

// import less than equal from typeORM
import { LessThan, MoreThanOrEqual, Like, And } from "typeorm";

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
  UserInteresed,
} from "../entities/User";

import { Employee } from "../entities/Empolyee";

import { HolidayHome } from "../entities/HolidayHome";
import { Room } from "../entities/Room";
import { Hall } from "../entities/Hall";
import { Rental } from "../entities/Rental";
import { Reservation } from "../entities/Reservation";

// create token
const maxAge = 60 * 60;
const createToken = (serviceNo: String) => {
  const secretCode = process.env.JWT_SECRET;
  return jwt.sign({ serviceNo }, secretCode!, {
    expiresIn: maxAge,
  });
};

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
        // expire after 10 minutes
        expires_at: new Date(Date.now() + 10 * 60000),
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

const userExist = async (ServiceNo: string) => {
  const usersWithSameNo = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: ServiceNo })
    .getOne();

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

// user registration
const userRegistration = async (req: Request, res: Response) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;
  await AppDataSource.createQueryBuilder()
    .select("user")
    .from(Employee, "user")
    .where("user.service_number = :id", { id: ServiceNo })
    .getOne()
    .then(async (employee) => {
      if (employee) {
        console.log(employee);
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
      res.status(202).json({ message: "err ", success: false });
    });

  // await AppDataSource.manager
  //   .findOneBy(Employee, {
  //     service_number: ServiceNo,
  //   })
  //   .then(async (employee) => {
  //     if (employee) {
  //       if (await userExist(ServiceNo)) {
  //         sendVerificationEmail(Email, ServiceNo, employee.name);
  //         // bcrypt password
  //         const saltRounds = 10;
  //         bcrypt
  //           .hash(Password, saltRounds)
  //           .then(async (hash) => {
  //             const user = HomlyUser.create({
  //               service_number: ServiceNo,
  //               password: hash,
  //               email: Email,
  //               contact_number: ContactNo,
  //               image,
  //             });
  //             await user.save();
  //             return res.status(201).json({
  //               message:
  //                 "Check your emails,We will send you a verification link",
  //               success: true,
  //             });
  //           })
  //           .catch((err) => {
  //             return res
  //               .status(404)
  //               .json({ message: "Error saving user", success: false });
  //           });
  //       } else {
  //         return res
  //           .status(201)
  //           .json({ message: "User already exists!", success: false });
  //       }
  //     } else {
  //       res
  //         .status(202)
  //         .json({ message: "Your are not an employee", success: false });
  //     }
  //   })
  //   .catch((err) => {
  //     res
  //       .status(202)
  //       .json({ message: "Your are not an employee", success: false });
  //   });
};

// verify email
// url with verification code and service number
const emailVerification = async (req: Request, res: Response) => {
  let message, verified; // send details to frontend
  const { serviceNo, verificationCode } = req.params;
  const userVerification = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(UserEmailVerification, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

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
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

    // await AppDataSource.manager.findOneBy(HomlyUser, {
    //   service_number: serviceNo,
    // });

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

// user login
const userLogin = async (req: Request, res: Response) => {
  const { serviceNo, password } = req.body;
  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

  // await AppDataSource.manager.findOneBy(HomlyUser, {
  //   service_number: serviceNo,
  // });
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
          // set 2 cookies

          res.cookie("serviceNo", serviceNo, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

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
  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

  const employee = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(Employee, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

  // const employee = await AppDataSource.manager.findOneBy(Employee, {
  //   service_number: serviceNo,
  // });

  if (user && user.verified) {
    if (!user.blacklisted) {
      if (user.email === email) {
        sendOTP(email, serviceNo, employee!.name);

        res.status(200).json({
          message: "Check your email,We will send OTP",
          success: true,
        });
      } else {
        res
          .status(200)
          .json({ message: "Invalid Service Number or Email", success: false });
      }
    } else {
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

  const userOTP = await AppDataSource.createQueryBuilder()
    .select("otp")
    .from(UserOTPVerification, "otp")
    .where("otp.service_number = :id", { id: serviceNo })
    .getOne();

  // const userOTP = await AppDataSource.manager.findOneBy(UserOTPVerification, {
  //   service_number: serviceNo,
  // });

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

  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();
  // const user = await AppDataSource.manager.findOneBy(HomlyUser, {
  //   service_number: serviceNo,
  // });
  if (user && user.verified) {
    // const otp = await AppDataSource.manager.findOneBy(UserOTPVerification, {
    //   service_number: serviceNo,
    // });

    const otp = await AppDataSource.createQueryBuilder()
      .select("otp")
      .from(UserOTPVerification, "otp")
      .where("otp.service_number = :id", { id: serviceNo })
      .getOne();

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

// get user by service number
const userById = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;
  try {
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

    if (user) {
      const employee = await AppDataSource.createQueryBuilder()
        .select("user")
        .from(Employee, "user")
        .where("user.service_number = :id", { id: serviceNo })
        .getOne();
      if (employee) {
        res.status(200).json({
          serviceNo: serviceNo,
          name: employee.name,
          nic: employee.nic,
          work: employee.work_place,
          address: employee.address,
          contactNo: user.contact_number,
          email: user.email,
          image: user.image,
        });
      }
    } else {
      res.status(200).json({ message: "User not found", success: false });
    }
  } catch (err: any) {
    console.log("get user by service number", err);
    res.status(501).json({ message: "Server Error", success: false });
  }
};

// update user details
const updateUserDetails = async (req: Request, res: Response) => {
  const { serviceNo, email, contactNo, image } = req.body;
  try {
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

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
  try {
    const { serviceNo, oldPassword, newPassword } = req.body;
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();
    if (user && user.verified) {
      bcrypt
        .compare(oldPassword, user.password)
        .then(async (result) => {
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
        })
        .catch((err) => {
          res
            .status(200)
            .json({ message: "Error updating password", success: false });
        });
    } else {
      res.status(200).json({ message: "User not found", success: false });
    }
  } catch (error: any) {
    console.log(error);
    res
      .status(200)
      .json({ message: "Error updating user password", success: false });
  }
};

// calculate total rental for holiday home
const calculateTotalRental = async (holidayHomeId: string) => {
  let totalRental = 0;
  try {
    const roomRental = await AppDataSource.manager.find(Room, {
      select: ["roomCode", "roomRental"],
      where: {
        HolidayHomeId: holidayHomeId,
      },
    });

    for (let i = 0; i < roomRental.length; i++) {
      totalRental += roomRental[i].roomRental;
    }

    const hallRental = await AppDataSource.manager.find(Hall, {
      select: ["hallCode", "hallRental"],
      where: {
        HolidayHomeId: holidayHomeId,
      },
    });

    for (let i = 0; i < hallRental.length; i++) {
      totalRental += hallRental[i].hallRental;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    // check weekend or weekday
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

    if (isWeekend) {
      for (let i = 0; i < roomRental.length; i++) {
        await AppDataSource.manager
          .find(Rental, {
            where: {
              HolidayHomeId: holidayHomeId,
              HRUId: roomRental[i].roomCode,
              Month: String(currentMonth),
            },
          })
          .then((rental) => {
            if (rental) {
              totalRental -= rental[0].WeekEndRental;
            }
          });
      }
      for (let i = 0; i < hallRental.length; i++) {
        await AppDataSource.manager
          .find(Rental, {
            where: {
              HolidayHomeId: holidayHomeId,
              HRUId: hallRental[i].hallCode,
              Month: String(currentMonth),
            },
          })
          .then((rental) => {
            if (rental) {
              totalRental -= rental[0].WeekEndRental;
            }
          });
      }
    } else {
      for (let i = 0; i < roomRental.length; i++) {
        await AppDataSource.manager
          .find(Rental, {
            where: {
              HolidayHomeId: holidayHomeId,
              HRUId: roomRental[i].roomCode,
              Month: String(currentMonth),
            },
          })
          .then((rental) => {
            if (rental[0]) {
              totalRental -= rental[0].WeekEndRental;
            }
          });
      }
      for (let i = 0; i < hallRental.length; i++) {
        await AppDataSource.manager
          .find(Rental, {
            where: {
              HolidayHomeId: holidayHomeId,
              HRUId: hallRental[i].hallCode,
              Month: String(currentMonth),
            },
          })
          .then((rental) => {
            if (rental[0]) {
              totalRental -= rental[0].WeekEndRental;
            }
          });
      }
    }
    return totalRental;
  } catch (err) {
    console.log(err);
  }
};

// get top rated holiday homes
const getTopRatedHolidayHomes = async (req: Request, res: Response) => {
  const holidayHomes = await AppDataSource.manager.find(HolidayHome, {
    select: ["HolidayHomeId", "Name", "Address", "overall_rating", "MainImage"],
    order: {
      overall_rating: "DESC",
    },
    where: {
      Approved: true,
      Status: "Active",
    },
  });

  const topRatedHolidayHomes = holidayHomes.slice(0, 5);

  let topRatedHolidayHomesWithPrice = [];
  for (let i = 0; i < topRatedHolidayHomes.length; i++) {
    const totalRental = await calculateTotalRental(
      topRatedHolidayHomes[i].HolidayHomeId
    );
    topRatedHolidayHomesWithPrice.push({
      HolidayHomeId: topRatedHolidayHomes[i].HolidayHomeId,
      Name: topRatedHolidayHomes[i].Name,
      Address: topRatedHolidayHomes[i].Address,
      overall_rating: topRatedHolidayHomes[i].overall_rating,
      TotalRental: totalRental,
      HHImage: topRatedHolidayHomes[i].MainImage,
    });
  }

  // console.log(topRatedHolidayHomes);
  res.status(200).json(topRatedHolidayHomesWithPrice);
};

// change facility name
const changeFacilityName = (facility: string) => {
  switch (facility) {
    case "food":
      return "food_rating";
    case "value for money":
      return "value_for_money_rating";
    case "staff":
      return "staff_rating";
    case "location":
      return "location_rating";
    case "wifi":
      return "wifi_rating";
    case "furniture":
      return "furniture_rating";
    default:
      return facility;
  }
};

// add user interested facilities
const addUserIntersted = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;
  let { fac1, fac2, fac3 } = req.body;

  fac1 = await changeFacilityName(fac1);
  fac2 = await changeFacilityName(fac2);
  fac3 = await changeFacilityName(fac3);

  // update table
  if (serviceNo) {
    const interested = UserInteresed.create({
      service_number: serviceNo,
      interested_1: fac1,
      interested_2: fac2,
      interested_3: fac3,
    });
    await interested.save().then(() => {
      res
        .status(200)
        .json({ message: "Successfully add your insterested", success: true });
    });
    console.log("updated db");
  }

  console.log(serviceNo, fac1, fac2, fac3);
};

const changeFacilityNameReturn = (facility: string) => {
  switch (facility) {
    case "food_rating":
      return "food";
    case "value_for_money_rating":
      return "value for money";
    case "staff_rating":
      return "staff";
    case "location_rating":
      return "location";
    case "wifi_rating":
      return "wifi";
    case "furniture_rating":
      return "furniture";
    default:
      return facility;
  }
};

const getUserIntersted = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;
  // res.status(200).json(serviceNo)
  try {
    const interested = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(UserInteresed, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

    if (interested) {
      const userInterested = {
        serviceNo: interested.service_number,
        interested: [
          changeFacilityNameReturn(interested.interested_1),
          changeFacilityNameReturn(interested.interested_2),
          changeFacilityNameReturn(interested.interested_3),
        ],
      };
      res.status(200).json({ updated: true, userInterested: userInterested });
    } else {
      console.log("not found");
      res.status(200).json({ updated: false });
    }
  } catch (err: any) {
    res.status(404).json({ message: "Error", success: false });
  }
};

const updateUserIntersted = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;
  let { fac1, fac2, fac3 } = req.body;

  console.log(fac1, fac2, fac3);

  try {
    fac1 = changeFacilityName(fac1);
    fac2 = changeFacilityName(fac2);
    fac3 = changeFacilityName(fac3);

    // update table
    if (serviceNo) {
      await AppDataSource.manager.update(
        UserInteresed,
        { service_number: serviceNo },
        {
          interested_1: fac1,
          interested_2: fac2,
          interested_3: fac3,
        }
      );
      res.status(200).json({
        message: "Successfully update your insterested",
        success: true,
      });
    }
  } catch (err: any) {
    res.status(404).json({ message: "Error", success: false });
  }
};

const getUserOngoingReservation = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;

  try {
    await AppDataSource.manager
      .find(Reservation, {
        where: {
          ServiceNO: serviceNo,
          CheckoutDate: MoreThanOrEqual(new Date(Date.now() - 1 * 60000)),
        },
        order: {
          CheckinDate: "ASC",
        },
      })
      .then(async (reservations) => {
        if (reservations) {
          const ongoingReservations: any[] = [];
          for (let i = 0; i < reservations.length; i++) {
            await AppDataSource.manager
              .find(HolidayHome, {
                select: ["Name", "Address", "MainImage"],
                where: {
                  HolidayHomeId: reservations[i].HolidayHome,
                },
              })
              .then((holidayHome) => {
                const expireDate = new Date(
                  reservations[i].updatedAt.getTime() + 3 * 24 * 60 * 60 * 1000
                );
                ongoingReservations.push({
                  reservation: reservations[i],
                  holidayHome: holidayHome,
                  expireDate: expireDate,
                });
              });
          }
          res.status(200).json(ongoingReservations);
        } else {
          res.status(200).json({ message: "no reservations" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server error" });
      });
  } catch (err: any) {
    console.log(err);
  }
};

const getUserPastReservation = async (req: Request, res: Response) => {
  const serviceNo = req.cookies.serviceNo;

  try {
    await AppDataSource.manager
      .find(Reservation, {
        where: {
          ServiceNO: serviceNo,
          // get date before today + 1
          CheckoutDate: LessThan(new Date(Date.now() - 1 * 60000)),
          IsPaid: true,
        },
        order: {
          CheckinDate: "DESC",
        },
      })
      .then(async (reservations) => {
        const pastReservations: any[] = [];
        if (reservations) {
          for (let i = 0; i < reservations.length; i++) {
            await AppDataSource.manager
              .find(HolidayHome, {
                select: ["Name", "Address", "MainImage"],
                where: {
                  HolidayHomeId: reservations[i].HolidayHome,
                },
              })
              .then((holidayHome) => {
                pastReservations.push({
                  reservation: reservations[i],
                  holidayHome: holidayHome,
                });
              });
          }
          res.status(200).json(pastReservations);
        } else {
          res.status(200).json({ message: "no reservations" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server error" });
      });
  } catch (err: any) {
    console.log(err);
  }
};

// get holidayhomes
const getHolidayHomes = async (req: Request, res: Response) => {
  const search = req.query.search;
  console.log(search);
  if (search && search !== "all") {
    // serach by district or name

    await AppDataSource.manager
      .find(HolidayHome, {
        select: [
          "HolidayHomeId",
          "Name",
          "Address",
          "District",
          "overall_rating",
          "MainImage",
        ],
        where: [
          {
            Name: Like(`${search.toString()}%`),
            Approved: true,
            Status: "Active",
          },
          {
            District: Like(`${search.toString()}%`),
            Approved: true,
            Status: "Active",
          },
          // { Approved: true, Status: "Active" }
        ],
        order: {
          updatedAt: "DESC",
        },
      })
      .then(async (holidayHomes) => {
        if (holidayHomes) {
          let holidayHomesWithPrice = [];
          for (let i = 0; i < holidayHomes.length; i++) {
            const totalRental = await calculateTotalRental(
              holidayHomes[i].HolidayHomeId
            );
            holidayHomesWithPrice.push({
              HolidayHomeId: holidayHomes[i].HolidayHomeId,
              Name: holidayHomes[i].Name,
              Address: holidayHomes[i].Address,
              overall_rating: holidayHomes[i].overall_rating,
              TotalRental: totalRental,
              HHImage: holidayHomes[i].MainImage,
            });
          }
          res.status(200).json(holidayHomesWithPrice);
        } else {
          res.status(200).json({ message: "No holiday homes found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server error" });
      });
  } else {
    await AppDataSource.manager
      .find(HolidayHome, {
        select: [
          "HolidayHomeId",
          "Name",
          "Address",
          "District",
          "overall_rating",
          "MainImage",
        ],
        where: {
          Approved: true,
          Status: "Active",
        },
        order: {
          updatedAt: "DESC",
        },
      })
      .then(async (holidayHomes) => {
        let holidayHomesWithPrice = [];
        for (let i = 0; i < holidayHomes.length; i++) {
          const totalRental = await calculateTotalRental(
            holidayHomes[i].HolidayHomeId
          );
          holidayHomesWithPrice.push({
            HolidayHomeId: holidayHomes[i].HolidayHomeId,
            Name: holidayHomes[i].Name,
            Address: holidayHomes[i].Address,
            overall_rating: holidayHomes[i].overall_rating,
            TotalRental: totalRental,
            HHImage: holidayHomes[i].MainImage,
          });
        }
        res.status(200).json(holidayHomesWithPrice);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server error" });
      });
  }
};

export {
  allEmployees,
  allUsers,
  userRegistration,
  emailVerification,
  userLogin,
  forgetPasswordDetails,
  otpVerification,
  resetPassword,
  userById,
  updateUserDetails,
  updateUserPassword,
  getTopRatedHolidayHomes,
  addUserIntersted,
  getUserIntersted,
  updateUserIntersted,
  getUserOngoingReservation,
  getUserPastReservation,
  getHolidayHomes,
};
