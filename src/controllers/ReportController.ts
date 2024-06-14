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
  try {
    let reservations: any[] = [];
    if (HHName && HHName !== "all") {
      const hhid = HHName.toString();
      reservations = await AppDataSource.manager.find(Reservation, {
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
      console.log(reservations, "aaaaaaaaaaaaaaaaaaa");
    } else {
      reservations = await AppDataSource.manager.find(Reservation, {
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

    console.log(reservations, "ffffffffff");

    let totalPrice: any[] = [];
    let HHcount = 0;
    let tPrice = 0;

    for (let i = 0; i < reservations.length; i++) {
      console.log(reservations[i].HolidayHome, "res");
      if (totalPrice.includes(reservations[i].HolidayHome)) {
        totalPrice.forEach((t) => {
          if (t.HHID === reservations[i].HolidayHome) {
            t.TotalPrice = t.TotalPrice + reservations[i].Price;
          }
        });
      } else {
        await AppDataSource.manager
          .find(HolidayHome, {
            where: {
              HolidayHomeId: reservations[i].HolidayHome,
            },
          })
          .then((hhdetails) => {
            totalPrice.push({
              HHID: reservations[i].HolidayHome,
              HHName: hhdetails[0].Name,
              TotalPrice: reservations[i].Price,
            });
            HHcount = HHcount + 1;
          });
      }
      tPrice = tPrice + reservations[i].Price;
    }

    console.log(totalPrice);
    res
      .status(200)
      .json({ TotalPerHH: totalPrice, HHcount: HHcount, TotalPrice: tPrice });
  } catch (err) {
    res.status(500);
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

const getReservationReport = async (req: Request, res: Response) => {
  const { fromDate, toDate } = req.query;
  console.log(fromDate, toDate, "aaaaaaaaaa");
  const fDate = new Date(fromDate as string);
  const tDate = new Date(toDate as string);
  try {
    let reservations: any[] = [];
    reservations = await AppDataSource.manager.find(Reservation, {
      where: [
        {
          CheckinDate: Between(fDate, tDate),
          IsPaid: true,
        },
        {
          CheckinDate: Between(fDate, tDate),
          IsPaid: true,
        },
        {
          CheckinDate: LessThan(fDate),
          CheckoutDate: MoreThanOrEqual(tDate),
          IsPaid: true,
        },
      ],
    });
    console.log(reservations, "aaaaaaaaaaaaaaaaaaa");
    console.log(reservations, "ffffffffff");
    res
    .status(200)
    .json({filteredreservations:reservations});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export { getGeneratedReport, getHolidayHomeId, getReservationReport };
