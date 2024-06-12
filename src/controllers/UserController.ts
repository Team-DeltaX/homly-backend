import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  LessThan,
  MoreThanOrEqual,
  Like,
  Between,
  Not,
  In,
  MoreThan,
} from "typeorm";
import { Request, Response } from "express";
import emailVerify from "../template/emailVerify";
import sentOTPEmail from "../template/sentOTPEmail";
import sentEmail from "../services/sentEmal";
import { AppDataSource } from "../index";
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
import { Review } from "../entities/Review";
import { ReservedRooms } from "../entities/ReservedRooms";
import { ReservedHalls } from "../entities/ReservedHalls";
import { WishList } from "../entities/WishList";
import { Notification } from "../entities/Notification";
import dotenv from "dotenv";
import sentSms from "../services/sentSms";
dotenv.config();

const expireTime = 3 * 24 * 60 * 60 * 1000;

// create token
const maxAge = 2 * 60 * 60;
const createToken = (serviceNo: String, role: String) => {
  const secretCode = process.env.JWT_SECRET;
  return jwt.sign({ serviceNo, role }, secretCode!, {
    expiresIn: maxAge,
  });
};

// send verification email
const sendVerificationEmail = (
  email: string,
  serviceNo: string,
  name: string,
  isUpdate: boolean
) => {
  const url = `http://localhost:8080/user/verify`;
  const verificationCode = uuidv4() + serviceNo;
  const link = `${url}/${serviceNo}/${verificationCode}/${isUpdate}/${email}`;

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
          // send email
          sentEmail(email, "Homly User Verification", emailVerify(link, name));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
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
        if (await userExist(ServiceNo)) {
          sendVerificationEmail(Email, ServiceNo, employee.name, false);
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
};

// verify email
// url with verification code and service number
const emailVerification = async (req: Request, res: Response) => {
  let message, verified;
  const { serviceNo, verificationCode, isUpdate, email } = req.params;
  const userVerification = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(UserEmailVerification, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

  if (userVerification) {
    const expiresAt = userVerification?.expires_at;

    if (expiresAt && expiresAt < new Date() && !isUpdate) {
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
            AppDataSource.manager
              .update(
                HomlyUser,
                { service_number: serviceNo },
                { verified: true, email: email }
              )
              .then(() => {
                AppDataSource.manager.delete(UserEmailVerification, {
                  service_number: serviceNo,
                });
              });
            verified = true;
            if (!isUpdate) {
              message = "User is Verified";
              res.redirect(
                `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
              );
            } else {
              message = "Email updated";
              res.redirect(
                `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
              );
            }
          }
        });
    }
  } else {
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

    if (user && user.verified) {
      message = "User already verified";
      verified = true;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    } else {
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
  // sentSms("+94764112542", `User logged in with service number ${serviceNo}`);
  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();

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
          const token = createToken(serviceNo, "User");
          res
            .status(200)
            .json({ token: token, message: "Login Successful", success: true });
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
  const saltRound = 10;
  bcrypt
    .hash(otp.toString(), saltRound)
    .then((hashedOTP) => {
      // add otp to userotpverification table
      const userOTPVerification = UserOTPVerification.create({
        service_number: serviceNo,
        otp: hashedOTP,
        created_at: new Date(),
        expires_at: new Date(Date.now() + 1 * 60000),
      });

      userOTPVerification
        .save()
        .then(() => {
          // send email
          sentEmail(email, "Homly User OTP", sentOTPEmail(otp, name));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
};

// get user by email,serviceno
const forgetPasswordDetails = async (req: Request, res: Response) => {
  const { serviceNo, email } = req.body;
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

  if (userOTP) {
    const expiresAt = userOTP.expires_at;

    if (expiresAt && expiresAt < new Date()) {
      await AppDataSource.manager.delete(UserOTPVerification, {
        service_number: serviceNo,
      });
      res.status(200).json({ message: "OTP Expired", success: false });
    } else {
      bcrypt.compare(otp, userOTP.otp).then(async (result) => {
        if (result) {
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

  const user = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(HomlyUser, "user")
    .where("user.service_number = :id", { id: serviceNo })
    .getOne();
  if (user && user.verified) {
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
  const serviceNo = (req as any).serviceNo;
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
    res.status(501).json({ message: "Server Error", success: false });
  }
};

// update user details
const updateUserDetails = async (req: Request, res: Response) => {
  const { email, contactNo, image } = req.body;
  const serviceNo = (req as any).serviceNo;

  try {
    const user = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(HomlyUser, "user")
      .where("user.service_number = :id", { id: serviceNo })
      .getOne();

    const employee = await AppDataSource.manager.find(Employee, {
      where: {
        service_number: serviceNo,
      },
    });
    if (user && user.verified) {
      await AppDataSource.manager.update(
        HomlyUser,
        { service_number: serviceNo },
        {
          contact_number: contactNo,
          image,
        }
      );
      if (user.email !== email) {
        sendVerificationEmail(email, serviceNo, employee[0].name, true);
        res.status(200).json({
          success: true,
          emailUpdated: true,
        });
      } else {
        res.status(200).json({ success: true, emailUpdated: false });
      }
    } else {
      res.status(200).json({ message: "User not found", success: false });
    }
  } catch (error: any) {
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
            if (rental.length > 0) totalRental -= rental[0].WeekEndRental;
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
            if (rental.length > 0) totalRental -= rental[0].WeekEndRental;
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
            if (rental.length > 0) totalRental -= rental[0].WeekEndRental;
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
            if (rental.length > 0) totalRental -= rental[0].WeekEndRental;
          });
      }
    }
    return totalRental;
  } catch (err) {
    return totalRental;
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
    const isFavourite = await AppDataSource.manager.find(WishList, {
      where: {
        service_number: (req as any).serviceNo,
        holidayHomeId: topRatedHolidayHomes[i].HolidayHomeId,
      },
    });
    topRatedHolidayHomesWithPrice.push({
      HolidayHomeId: topRatedHolidayHomes[i].HolidayHomeId,
      Name: topRatedHolidayHomes[i].Name,
      Address: topRatedHolidayHomes[i].Address,
      overall_rating: topRatedHolidayHomes[i].overall_rating,
      TotalRental: totalRental,
      HHImage: topRatedHolidayHomes[i].MainImage,
      isWishListed: isFavourite.length > 0 ? true : false,
    });
  }
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
  const serviceNo = (req as any).serviceNo;
  let { fac1, fac2, fac3 } = req.body;

  fac1 = await changeFacilityName(fac1);
  fac2 = await changeFacilityName(fac2);
  fac3 = await changeFacilityName(fac3);

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
  }
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
  const serviceNo = (req as any).serviceNo;
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
      res.status(200).json({ updated: false });
    }
  } catch (err: any) {
    res.status(404).json({ message: "Error", success: false });
  }
};

const updateUserIntersted = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  let { fac1, fac2, fac3 } = req.body;

  try {
    fac1 = changeFacilityName(fac1);
    fac2 = changeFacilityName(fac2);
    fac3 = changeFacilityName(fac3);

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
  const serviceNo = (req as any).serviceNo;

  try {
    await AppDataSource.manager
      .find(Reservation, {
        where: {
          ServiceNO: serviceNo,
          CheckoutDate: MoreThanOrEqual(new Date(Date.now() - 1 * 60000)),
          IsCancelled: false,
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
                select: ["Name", "Address", "MainImage", "AdminNo"],
                where: {
                  HolidayHomeId: reservations[i].HolidayHome,
                },
              })
              .then((holidayHome) => {
                const expireDate = new Date(
                  reservations[i].updatedAt.getTime() + expireTime
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
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getUserPastReservation = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  try {
    await AppDataSource.manager
      .find(Reservation, {
        where: [
          {
            ServiceNO: serviceNo,
            CheckoutDate: LessThan(new Date(Date.now() - 1 * 60000)),
            IsPaid: true,
          },
          {
            ServiceNO: serviceNo,
            IsCancelled: true,
          },
        ],
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
                select: ["Name", "Address", "MainImage", "AdminNo"],
                where: {
                  HolidayHomeId: reservations[i].HolidayHome,
                },
              })
              .then(async (holidayHome) => {
                const review = await AppDataSource.manager.find(Review, {
                  where: {
                    ReservationId: reservations[i].ReservationId,
                  },
                });
                pastReservations.push({
                  reservation: reservations[i],
                  holidayHome: holidayHome,
                  IsReviewed: review.length > 0 ? true : false,
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
    res.status(500).json({ message: "Internal Server error" });
  }
};

// get holidayhomes
const getHolidayHomes = async (req: Request, res: Response) => {
  const { district, search, page } = req.query;
  const serviceNo = (req as any).serviceNo;

  let queryOptions: any = {
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
      Name: Like(`%${search?.toString().toLowerCase()}%`),
    },
    order: {
      updatedAt: "DESC",
    },
  };

  if (district && district !== "all") {
    queryOptions.where.District = district.toString().toLowerCase();
  }

  try {
    let holidayHomes = await AppDataSource.manager.find(
      HolidayHome,
      queryOptions
    );
    let holidayHomesWithPrice = [];

    for (let i = 0; i < holidayHomes.length; i++) {
      const totalRental = await calculateTotalRental(
        holidayHomes[i].HolidayHomeId
      );
      const isFavourite = AppDataSource.manager.find(WishList, {
        where: {
          service_number: serviceNo,
          holidayHomeId: holidayHomes[i].HolidayHomeId,
        },
      });
      holidayHomesWithPrice.push({
        HolidayHomeId: holidayHomes[i].HolidayHomeId,
        Name: holidayHomes[i].Name,
        Address: holidayHomes[i].Address,
        overall_rating: holidayHomes[i].overall_rating,
        TotalRental: totalRental,
        HHImage: holidayHomes[i].MainImage,
        District: holidayHomes[i].District,
        AdminId: holidayHomes[i].AdminNo,
        isWishListed:
          isFavourite && (await isFavourite).length > 0 ? true : false,
      });
    }
    const HHcount = holidayHomesWithPrice.length;
    const slicedHH = holidayHomesWithPrice.slice(
      (parseInt(page?.toString() || "1") - 1) * 9,
      parseInt(page?.toString() || "1") * 9
    );
    res.status(200).json({ holidayHomes: slicedHH, HHcount: HHcount });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// search holidayhomes
const searchHolidayHomes = async (req: Request, res: Response) => {
  const { district, startDate, endDate } = req.query;

  let queryOptions: any = {
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
  };

  if (district && district !== "all") {
    queryOptions.where.District = district.toString().toLowerCase();
  }

  const sDate = new Date(startDate as string);
  const eDate = new Date(endDate as string);

  try {
    const reservations = await AppDataSource.manager.find(Reservation, {
      where: [
        {
          CheckinDate: Between(sDate, eDate),
          IsCancelled: false,
        },
        {
          CheckoutDate: Between(sDate, eDate),
          IsCancelled: false,
        },
        {
          CheckinDate: LessThan(sDate),
          CheckoutDate: MoreThanOrEqual(eDate),
          IsCancelled: false,
        },
      ],
    });

    let holidayHomesIds: string[] = [];
    for (let i = 0; i < reservations.length; i++) {
      if (!holidayHomesIds.includes(reservations[i].HolidayHome)) {
        holidayHomesIds.push(reservations[i].HolidayHome);
      }
    }
    let availableRooms: any = [];
    let availableHalls: any = [];
    for (let i = 0; i < holidayHomesIds.length; i++) {
      let room: string[] = [];
      let hall: string[] = [];
      await AppDataSource.manager
        .find(Room, {
          select: ["roomCode"],
          where: {
            HolidayHomeId: holidayHomesIds[i],
          },
        })
        .then((rooms) => {
          rooms.forEach((r) => {
            room.push(r.roomCode);
          });
          availableRooms.push({
            HolidayHomeId: holidayHomesIds[i],
            Rooms: room,
          });
        });

      await AppDataSource.manager
        .find(Hall, {
          select: ["hallCode"],
          where: {
            HolidayHomeId: holidayHomesIds[i],
          },
        })
        .then((halls) => {
          halls.forEach((h) => {
            hall.push(h.hallCode);
          });
          availableHalls.push({
            HolidayHomeId: holidayHomesIds[i],
            Halls: hall,
          });
        });
    }

    for (let i = 0; i < reservations.length; i++) {
      let room: string[] = [];
      let hall: string[] = [];
      await AppDataSource.manager
        .find(ReservedRooms, {
          select: ["roomCode"],
          where: {
            ReservationId: reservations[i].ReservationId,
          },
        })
        .then((rooms) => {
          rooms.forEach((r) => {
            room.push(r.roomCode);
          });

          const index = availableRooms.findIndex(
            (r: { HolidayHomeId: string }) =>
              r.HolidayHomeId === reservations[i].HolidayHome
          );

          if (index != -1) {
            availableRooms[index].Rooms = availableRooms[index].Rooms.filter(
              (r: string) => !room.includes(r)
            );
          }
        });

      await AppDataSource.manager
        .find(ReservedHalls, {
          select: ["hallCode"],
          where: {
            ReservationId: reservations[i].ReservationId ?? undefined,
          },
        })
        .then((halls) => {
          halls.forEach((h) => {
            hall.push(h.hallCode);
          });
          const index = availableHalls.findIndex(
            (h: { HolidayHomeId: string }) =>
              h.HolidayHomeId === reservations[i].HolidayHome
          );

          if (index != -1) {
            availableHalls[index].Halls = availableHalls[index].Halls.filter(
              (h: string) => !hall.includes(h)
            );
          }
        });
    }

    for (let i = 0; i < holidayHomesIds.length; i++) {
      if (
        availableRooms[i].Rooms.length > 0 ||
        availableHalls[i].Halls.length > 0
      ) {
        holidayHomesIds = holidayHomesIds.filter(
          (id) => id !== availableRooms[i].HolidayHomeId
        );
      }
    }

    queryOptions.where.HolidayHomeId = Not(In(holidayHomesIds));
    const holidayHomes = await AppDataSource.manager.find(
      HolidayHome,
      queryOptions
    );
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
        District: holidayHomes[i].District,
      });
    }

    res.status(200).json(holidayHomesWithPrice);
  } catch (err) {
    res.status(500).json({ message: "Internal Server error", err: err });
  }
};

// add wish list details
const addtoWhishList = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  const { holidayHomeId } = req.body;
  const wishList = WishList.create({
    service_number: serviceNo,
    holidayHomeId: holidayHomeId,
  });
  await wishList
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
};

// get wish list details
const getWishList = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;

  try {
    const wishList = await AppDataSource.manager.find(WishList, {
      where: {
        service_number: serviceNo,
      },
      order: {
        created_at: "DESC",
      },
    });

    let wishListDetails = [];
    for (let i = 0; i < wishList.length; i++) {
      const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name", "Address", "MainImage", "overall_rating"],
        where: {
          HolidayHomeId: wishList[i].holidayHomeId,
        },
      });

      const totalRental = await calculateTotalRental(wishList[i].holidayHomeId);
      wishListDetails.push({
        HolidayHomeId: wishList[i].holidayHomeId,
        Name: holidayHome[0].Name,
        Address: holidayHome[0].Address,
        HHImage: holidayHome[0].MainImage,
        TotalRental: totalRental,
        overall_rating: holidayHome[0].overall_rating,
        isWishListed: true,
      });
    }
    res.status(200).json(wishListDetails);
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// delete wish list
const deleteFromWishList = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  const { holidayHomeId } = req.body;

  await AppDataSource.manager
    .delete(WishList, {
      service_number: serviceNo,
      holidayHomeId: holidayHomeId,
    })
    .then(() => {
      res.status(200).json({ message: "wish list deleted", success: true });
    })
    .catch(() => {
      res.status(500).json({ message: "error", success: false });
    });
};

// get notifications
const getNotifications = async (req: Request, res: Response) => {
  const userId = (req as any).serviceNo;
  if (userId) {
    await AppDataSource.manager
      .find(Notification, {
        where: {
          receiverId: userId,
        },
        order: {
          time: "DESC",
        },
      })
      .then((notifications) => {
        res.status(200).json(notifications);
      })
      .catch(() => {
        res.status(500).json({ message: "Internal Server error" });
      });
  }
};

// delete notification
const deleteNotification = async (req: Request, res: Response) => {
  const { notificationIds, all } = req.body;
  if (all) {
    await AppDataSource.manager
      .delete(Notification, {
        receiverId: (req as any).adminNo || (req as any).serviceNo,
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    await AppDataSource.manager
      .delete(Notification, {
        id: notificationIds,
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};

// cancelled reservation
const cancelReservation = async (req: Request, res: Response) => {
  const { reservationId, isPaid } = req.body;
  if (isPaid) {
    await AppDataSource.manager
      .update(
        Reservation,
        { ReservationId: reservationId },
        { IsCancelled: true }
      )
      .then(() => {
        res
          .status(200)
          .json({ message: "Reservation Cancelled", success: true });
      })
      .catch(() => {
        res.status(500).json({ message: "Internal Server error" });
      });
  } else {
    await AppDataSource.manager
      .delete(Reservation, {
        ReservationId: reservationId,
      })
      .then(async () => {
        await AppDataSource.manager
          .delete(ReservedRooms, {
            ReservationId: reservationId,
          })
          .then(() => {})
          .catch(() => {});

        await AppDataSource.manager
          .delete(ReservedHalls, {
            ReservationId: reservationId,
          })
          .then(() => {})
          .catch(() => {});

        res
          .status(200)
          .json({ message: "Reservation Cancelled", success: true });
      })
      .catch(() => {
        res.status(500).json({ message: "Internal Server error" });
      });
  }
};

// delete expire reservation
const deleteExpireReservation = async () => {
  const expireDate = new Date(Date.now() - expireTime);
  await AppDataSource.manager
    .find(Reservation, {
      where: {
        createdAt: MoreThan(expireDate),
        IsPaid: false,
      },
    })
    .then(async (reservations: Reservation[]) => {
      for (const reservation of reservations) {
        await AppDataSource.manager
          .delete(Reservation, {
            ReservationId: reservation.ReservationId,
          })
          .then(async () => {
            await AppDataSource.manager
              .delete(ReservedRooms, {
                ReservationId: reservation.ReservationId,
              })
              .then(() => {})
              .catch(() => {});

            await AppDataSource.manager
              .delete(ReservedHalls, {
                ReservationId: reservation.ReservationId,
              })
              .then(() => {})
              .catch(() => {});
          })
          .catch(() => {});
      }
    })
    .catch(() => {});
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
  searchHolidayHomes,
  addtoWhishList,
  getWishList,
  deleteFromWishList,
  getNotifications,
  deleteNotification,
  cancelReservation,
  deleteExpireReservation,
};
