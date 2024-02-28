import express from "express";
const router = express.Router();
import { HomlyAdmin } from "../entities/HomlyAdmin";
import { Complaints } from "../entities/Complaint";
import { HomlyUser } from "../entities/User";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { error } from "console";
import { v4 as uuid, v4 } from "uuid";
import addadminemail from "../template/addadminemail";
import sentEmail from "../services/sentEmal";
// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import resetadmin from "../template/resetadmin";

// import dotenv
import dotenv from "dotenv";
import { Employee } from "../entities/Empolyee";
import { BlackListedUser } from "../entities/BlackListedUser";
import BlacklistNotifyEmail from "../template/BlacklistNotifyEmail";
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
  const {
    AdminNo,
    UserName,

    ContactNo,
    Email,
    WorkLocation,
    // Disabled,
    Sub,
  } = req.body;

  const Role = "LocationAdmin";

  //   const locationadmin = LocationAdmin.create();
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

          // send email
        })
        .catch((err) => {
          console.log(`error is ${error}`);
          res.status(500).json({ message: "Internal Server Error!" });
        });
    })
    .catch((err) => {
      console.log("error hashing verification code", err);
    });
};

// try {
//   await AppDataSource.createQueryBuilder()
//     .insert()
//     .into(HomlyAdmin)
//     .values([
//       {
//         AdminNo,
//         UserName,
//         Password,
//         ContactNo,
//         Email,
//         WorkLocation,
//         Role,
//         // Disabled,
//         Sub,

//       },
//     ])
//     .execute();

//     // var mailOptions = {
//     //   from: process.env.AUTH_EMAIL,
//     //   to: Email,
//     //   subject: "You Are Added as Location Admin in Homly",
//     //   html:
//     // };

//   // transporter.sendMail(mailOptions, function (error: any, info) {
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //     console.log("Email sent: " + info.response);
//   //   }
//   // });

//   // console.log("sucess added");

//   res.status(200).json({ message: "User added successfully" });

// } catch (error) {

//     console.log(`error is ${error}`);
//     res.status(500).json({ message: "Internal Server Error!" });

// }
// }

export const getall = async (req: Request, res: Response) => {
  const admins = await AppDataSource.manager.find(HomlyAdmin);
  try {
    const admins = await AppDataSource.manager.find(HomlyAdmin);
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
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
  console.log(AdminNo, ContactNo, Email);

  try {
    await AppDataSource.manager.update(
      HomlyAdmin,
      { AdminNo: AdminNo },
      { Email: Email, ContactNo: ContactNo }
    );

    res.status(200).json({ message: "update sucessful!" });
  } catch (error) {
    console.error(error);
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
      console.log("error hashing verification code", err);
    });
};

//   try {

//     sentEmail(Email,"You're Admin Password resetted'",addadminemail(UserName,Password,AdminNo,loginurl))

//     res.status(200).json({ message: "mail send sucessfull" });
//     try {
//       await AppDataSource.manager.update(
//        HomlyAdmin,
//         { AdminNo: AdminNo },
//         { Verified: false,Password:Password }
//       );

//     } catch (error) {
//       console.error(error);

//     }

//   } catch (error) {

//       console.log(`error is ${error}`);
//       res.status(500).json({ message: "mailsend error!" });

//   }

// }

export const getcomplaints = async (req: Request, res: Response) => {
  // const admins = await AppDataSource.manager.find(HomlyAdmin);
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
    console.log(error);
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

// export const get_user_from_complaints=async(req:Request,res:Response)=>{
//   const serviceno=req.body.ServiceNo
// try{
//   const complaints = await Complaints.find({
//     where: {
//       ServiceNo: serviceno,
//     }

// })
// res.send(complaints)

// }
// catch(error){
//   console.log(error);
//   res.status(500).json({ error: "Internal Server Error!!" });

// }
// }
export const getprevcomplaints = async (req: Request, res: Response) => {
  // const admins = await AppDataSource.manager.find(HomlyAdmin);
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
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const addtoblacklist = async (req: Request, res: Response) => {
  try{
    const serviceno = req.body.ServiceNo;
  const reason = req.body.Reason;
  console.log(`service no is ${serviceno}`)
  console.log(`ressonis ${reason}`)

  await HomlyUser.update({service_number:serviceno}, { blacklisted:true})



 const UserDetails = await HomlyUser.findOne({
    where: {
      service_number: serviceno,
    },
  });
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

      // send email
    })
    .catch((error: Error) => {
      console.log(`error is ${error}`);
      res.status(500).json({ message: "Internal Server Error in Blacklist !(adding)" });
    });
  }catch(error){
    console.log(`error in  blacklisting (get details or update homly user table  ) ${error}`)
  }
};



export const getblacklistedusers = async (req: Request, res: Response) => {
  // const admins = await AppDataSource.manager.find(HomlyAdmin);
  try {
    const BlackListedUsers = await AppDataSource.manager.find(BlackListedUser);
    res.status(200).json(BlackListedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!! in getting all blacklisted users " });
  }
};
export const checkuserexist=async(req:Request,res:Response)=>{
  try{const serviceno=req.params.serviceno;
    const count = await BlackListedUser.count({
      where: {
        ServiceNo: serviceno,
      },
    });
    // console.log(count)
    if(count>0){ res.status(200).json({exist:true})
  }else{
    res.status(200).json({exist:false})
}
   
    }
    catch(error){
      console.log('error in getting exist')
    }
  
}

export { router };
