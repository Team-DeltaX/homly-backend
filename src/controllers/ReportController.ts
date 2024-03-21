import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Reservation } from "../entities/Reservation";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const getGeneratedReport = async (req: Request, res: Response) => {
  const { from, to } = req.query; // Assuming from and to dates are provided in the query parameters

  if (!from || !to) {
    return res
      .status(400)
      .json({ error: "Please provide both from and to dates" });
  }

  // Convert string dates to Date objects
  const fromDate = new Date(from.toString());
  const toDate = new Date(to.toString());

  // Assuming AppDataSource.manager.find method supports filtering by date range
  try {
    const filteredReservations = await AppDataSource.manager.find(Reservation, {
      where: {
        CheckinDate: MoreThanOrEqual(fromDate),
        CheckoutDate: LessThanOrEqual(toDate),
      },
    });
    res.status(200).json({ fromDate, toDate });
  } catch (err) {
    res.status(404).json("error");
  }
};

export { getGeneratedReport };
