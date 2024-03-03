import express from "express";
import { Reservation } from "../entities/Reservation";
import { Request, Response } from "express";
import { AppDataSource } from "../index";

const router = express.Router();

const AddResrvation = async (req: Request, res: Response) => {
  const {
    ServiceNO,
    HolidayHome,
    CheckinDate,
    CheckoutDate,
    NoOfAdults,
    NoOfChildren,
    NoOfSingleRooms,
    NoOfDoubleRooms,
    NoOfTripleRooms,
    NoOfHalls,
    Price,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();
  console.log(ServiceNO)
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
        {
          ReservationId:"10",
          ServiceNO,
          HolidayHome,
          CheckinDate,
          CheckoutDate,
          NoOfAdults,
          NoOfChildren,
          NoOfSingleRooms,
          NoOfDoubleRooms,
          NoOfTripleRooms,
          NoOfHalls,
          Price,
        },
      ])
      .execute();

    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

const getReservation = async (req: Request, res: Response) => {
  const Reservations = await AppDataSource.manager.find(Reservation);
  try {
    const Reservations = await AppDataSource.manager.find(Reservation);
    res.status(200).json(Reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

export { getReservation, AddResrvation };
