import { Request, Response } from "express";
import { AppDataSource } from "..";
import { Reservation } from "../entities/Reservation";
import { BlackListHistory } from "../entities/BlackListHistory";
import {
  Any,
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import { HolidayHome } from "../entities/HolidayHome";
import { Employee } from "../entities/Empolyee";

const getEmployeeName = async (ServiceNo: string): Promise<string> => {
  console.log("Service Number in getEmployeeName:", ServiceNo);
  try {
    const employee = await AppDataSource.manager.find(Employee, {
      select: ["name"],
      where: {
        service_number: ServiceNo,
      },
    });
    return employee[0].name;
  } catch (error) {
    console.log(`error is ${error}`);
    return "Employee";
  }
};


const getGeneratedReport = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
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
    } 
    else {
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
      }
      else if(adminNo !== "HomlyPriAdmin"){
        console.log("admin noooooooooooooooogb", adminNo)
        await AppDataSource.manager
          .find(HolidayHome, {
            where: {
              AdminNo: "HomlyLocAdmin27",
              HolidayHomeId: reservations[i].HolidayHome,
            },
          })
          .then((hhdetails) => {
            console.log("vnvvnvnv")
            totalPrice.push({
              HHID: reservations[i].HolidayHome,
              HHName: hhdetails[0].Name,
              TotalPrice: reservations[i].Price,
            });
            HHcount = HHcount + 1;
            console.log(hhdetails[0].AdminNo, "hhdetails[0].AdminNo")
          });
          console.log(HHcount, "HHcount")
      }
      else {
        console.log("admin noooooooooooooojbhjoogb", adminNo)
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

const getLocHolidayHomeId = async (req: Request, res: Response) => {
  const adminNo = (req as any).serviceNo;
  await AppDataSource.manager
    .find(HolidayHome, {
      where: {
        AdminNo: adminNo,
      },
      select: ["HolidayHomeId", "Name"],
    })
    .then((hhdetails) => {
      console.log("admin no", adminNo)
      console.log(hhdetails);
      res.status(200).json(hhdetails);
    })
    .catch(() => {
      res.status(500);
    });
};


const getReservationReport = async (req: Request, res: Response) => {
  const { HHName, fromDate, toDate } = req.query;
  console.log(fromDate, toDate, "date");
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

    const reservationWithHH: any[] = [];
    for (let i = 0; i < reservations.length; i++) {
      await AppDataSource.manager
        .find(HolidayHome, {
          select: ["Name"],
          where: {
            HolidayHomeId: reservations[i].HolidayHome,
          },
        })
        .then(async (hhdetails) => {
          await AppDataSource.manager
            .find(Employee, {
              select: ["name"],
              where: {
                service_number: reservations[i].ServiceNO,
              },
            })
            .then((empDetails) => {
              reservationWithHH.push({
                reservations: reservations[i],
                hhName: hhdetails[0].Name,
                empName: empDetails[0].name,
              });
            });
        });
    }
    console.log(reservationWithHH, "res");
    res.status(200).json(reservationWithHH);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getBlackListHistory = async (req: Request, res: Response) => {
  const { fromDate, toDate } = req.query;
  const fDate = new Date(fromDate as string);
  const tDate = new Date(toDate as string);
  try {
    let blackListHistory: any[] = [];
    blackListHistory = await AppDataSource.manager.find(BlackListHistory, {
      where: [
        {
          BlacklistedDate: Between(fromDate, toDate),
        },
        {
          RemovedDate: Between(fDate, tDate),
        },
        {
          BlacklistedDate: LessThan(fromDate),
          RemovedDate: MoreThanOrEqual(tDate),
        },
      ],
    });
    const blackListHistoryWithNames = await Promise.all(
      blackListHistory.map(async (record) => {
        console.log("Record structure:", record);  // Log the record structure
        const empName = await getEmployeeName(record.ServiceNo);  // Use ServiceNo here
        console.log("ServiceNo:", record.ServiceNo, "empName:", empName);
        return {
          ...record,
          empName,
        };
      })
    );
    // console.log("blackListHistoryWithNames", blackListHistoryWithNames);
    res.status(200).json(blackListHistoryWithNames);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
export {
  getGeneratedReport,
  getHolidayHomeId,
  getReservationReport,
  getBlackListHistory,
  getLocHolidayHomeId,
};
