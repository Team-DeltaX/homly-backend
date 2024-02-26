import express from "express";
const router = express.Router();
import { SpecailReservation } from "../entities/SpecialReservation";
import { Request, Response } from "express";
import { AppDataSource } from "../index";


const AddSpecialResrvation = async (req: Request, res: Response) => {
  const {
    ServiceNo,
    HolidayHome,
    CheckinDate,
    CheckoutDate,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(SpecailReservation)
      .values([
        {
          ServiceNo,
          HolidayHome,
          CheckinDate,
          CheckoutDate,
        },
      ])
      .execute();

  

    res.status(200).json({ message: "Special Reservation added successfully" });

  } catch (error) {
    
    
    
      console.log(`error is ${error}`);
      res.status(500).json({ message: "Internal Server Error!" });
    
  }
  console.log(ServiceNo,HolidayHome,CheckinDate,CheckoutDate);
};

const getSpecialReservation = async (req: Request, res: Response) => {
  const SpecailReservations = await AppDataSource.manager.find(SpecailReservation);
  try {
    const SpecailReservations = await AppDataSource.manager.find(SpecailReservation);
    res.status(200).json(SpecailReservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};


export { getSpecialReservation,AddSpecialResrvation };
