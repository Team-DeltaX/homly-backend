import express from "express";
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
// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import resetadmin from "../template/resetadmin";

// import dotenv
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
import { Reservation } from "../entities/Reservation";
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
  const count =await AppDataSource.manager.count(HomlyAdmin)
  const AdminNo=`HomlyLocAdmin${count+1}`
  const {
   
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



//  const UserDetails = await HomlyUser.findOne({
//     where: {
//       service_number: serviceno,
//     },
//   });
//   console.log(UserDetails)
//   const Email = String(UserDetails?.email);

  const UserDetails= await AppDataSource
    .getRepository(HomlyUser)
    .createQueryBuilder("user")
    .where( {  service_number: serviceno})
    .getOne()
    console.log(UserDetails)
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

export const getOngoingReservation = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    let Reservations = await AppDataSource.manager.find(Reservation, {
      where: {
        CheckoutDate: MoreThan(currentDate),
      },
    });

    // reverse reservation
    Reservations = Reservations.reverse();

    console.log(Reservations, Reservations.length);
    let reservationData: { Reservations: Reservation[]; empName: string }[] = [];
    if (Reservations) {
      for (let i = 0; i < Reservations.length; i++) {
        if (Reservations[i].ServiceNO) {
          const service_no = Reservations[i].ServiceNO;
          console.log(service_no);

          await AppDataSource.manager
            .find(Employee, {
              where: { service_number: service_no },
            })
            .then((response) => {
              console.log(response[0].name);
              reservationData.push({
                Reservations: Reservations,
                empName: response[0].name,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    }
    res.status(200).json(reservationData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const getPastReservation = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    let Reservations = await AppDataSource.manager.find(Reservation, {
      where: {
        CheckoutDate: LessThan(currentDate),
      },
    });

    // reverse reservation
    Reservations = Reservations

    console.log(Reservations, Reservations.length);
    let reservationData: { Reservations: Reservation[]; empName: string }[] = [];
    if (Reservations) {
      for (let i = 0; i < Reservations.length; i++) {
        if (Reservations[i].ServiceNO) {
          const service_no = Reservations[i].ServiceNO;
          console.log(service_no);

          await AppDataSource.manager
            .find(Employee, {
              where: { service_number: service_no },
            })
            .then((response) => {
              console.log(response[0].name);
              reservationData.push({
                Reservations: Reservations,
                empName: response[0].name,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    }
    res.status(200).json(reservationData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export const removefromblacklist=async(req:Request,res:Response)=>{
  const serviceno=req.body.ServiceNo;
  const Email=req.body.Email;
  // const Name =req.body.UserName;


  try{
    await BlackListedUser.delete({ ServiceNo: serviceno })
    await AppDataSource.manager.update(
      HomlyUser,
      { service_number: serviceno },
      { blacklisted: false });

    sentEmail(Email,"Your Are Removed From BlackList",BlacklistRemoveEmail())  
  }
  catch(error){
    console.log(`error in removing from blacklist ${error}`)
  }



}

//functions related to remove from blacklist

export const deletefromblacklisttable=async(req:Request,res:Response)=>{
  const serviceno=req.body.ServiceNo;
  try{
    await BlackListedUser.delete({ ServiceNo: serviceno })
    
    res.status(200).json({message:'sucess fully removed from blacklist table'});
  


  }catch(error){
    // console.log(`error in removing from blacklist ${error}`)
    res.status(404).json({message:'error in removing from blacklist table'})
    

  }

}


export const updatehomlyuser=async(req:Request,res:Response)=>{
  const serviceno=req.body.ServiceNo;
  const Email=req.body.Email;
  try{
    await AppDataSource.manager.update(
      HomlyUser,
      { service_number: serviceno },
      { blacklisted: false });

    sentEmail(Email,"Your Are Removed From BlackList",BlacklistRemoveEmail())  
    res.status(200).json({message:'sucessfully updated as unblacklisted'})
    
    
  }catch(error){
    console.log(`error in updating user unblacklist false ${error}`)
    res.status(404).json({message:'error in updaing unblacklisted'})

  }

  
}
export const addtoblacklisthistory = async (req: Request, res: Response) => {
  
  const serviceno = req.body.ServiceNo;
  const addreson = req.body.AddReason;
  const Removereason = req.body.RemoveReason;
  const blacklisteddate = req.body.BlacklistedDate;

  try {
    const addtoblacklisthistory = BlackListHistory.create({
      // BlackListHistoryId: "12",
      Addreason: addreson,
      ServiceNo: serviceno,
      BlacklistedDate: blacklisteddate,
      RemoveReason: Removereason,
    });
    await addtoblacklisthistory.save();
    
    res.status(200).json({message:'sucessfully added to blacklis history table'})
  
    
  } catch (error) {
    res.status(404).json({ message: 'error in adding to blacklis history table' });
  }
};


export const getblacklistedhistory=async(req:Request,res:Response)=>{
  try{
    const BlackListedHistory = await AppDataSource.manager.find(BlackListHistory);
    res.status(200).json(BlackListedHistory);
  }catch(error){
    res.status(404).json({ message: 'error in getting blacklis history table' });
  }
}





export const markedcomplaints = async (req: Request, res: Response) => {
  try {
    const serviceno = req.body.ServiceNo;
    await AppDataSource.manager.update(
      Complaints,
      { ServiceNo: serviceno },
      { Marked: true }
    );

    res.status(200).json({ message: 'Successfully marked the complaint' });
  } catch (error) {
    res.status(404).json({ message: 'Error in marking the complaint as viewed!' });
  }
};

export const getNotApprovedHomes=async(req:Request,res:Response)=>{
  try{
    const homes= await AppDataSource.manager.find(HolidayHome, {
      where: {
        Approved:false
      },
    });
    
    res.status(200).json(homes);
  }
  catch(error){
    res.status(404).json({ message: 'Error in getting not approved homes!' });
  }
}

export const approveHH=async(req:Request,res:Response)=>{
  const id=req.body.id;
  try{
    await HolidayHome.update(id, { Approved:true })
    res.status(200).json({ message: 'Successfully approved the home' });
  }
  catch(error){
    res.status(404).json({ message: 'Error in approving the home!' });
  }
}

export const rejectHH=async(req:Request,res:Response)=>{
  const id=req.body.id;
  try{
    await HolidayHome.delete({  HolidayHomeId:id})
    res.status(200).json({ message: 'Successfully rejected the home(deleted from HH table)' });


  }catch(error){
    res.status(404).json({ message: 'Error in rejecting the home!' });
  }
}

export const HHcount =async(req:Request,res:Response)=>{ 
  try{
    const count = await HolidayHome.count();
    res.status(200).json({count:count});
  }catch(error){
    res.status(404).json({ message: 'Error in getting home count!' });
  }
}

export const Earning=async(req:Request,res:Response)=>{
  try{
    const sum = await Reservation.sum('Price',{});
    console.log(sum)
    res.status(200).json({ sum: sum });
    
  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: 'Error in calculating earnings!' });
  }
}

export const Active_InActive_HHcount=async(req:Request,res:Response)=>{
  try{
    const ac_count = await HolidayHome.countBy({ Status: "Active" })
    const in_ac_count = await HolidayHome.countBy({ Status: "Inactive" })
    res.status(200).json({Active:ac_count,Inactive:in_ac_count}  );

  }catch(error){
    res.status(500).json({ message: 'Error in calculating active home count!' });
  }

}
// export { router };