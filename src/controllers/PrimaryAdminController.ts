import express, { response } from "express";
const router = express.Router();
import { HomlyAdmin } from "../entities/HomlyAdmin";
import { Reservation } from "../entities/Reservation";
import { Complaints } from "../entities/Complaint";
import { HomlyUser } from "../entities/User";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { Console, error } from "console";
import { v4 as uuid, v4 } from "uuid";
import addadminemail from "../template/addadminemail";
import sentEmail from "../services/sentEmal";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import resetadmin from "../template/resetadmin";
import dotenv from "dotenv";
import { Employee } from "../entities/Empolyee";
import { BlackListedUser } from "../entities/BlackListedUser";
import BlacklistNotifyEmail from "../template/BlacklistNotifyEmail";
import BlacklistRemoveEmail from "../template/BlacklistRemoveEmail";
import { BlackListHistory } from "../entities/BlackListHistory";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { MoreThan } from "typeorm";
import { LessThan } from "typeorm";
import { HolidayHome } from "../entities/HolidayHome";
import { Hall } from "../entities/Hall";
import { Room } from "../entities/Room";
import { ReservedRooms } from "../entities/ReservedRooms";
import { ReservedHalls } from "../entities/ReservedHalls";

const schedule = require('node-schedule');

dotenv.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_PASS,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const AddAdmin = async (req: Request, res: Response) => {
  const count = await AppDataSource.manager.count(HomlyAdmin);
  const AdminNo = `HomlyLocAdmin${count + 1}`;
  const { UserName, ContactNo, Email, WorkLocation, Sub } = req.body;

  const Role = "LocationAdmin";
  const loginurl = "google.com";
  const str = uuid();
  const arrypw = str.split("-");
  const Password = arrypw[arrypw.length - 1];
  const saltRound = 10;
  bcrypt
    .hash(Password, saltRound)
    .then((hashedPassword) => {
      const addadmin = HomlyAdmin.create({
        AdminNo,
        UserName,
        Password: hashedPassword,
        ContactNo,
        Email,
        WorkLocation,
        Role,
        Sub,
      });
      addadmin
        .save()
        .then(() => {
          sentEmail(
            Email,
            "You are added as homly admin",
            addadminemail(UserName, Password, AdminNo, loginurl)
          );
          res.status(200).json({ message: "User added successfully" });
        })
        .catch((err) => {
          console.log(`error is ${error}`);
          res.status(500).json({ message: "Internal Server Error!" });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error occured!" });
    });
};

export const getall = async (req: Request, res: Response) => {
  const admins = await AppDataSource.manager.find(HomlyAdmin);
  try {
    const admins = await AppDataSource.manager.find(HomlyAdmin, {
      order: {
        createddate: "ASC",
      },
    });

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const disableadmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await AppDataSource.manager.update(
      HomlyAdmin,
      { AdminNo: id },
      { Disabled: true }
    );

    res.status(200).json({ message: "disable sucessful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mes: "Internal Server Error" });
  }
};

export const editadmindeatails = async (req: Request, res: Response) => {
  const AdminNo = req.body.AdminNo;
  const Email = req.body.Email;
  const ContactNo = req.body.ContactNo;
  try {
    await AppDataSource.manager.update(
      HomlyAdmin,
      { AdminNo: AdminNo },
      { Email: Email, ContactNo: ContactNo }
    );

    res.status(200).json({ message: "update sucessful!" });
  } catch (error) {
    res.status(500).json({ mes: "Internal Server Error" });
  }
};

export const sendMail = (req: Request, res: Response) => {
  const { UserName, Email, AdminNo } = req.body;
  console.log(Email);

  const str = uuid();
  const arrypw = str.split("-");
  const Password = arrypw[arrypw.length - 1];
  const loginurl = "google.com";
  const saltRound = 10;
  bcrypt
    .hash(Password, saltRound)
    .then((hashedPassword) => {
      AppDataSource.manager.update(
        HomlyAdmin,
        { AdminNo: AdminNo },
        { Verified: false, Password: hashedPassword }
      );

      sentEmail(
        Email,
        "You're Admin Password resetted'",
        resetadmin(UserName, Password, AdminNo, loginurl)
      );
      res.status(200).json({ message: "mail send sucessfull" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error occured in send mail!" });
    });
};

export const getcomplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await AppDataSource.manager.find(Complaints);
    res.status(200).json(complaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const get_user_from_user = async (req: Request, res: Response) => {
  const serviceno = req.params.serviceno;
  try {
    const user = await HomlyUser.find({
      where: {
        service_number: serviceno,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const get_user_from_employee = async (req: Request, res: Response) => {
  const serviceno = req.params.serviceno;
  try {
    const user = await Employee.find({
      where: {
        service_number: serviceno,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const getprevcomplaints = async (req: Request, res: Response) => {
  const serviceno = req.params.serviceno;
  try {
    const complaints = await AppDataSource.manager.find(Complaints, {
      where: {
        ServiceNo: serviceno,
        Marked: true,
      },
    });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const addtoblacklist = async (req: Request, res: Response) => {
  try {
    const serviceno = req.body.ServiceNo;
    const reason = req.body.Reason;
    console.log(`service no is ${serviceno}`);
    console.log(`ressonis ${reason}`);

    await HomlyUser.update(
      { service_number: serviceno },
      { blacklisted: true }
    );

    const UserDetails = await AppDataSource.getRepository(HomlyUser)
      .createQueryBuilder("user")
      .where({ service_number: serviceno })
      .getOne();
    console.log(UserDetails);
    const Email = String(UserDetails?.email);

    const addtoblacklist = BlackListedUser.create({
      BlackListReason: reason,
      ServiceNo: serviceno,
    });
    addtoblacklist
      .save()
      .then(() => {
        sentEmail(
          Email,
          "You Are BlackListed From Homly",
          BlacklistNotifyEmail()
        );
        res.status(200).json({ message: "User blacklisted successfully" });
      })
      .catch((error: Error) => {
        console.log(`error is ${error}`);
        res
          .status(500)
          .json({ message: "Internal Server Error in Blacklist !(adding)" });
      });
  } catch (error) {
    res.status(500).json({
      message: `error in  blacklisting (get details or update homly user table  ) ${error}`,
    });
  }
};

export const getblacklistedusers = async (req: Request, res: Response) => {
  try {
    const BlackListedUsers = await AppDataSource.manager.find(BlackListedUser);
    res.status(200).json(BlackListedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error!! in getting all blacklisted users ",
    });
  }
};
export const checkuserexist = async (req: Request, res: Response) => {
  try {
    const serviceno = req.params.serviceno;
    const count = await BlackListedUser.count({
      where: {
        ServiceNo: serviceno,
      },
    });
    if (count > 0) {
      res.status(200).json({ exist: true });
    } else {
      res.status(200).json({ exist: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in check user exist!" });
  }
};

export const getOngoingReservation = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
  try {
    const currentDate = new Date();
    const reservation = await AppDataSource.manager.find(Reservation, {
      where: {
        CheckoutDate: MoreThan(currentDate),
        IsCancelled:false,
      },
      order: {
        CheckinDate: 'ASC',
      },
    });

    let reservationDetails = [];
    for (var i = 0; i < reservation.length; i++) {
      const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
        select: ["roomCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
        select: ["hallCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name","MainImage","AdminNo"],
        where: {
          HolidayHomeId: reservation[i].HolidayHome,
        },
      });
      const employeeName = await AppDataSource.manager.find(Employee, {
        select: ["name"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      const employeeDetails = await AppDataSource.manager.find(HomlyUser, {
        select: ["contact_number", "email", "image"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      if (reservedrooms.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: [],
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
      if (reservedhalls.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: [],
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      
      } else {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
    }
    if(adminNo === "HomlyPriAdmin"){

      res.status(200).json(reservationDetails);
    }else{
      let adminReservation = [];
      for (var i = 0; i < reservationDetails.length; i++) {
        console.log(reservationDetails[i].holidayHome[0].AdminNo)
        if (reservationDetails[i].holidayHome[0].AdminNo === adminNo) {

          adminReservation.push(reservationDetails[i]);
        }
      }
      
      res.status(200).json(adminReservation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const getPastReservation = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
  try {
    const currentDate = new Date();
    const reservation = await AppDataSource.manager.find(Reservation, {
      where: {
        CheckoutDate: LessThan(currentDate),
        IsPaid:true,
      },
      order: {
        CheckinDate: 'ASC',
      },
    });

    let reservationDetails = [];
    for (var i = 0; i < reservation.length; i++) {
      const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
        select: ["roomCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
        select: ["hallCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name","MainImage","AdminNo"],
        where: {
          HolidayHomeId: reservation[i].HolidayHome,
        },
      });
      const employeeName = await AppDataSource.manager.find(Employee, {
        select: ["name"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      const employeeDetails = await AppDataSource.manager.find(HomlyUser, {
        select: ["contact_number", "email", "image"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });  
      if (reservedrooms.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: [],
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
      if (reservedhalls.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: [],
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      } else {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
    }
    if(adminNo === "HomlyPriAdmin"){
      res.status(200).json({reservationDetails:reservationDetails, adminNo: adminNo});
    }else{
      let adminReservation = [];
      for (var i = 0; i < reservationDetails.length; i++) {
        console.log(reservationDetails[i].holidayHome[0].AdminNo)
        if (reservationDetails[i].holidayHome[0].AdminNo === adminNo) {
          adminReservation.push(reservationDetails[i]);
        }
      }
      
      res.status(200).json({reservationDetails:adminReservation, adminNo: adminNo});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const getSpecialReservation = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
  try {
    const reservation = await AppDataSource.manager.find(Reservation, {
      where: {
        IsSpecial:true,
      },
      order: {
        CheckinDate: 'ASC',
      },
    });

    let reservationDetails = [];
    for (var i = 0; i < reservation.length; i++) {
      const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
        select: ["roomCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
        select: ["hallCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name","MainImage","AdminNo"],
        where: {
          HolidayHomeId: reservation[i].HolidayHome,
        },
      });
      const employeeName = await AppDataSource.manager.find(Employee, {
        select: ["name"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      const employeeDetails = await AppDataSource.manager.find(HomlyUser, {
        select: ["contact_number", "email", "image"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      if (reservedrooms.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: [],
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
      if (reservedhalls.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: [],
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      } else {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
    }
    if(adminNo === "HomlyPriAdmin"){

      res.status(200).json(reservationDetails);
    }else{
      let adminReservation = [];
      for (var i = 0; i < reservationDetails.length; i++) {
        console.log(reservationDetails[i].holidayHome[0].AdminNo)
        if (reservationDetails[i].holidayHome[0].AdminNo === adminNo) {

          adminReservation.push(reservationDetails[i]);
        }
      }
      
      res.status(200).json(adminReservation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const getCanceledReservation = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
  try {
    const reservation = await AppDataSource.manager.find(Reservation, {
      where: {
        IsCancelled:true,
      },
      order: {
        CheckinDate: 'ASC',
      },
    });

    let reservationDetails = [];
    for (var i = 0; i < reservation.length; i++) {
      const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
        select: ["roomCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
        select: ["hallCode"],
        where: {
          ReservationId: reservation[i].ReservationId,
        },
      });
      const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name","MainImage","AdminNo"],
        where: {
          HolidayHomeId: reservation[i].HolidayHome,
        },
      });
      const employeeName = await AppDataSource.manager.find(Employee, {
        select: ["name"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      const employeeDetails = await AppDataSource.manager.find(HomlyUser, {
        select: ["contact_number", "email", "image"],
        where: {
          service_number: reservation[i].ServiceNO,
        },
      });
      if (reservedrooms.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: [],
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
      if (reservedhalls.length === 0) {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: [],
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      } else {
        reservationDetails.push({
          reservation: reservation[i],
          reservedrooms: reservedrooms,
          reservedhalls: reservedhalls,
          holidayHome:holidayHome,
          employeeName:employeeName,
          employeeDetails:employeeDetails
        });
      }
    }
    if(adminNo === "HomlyPriAdmin"){

      res.status(200).json(reservationDetails);
    }else{
      let adminReservation = [];
      for (var i = 0; i < reservationDetails.length; i++) {
        console.log(reservationDetails[i].holidayHome[0].AdminNo)
        if (reservationDetails[i].holidayHome[0].AdminNo === adminNo) {

          adminReservation.push(reservationDetails[i]);
        }
      }
      
      res.status(200).json(adminReservation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const removefromblacklist = async (req: Request, res: Response) => {
  const serviceno = req.body.ServiceNo;
  const Email = req.body.Email;

  try {
    await BlackListedUser.delete({ ServiceNo: serviceno });
    await AppDataSource.manager.update(
      HomlyUser,
      { service_number: serviceno },
      { blacklisted: false }
    );

    sentEmail(Email, "Your Are Removed From BlackList", BlacklistRemoveEmail());
  } catch (error) {
    console.log(`error in removing from blacklist ${error}`);
  }
};

//functions related to remove from blacklist

export const deletefromblacklisttable = async (req: Request, res: Response) => {
  const serviceno = req.body.ServiceNo;
  try {
    await BlackListedUser.delete({ ServiceNo: serviceno });

    res
      .status(200)
      .json({ message: "sucess fully removed from blacklist table" });
  } catch (error) {
    res.status(404).json({ message: "error in removing from blacklist table" });
  }
};

export const updatehomlyuser = async (req: Request, res: Response) => {
  const serviceno = req.body.ServiceNo;
  const Email = req.body.Email;
  try {
    await AppDataSource.manager.update(
      HomlyUser,
      { service_number: serviceno },
      { blacklisted: false }
    );

    sentEmail(Email, "Your Are Removed From BlackList", BlacklistRemoveEmail());
    res.status(200).json({ message: "sucessfully updated as unblacklisted" });
  } catch (error) {
    res.status(500).json({ message: "error in updaing unblacklisted" });
  }
};
export const addtoblacklisthistory = async (req: Request, res: Response) => {
  const serviceno = req.body.ServiceNo;
  const addreson = req.body.AddReason;
  const Removereason = req.body.RemoveReason;
  const blacklisteddate = req.body.BlacklistedDate;

  try {
    const addtoblacklisthistory = BlackListHistory.create({
      Addreason: addreson,
      ServiceNo: serviceno,
      BlacklistedDate: blacklisteddate,
      RemoveReason: Removereason,
    });
    await addtoblacklisthistory.save();

    res
      .status(200)
      .json({ message: "sucessfully added to blacklis history table" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in adding to blacklis history table" });
  }
};

export const getblacklistedhistory = async (req: Request, res: Response) => {
  try {
    const BlackListedHistory = await AppDataSource.manager.find(
      BlackListHistory
    );
    res.status(200).json(BlackListedHistory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in getting blacklis history table" });
  }
};

export const markedcomplaints = async (req: Request, res: Response) => {
  try {
    const CompID = req.body.CompID;
    await AppDataSource.manager.update(
      Complaints,
      { ComplaintID: CompID },
      { Marked: true }
    );

    res.status(200).json({ message: "Successfully marked the complaint" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in marking the complaint as viewed!" });
  }
};

export const getNotApprovedHomes = async (req: Request, res: Response) => {
  try {
    const homes = await AppDataSource.manager.find(HolidayHome, {
      where: {
        Approved: false,
      },
    });

    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ message: "Error in getting not approved homes!" });
  }
};

export const approveHH = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    await HolidayHome.update(id, { Approved: true });
    res.status(200).json({ message: "Successfully approved the home" });
  } catch (error) {
    res.status(500).json({ message: "Error in approving the home!" });
  }
};

export const rejectHH = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    await HolidayHome.delete({ HolidayHomeId: id });
    res.status(200).json({
      message: "Successfully rejected the home(deleted from HH table)",
    });
  } catch (error) {
    res.status(500).json({ message: "Error in rejecting the home!" });
  }
};

export const HHcount = async (req: Request, res: Response) => {
  try {
    const count = await HolidayHome.count();
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting home count!" });
  }
};

export const Earning = async (req: Request, res: Response) => {
  try {
    const sum = await Reservation.sum("Price", { IsPaid: true });
    res.status(200).json({ sum: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in calculating earnings!" });
  }
};

export const Active_InActive_HHcount = async (req: Request, res: Response) => {
  try {
    const ac_count = await HolidayHome.countBy({ Status: "Active" });
    const in_ac_count = await HolidayHome.countBy({ Status: "Inactive" });
    res.status(200).json({ Active: ac_count, Inactive: in_ac_count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in calculating active home count!" });
  }
};
export const getBookingscounts = async (req: Request, res: Response) => {
  try {
    const paid_count = await Reservation.countBy({ IsPaid: true });
    const unpaid_count = await Reservation.countBy({ IsPaid: false });
    res.status(200).json({ Paid: paid_count, Unpaid: unpaid_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting bookings!" });
  }
};

export const gethallcount = async (req: Request, res: Response) => {
  try {
    const hall_count = await Hall.countBy({});
    res.status(200).json({ count: hall_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting hall count!" });
  }
};

export const getroomcount = async (req: Request, res: Response) => {
  try {
    const room_count = await Room.countBy({});
    res.status(200).json({ count: room_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting hall count!" });
  }
};

export const Hallincome = async (req: Request, res: Response) => {
  try {
    const sum = await Reservation.sum("HallPrice", { IsPaid: true });
    res.status(200).json({ hallincome: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in calculating hall income!" });
  }
};

export const Roomincome = async (req: Request, res: Response) => {
  try {
    const sum = await Reservation.sum("RoomPrice", { IsPaid: true });
    res.status(200).json({ roomincome: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in room income!" });
  }
};

export const get_income_in_date = async (req: Request, res: Response) => {
  const date = req.params.date;
  //get all paid ones
  try {
    const reservations = await Reservation.find({
      where: { IsPaid: true },
      select: ["Price", "createdAt"],
    });
    //chnage the format of the time(to easy comparing)
    const modifiedReservations = reservations.map((reservation) => ({
      Price: reservation.Price,
      createdAt: reservation.createdAt.toISOString().split("T")[0],
    }));

    const targetDate = date;
    //get reservations in given date
    const reservationsForDate = modifiedReservations.filter(
      (reservation) => reservation.createdAt === targetDate
    );

    let sumForDate = 0;
    reservationsForDate.forEach((reservation) => {
      sumForDate += reservation.Price;
    });

   
    res.status(200).json({ sumForDate });
  } catch (error) {
    res.status(500).json({ message: "error occured in get income in date" });
  }
};

export const getallHH = async (req: Request, res: Response) => {
  try {
    const HH = await HolidayHome.find({
      select: {
        Name: true,
        HolidayHomeId: true,
      },
    });
    res.status(200).json({ HH });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all HH names " });
  }
};

export const get_income_in_date_specificHH = async (
  req: Request,
  res: Response
) => {
  const date = req.params.date;
  const hhid = req.params.hhid;

  try {
    const reservations = await Reservation.find({
      where: { IsPaid: true, HolidayHome: hhid },
      select: ["Price", "createdAt"],
    });
    const modifiedReservations = reservations.map((reservation) => ({
      Price: reservation.Price,
      createdAt: reservation.createdAt.toISOString().split("T")[0],
    }));

    const targetDate = date;

    const reservationsForDate = modifiedReservations.filter(
      (reservation) => reservation.createdAt === targetDate
    );

    let sumForDate = 0;
    reservationsForDate.forEach((reservation) => {
      sumForDate += reservation.Price;
    });

    res.status(200).json({ sumForDate });
  } catch (error) {
    res.status(500).json({ message: "Error " });
  }
};

export const get_not_approved_count = async (req: Request, res: Response) => {
  try {
    const count = await HolidayHome.count({
      where: {
        Approved: false,
      },
    });
    res.status(200).json({ notapprovedcount: count });
  } catch {
    res.status(500).json({ message: "Error in getting not approved count" });
  }
};

export const get_holiday_home_rating = async (req: Request, res: Response) => {
  
  const holidayhomeid = req.params.homeid;
  try {
    const rating = await AppDataSource.manager.find(HolidayHome, {
      select: {
        overall_rating: true,
      },
      where: {
        HolidayHomeId: holidayhomeid,
      },
    });
    
    res.status(200).json({ rating });
  } catch {
    res.status(500).json({ message: "error in getting holiday home rating" });
  }
};

export const everyFiveSeconds = schedule.scheduleJob('0 0 * * *', () => {
  console.log('Task executed every 5 seconds:', new Date().toLocaleTimeString());
});