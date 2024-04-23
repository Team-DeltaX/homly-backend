import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Reservation } from "../entities/Reservation";
import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { HolidayHome } from "../entities/HolidayHome";

const getGeneratedReport = async (req: Request, res: Response) => {
  const { HHName, fromDate, toDate } = req.query;
  console.log(HHName, fromDate, toDate, "aaaaaaaaaaaaaaaaaaaaaaa");
  const fDate = new Date(fromDate as string);
  const tDate = new Date(toDate as string);
  let reservation;
  try {
    if (HHName && HHName !== "all") {
      const hhid = HHName.toString();
      reservation = await AppDataSource.manager.find(Reservation, {
        where: [
          {
            CheckinDate: Between(fDate, tDate),
            HolidayHome: hhid,
          },
          {
            CheckinDate: Between(fDate, tDate),
            HolidayHome: hhid,
          },
          {
            CheckinDate: LessThan(fDate),
            CheckoutDate: MoreThanOrEqual(tDate),
            HolidayHome: hhid,
          },
        ],
      });
    } else {
      reservation = await AppDataSource.manager.find(Reservation, {
        where: [
          {
            CheckinDate: Between(fDate, tDate),
          },
          {
            CheckinDate: Between(fDate, tDate),
          },
          {
            CheckinDate: LessThan(fDate),
            CheckoutDate: MoreThanOrEqual(tDate),
          },
        ],
      });
    }
    let totalPrice = []
    reservation.forEach(r => {
      
      
    });
  } catch (err) {
    console.log(err);
  }
};

const getHolidayHomeId = async (req: Request, res: Response) => {
  await AppDataSource.manager
    .find(HolidayHome, {
      select: ["HolidayHomeId", "Name"],
    })
    .then((hhdetails) => {
      res.status(200).json(hhdetails);
    })
    .catch(() => {
      res.status(500);
    });
};

export { getGeneratedReport, getHolidayHomeId };
