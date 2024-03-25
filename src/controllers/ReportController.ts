import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Reservation } from "../entities/Reservation";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const getGeneratedReport = async (req: Request, res: Response) => {
  const dates = req.query; // Assuming from and to dates are provided in the query parameters

  let checkinDate, checkoutDate;

  if (dates.from) {
    checkinDate = new Date(dates.from as string);
  }
  if (dates.to) {
    checkoutDate = new Date(dates.to as string);
  }
  // if (!from || !to) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please provide both from and to dates" });
  // }
  // console.log(dates.from);
  // Convert string dates to Date objects
  // if (dates.from && dates.to) {
  //   const fromDate = new Date(dates.from as string);
  //   const toDate = new Date(dates.to as string);
  if (checkinDate && checkoutDate) {
    // Assuming AppDataSource.manager.find method supports filtering by date range
    try {
      // const filteredReservations = await AppDataSource.manager.find(
      //   Reservation,
      //   {
      //     where: {
      //       CheckinDate: MoreThanOrEqual(new Date(fromDate)),
      //       CheckoutDate: LessThanOrEqual(new Date(toDate)),
      //     },
      //   }
      // );
      const reservation = await AppDataSource.manager.find(Reservation, {
        where: [
          {
            // HolidayHome: holidayHomeId,
            CheckoutDate: LessThanOrEqual(new Date(checkinDate)),
          },
        ],
      });
      res.status(200).json({ reservation });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
};

export { getGeneratedReport };
