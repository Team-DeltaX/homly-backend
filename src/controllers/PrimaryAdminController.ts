import express from "express";
const router = express.Router();
import { LocationAdmin } from "../entities/LocationAdmin";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { error } from "console";
// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mnbro123321@gmail.com",
    pass: "hbqa kzdq keop rxbl",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const {
    AdminNo,
    UserName,
    Password,
    ContactNo,
    Email,
    WorkLocation,
    Disabled,
    Sub,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(LocationAdmin)
      .values([
        {
          AdminNo,
          UserName,
          Password,
          ContactNo,
          Email,
          WorkLocation,
          Disabled,
          Sub,
        },
      ])
      .execute();

      var mailOptions = {
        from: "mnbro123321@gmail.com",
        to: Email,
        subject: "You Are Added as Location Admin in Homly",
        html: `<p>Your Added As Location Admin in Homly. Your <strong>Password</strong> is <strong>${Password}</strong> and Your <strong>UserName</strong> is <strong>${UserName}</strong> and Your Work Location is ${WorkLocation}</p><br><p>in any problem please contact the primary admin</p>`
      };

    

    transporter.sendMail(mailOptions, function (error: any, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // console.log("sucess added");

    res.status(200).json({ message: "User added successfully" });

  } catch (error) {
    
    
    
      console.log(`error is ${error}`);
      res.status(500).json({ message: "Internal Server Error!" });
    
  }
});

router.get("/all", async (req: Request, res: Response) => {
  const admins = await AppDataSource.manager.find(LocationAdmin);
  try {
    const admins = await AppDataSource.manager.find(LocationAdmin);
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
});

router.put("/disable/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const dis = req.body;

  try {
    await AppDataSource.manager.update(
      LocationAdmin,
      { AdminNo: id },
      { Disabled: dis }
    );

    res.status(200).json({ message: "disable sucessful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mes: "Internal Server Error" });
  }
});

export { router };
