import { Request, Response } from "express";
import { Reservation } from "../entities/Reservation";
import { Employee } from "../entities/Empolyee";
import { ReservedRooms } from "../entities/ReservedRooms";
import { ReservedHalls } from "../entities/ReservedHalls";
import { Complaints } from "../entities/Complaint";
import { Refund } from "../entities/Refund";
import { HolidayHome } from "../entities/HolidayHome";
import { Room } from "../entities/Room";
import { Hall } from "../entities/Hall";
import { HomlyUser } from "../entities/User";
import SendReciptEmail from "../template/SendRecipt";
import SendCancelReservationEmail from "../template/SendCancelReservation";
import sentEmail from "../services/sentEmal";
import { Between, LessThanOrEqual, LessThan, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../index";
import dayjs from "dayjs";

const expireTime = 6 * 24 * 60 * 60 * 1000;
const getHolidayHomeName = async (holidayHomeId: string): Promise<string> => {
  try {
    const holidayHome = await AppDataSource.manager.find(HolidayHome, {
      select: ["Name"],
      where: {
        HolidayHomeId: holidayHomeId,
      },
    });
    return holidayHome[0].Name;
  } catch (error) {
    return "Holiday Home";
  }
};
const AddComplaint = async (req: Request, res: Response) => {
  const {
    ServiceNo,
    AdminNo,
    ReservationNo,
    Reason,
    Marked = false,
  } = req.body;
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Complaints)
      .values([
        {
          ServiceNo,
          AdminNo,
          ReservationNo,
          Reason,
          Marked,
        },
      ])
      .execute();
    res
      .status(200)
      .json({ message: "Complaint added successfully", adminNo: AdminNo });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const adminNo = async (holidayHomeId: string): Promise<string> => {
  try {
    const holidayHome = await AppDataSource.manager.find(HolidayHome, {
      select: ["AdminNo"],
      where: {
        HolidayHomeId: holidayHomeId,
      },
    });
    return holidayHome[0].AdminNo;
  } catch (error) {
    return "Holiday Home";
  }
};
const getEmployee = async (serviceNo: string): Promise<Employee[]> => {
  try {
    const employee = await AppDataSource.manager.find(Employee, {
      where: {
        service_number: serviceNo,
      },
    });
    return employee;
  } catch (error) {
    return [];
  }
};
const getHomlyUser = async (serviceNo: string): Promise<HomlyUser[]> => {
  try {
    const homlyUser = await AppDataSource.manager.find(HomlyUser, {
      where: {
        service_number: serviceNo,
      },
    });
    return homlyUser;
  } catch (error) {
    return [];
  }
};
const getEmployeeName = async (serviceNo: string): Promise<string> => {
  try {
    const employee = await AppDataSource.manager.find(Employee, {
      select: ["name"],
      where: {
        service_number: serviceNo,
      },
    });
    return employee[0].name;
  } catch (error) {
    return "Employee";
  }
};
const AddResrvation = async (req: Request, res: Response) => {
  const {
    HolidayHome,
    CheckinDate,
    CheckoutDate,
    NoOfAdults,
    NoOfChildren,
    NoOfRooms,
    NoOfHalls,
    RoomPrice,
    HallPrice,
    Price,
    IsPaid,
    RoomCodes,
    HallCodes,
  } = req.body;
  const ServiceNO = (req as any).serviceNo;
  let employeeName = await getEmployeeName(ServiceNO);
  let VictimAdminNo = await adminNo(HolidayHome);
  let employee = await getEmployee(ServiceNO);
  let homlyUser = await getHomlyUser(ServiceNO);
  const holidayHomeName = await getHolidayHomeName(HolidayHome);
  const emailCheckinDate = dayjs(CheckinDate).format("YYYY-MM-DD");
  const emailCheckoutDate = dayjs(CheckoutDate).format("YYYY-MM-DD");
  let reserveID;
  let TotalPrice = RoomPrice + HallPrice;
  try {
    const validHolidayHome = await checkHolidayHomeValidation(HolidayHome);
    if(validHolidayHome && validHolidayHome.length > 0) {
      const reservationId = await AppDataSource.query(
        `SELECT MAX("ReservationId") as maxval FROM "INOADMIN"."reservation"`
      );
      let maxvalue = reservationId[0].MAXVAL;
  
      if (maxvalue) {
        let num = parseInt(maxvalue.split("-")[1]);
        num++;
        reserveID = "RES-" + num.toString().padStart(5, "0"); 
      } else {
        reserveID = "RES-00001"; 
      }
  
      let checkinDate = new Date(CheckinDate);
      checkinDate.setHours(0, 0, 0, 0);  
      let checkoutDate = new Date(CheckoutDate);
      checkoutDate.setHours(23, 59, 0, 0);
      
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Reservation)
        .values([
          {
            ReservationId: reserveID,
            ServiceNO,
            HolidayHome,
            CheckinDate: checkinDate, 
            CheckoutDate: checkoutDate,
            NoOfAdults,
            NoOfChildren,
            NoOfRooms,
            NoOfHalls,
            RoomPrice,
            HallPrice,
            Price,
            IsPaid,
          },
        ])
        .execute();
      if (RoomCodes) {
        for (var i = 0; i < RoomCodes.length; i++) {
          await AppDataSource.createQueryBuilder()
            .insert()
            .into(ReservedRooms)
            .values([
              {
                ReservationId: reserveID,
                roomCode: RoomCodes[i],
              },
            ])
            .execute();
        }
      }
      if (HallCodes) {
        for (var i = 0; i < HallCodes.length; i++) {
          await AppDataSource.createQueryBuilder()
            .insert()
            .into(ReservedHalls)
            .values([
              {
                ReservationId: reserveID,
                hallCode: HallCodes[i],
              },
            ])
            .execute();
        }
      }
      res
        .status(200)
        .json({
          message: "Reservation added successfully",
          reservationId: reserveID,
          adminNumber: VictimAdminNo,
          serviceNo: ServiceNO,
          empName: employeeName,
          holidayHomeName: holidayHomeName,
          employeeDetails: employee,
          userDetails: homlyUser,
        });
        const employeeEmail = (
          await AppDataSource.manager.find(HomlyUser, {
            select: ["email"],
            where: {
              service_number: ServiceNO,
            },
          })
        )[0]?.email;
        const sendRecipt = (
          email: string,
          employeeName: string,
          holidayHome: string,
          reservationNumber: string,
          checkinDate: Date,
          checkoutDate: Date,
          maxAdults: string,
          maxChildren: string,
          rooms: string,
          halls: string,
          roomPrice: string,
          hallPrice: string,
          TotalPrice: string
        ) => {
          const subject = "Reservation Recipt";
          const message = SendReciptEmail(
            employeeName,
            holidayHomeName,
            reservationNumber,
            checkinDate,
            checkoutDate,
            maxAdults,
            maxChildren,
            rooms,
            halls,
            roomPrice,
            hallPrice,
            TotalPrice
          );
          sentEmail(email, subject, message);
        };
        sendRecipt(
          employeeEmail,
          ServiceNO,
          HolidayHome,
          reserveID ?? "",
          new Date(emailCheckinDate),
          new Date(emailCheckoutDate),
          NoOfAdults,
          NoOfChildren,
          RoomCodes,
          HallCodes,
          RoomPrice,
          HallPrice,
          TotalPrice
        );
    } else{
      res.status(500).json({ text: "Invalid Holiday Home!" });
    } 
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }

};
const AddSpecialResrvation = async (req: Request, res: Response) => {
  const {
    ServiceNO,
    HolidayHome,
    CheckinDate,
    CheckoutDate,
    NoOfRooms,
    NoOfHalls,
    NoOfAdults,
    NoOfChildren,
    RoomPrice,
    HallPrice,
    Price,
    IsPaid,
  } = req.body;
  const emailCheckinDate = dayjs(CheckinDate).format("YYYY-MM-DD");
  const emailCheckoutDate = dayjs(CheckoutDate).format("YYYY-MM-DD");
  let reserveID;
  let TotalPrice = RoomPrice + HallPrice;
  let cancelreservationEmployeeServiceNo = [];
  let employeeName;
  employeeName = await getEmployeeName(ServiceNO);
  const holidayHomeName = await getHolidayHomeName(HolidayHome);
  let VictimAdminNo;
  VictimAdminNo = await adminNo(HolidayHome);
  try {
    const existingReservations = await AppDataSource.manager.find(Reservation, {
      select: ["ReservationId", "ServiceNO", "CheckinDate", "HolidayHome"],
      where: {
        IsCancelled: false,
        CheckinDate: LessThanOrEqual(new Date(CheckoutDate)),
        CheckoutDate: MoreThanOrEqual(new Date(CheckinDate)),
        HolidayHome: HolidayHome,
      },
    });
    for (const reservation of existingReservations) {
      const employeeEmail = (
        await AppDataSource.manager.find(HomlyUser, {
          select: ["email"],
          where: {
            service_number: reservation.ServiceNO,
          },
        })
      )[0]?.email;
      const SendCancelReservation = (
        email: string,
        employeeName: string,
        holidayHome: string,
        reservationNumber: string,
        checkinDate: Date,
        reason: string
      ) => {
        const subject = "Cancel Reservation Notice";
        const message = SendCancelReservationEmail(
          employeeName,
          holidayHome,
          reservationNumber,
          checkinDate,
          reason
        );
        sentEmail(employeeEmail, subject, message);
      };

      SendCancelReservation(
        employeeEmail,
        reservation.ServiceNO,
        HolidayHome,
        reservation.ReservationId,
        reservation.CheckinDate,
        "Special Reservation Allocated"
      );
      cancelreservationEmployeeServiceNo.push(reservation.ServiceNO);
    }
    for (const reservation of existingReservations) {
      await AppDataSource.manager.update(
        Reservation,
        {
          ReservationId: reservation.ReservationId,
        },
        {
          IsCancelled: true,
          CancelledBy: "Primary Admin",
        }
      );
      await AppDataSource.manager.delete(ReservedRooms, {
        ReservationId: reservation.ReservationId,
      });
      await AppDataSource.manager.delete(ReservedHalls, {
        ReservationId: reservation.ReservationId,
      });
    }
    const reservationId = await AppDataSource.query(
      `SELECT MAX("ReservationId") as maxval FROM "INOADMIN"."reservation" ORDER BY "createdAt"`
    );
    let maxvalue = reservationId[0].MAXVAL;
    if (maxvalue) {
      let num = parseInt(maxvalue.split("-")[1]);
      num++; 
      reserveID = "RES-" + num.toString().padStart(5, "0"); 
    } else {
      reserveID = "RES-00001"; 
    }
    let checkinDate = new Date(CheckinDate);
    checkinDate.setHours(0, 0, 0, 0);

    let checkoutDate = new Date(CheckoutDate);
    checkoutDate.setHours(23, 59, 0, 0);

    const rooms = await AppDataSource.manager.find(Room, {
      where: {
        HolidayHomeId: HolidayHome,
      },
    });
    const halls = await AppDataSource.manager.find(Hall, {
      where: {
        HolidayHomeId: HolidayHome,
      },
    });

    AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
        {
          ReservationId: reserveID,
          ServiceNO,
          HolidayHome,
          CheckinDate: checkinDate, 
          CheckoutDate: checkoutDate, 
          NoOfAdults,
          NoOfChildren,
          NoOfRooms,
          NoOfHalls,
          RoomPrice,
          HallPrice,
          Price,
          IsPaid,
          IsSpecial: true,
        },
      ])
      .execute();

    for (var i = 0; i < rooms.length; i++) {
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(ReservedRooms)
        .values([
          {
            ReservationId: reserveID,
            roomCode: rooms[i].roomCode,
          },
        ])
        .execute();
    }

    for (var i = 0; i < halls.length; i++) {
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(ReservedHalls)
        .values([
          {
            ReservationId: reserveID,
            hallCode: halls[i].hallCode,
          },
        ])
        .execute();
    }
    res
      .status(200)
      .json({
        message: "Special Reservation added successfully",
        cancelServiceNo: cancelreservationEmployeeServiceNo,
        adminNumber: VictimAdminNo,
        empName: employeeName,
        holidayHomeName: holidayHomeName,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
  const employeeEmail = (
    await AppDataSource.manager.find(HomlyUser, {
      select: ["email"],
      where: {
        service_number: ServiceNO,
      },
    })
  )[0]?.email;
  const sendRecipt = (
    email: string,
    employeeName: string,
    holidayHome: string,
    reservationNumber: string,
    checkinDate: Date,
    checkoutDate: Date,
    maxAdults: string,
    maxChildren: string,
    rooms: string,
    halls: string,
    roomPrice: string,
    hallPrice: string,
    TotalPrice: string
  ) => {
    const subject = "Special Reservation Recipt";
    const message = SendReciptEmail(
      employeeName,
      holidayHomeName,
      reservationNumber,
      checkinDate,
      checkoutDate,
      maxAdults,
      maxChildren,
      rooms,
      halls,
      roomPrice,
      hallPrice,
      TotalPrice
    );
    sentEmail(email, subject, message);
  };
  sendRecipt(
    employeeEmail,
    ServiceNO,
    HolidayHome,
    reserveID ?? "",
    new Date(emailCheckinDate),
    new Date(emailCheckoutDate),
    NoOfAdults,
    NoOfChildren,
    "All Rooms",
    "All Halls",
    RoomPrice,
    HallPrice,
    TotalPrice
  );
};
const getHolidayHomeNames = async (req: Request, res: Response) => {
  try {
    const holidayHomes = await AppDataSource.manager.find(HolidayHome, {
      where: {
        Approved: true,
        Status: "Active",
      },
    });
    const holidayHomeNames = holidayHomes.map((home) => ({
      id: home.HolidayHomeId,
      name: home.Name,
    }));
    res.status(200).json(holidayHomeNames);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await AppDataSource.manager.find(Room);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getHalls = async (req: Request, res: Response) => {
  try {
    const halls = await AppDataSource.manager.find(Hall);
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getTotalRoomRental = async (req: Request, res: Response) => {
  const holidayHomeId = req.params.HolidayHomeId;
  const rooms = await AppDataSource.manager.find(Room, {
    where: {
      HolidayHomeId: holidayHomeId,
    },
  });
  const halls = await AppDataSource.manager.find(Hall, {
    where: {
      HolidayHomeId: holidayHomeId,
    },
  });
  try {
    let NoofRooms = 0;
    let totalRoomRental = 0;
    let maxAdults = 0;
    let maxChildren = 0;
    let NoofHalls = 0;
    let totalHallRental = 0;
    for (var i = 0; i < rooms.length; i++) {
      NoofRooms++;
      totalRoomRental += rooms[i].roomRental;
      maxAdults += rooms[i].NoOfAdults;
      maxChildren += rooms[i].NoOfChildren;
    }
    for (var i = 0; i < halls.length; i++) {
      NoofHalls++;
      totalHallRental += Number(halls[i].hallRental);
      maxAdults += Number(halls[i].hallNoOfAdults);
      maxChildren += Number(halls[i].hallNoOfChildren);
    }
    res
      .status(200)
      .json({
        NoofRooms,
        NoofHalls,
        totalRoomRental,
        totalHallRental,
        maxAdults,
        maxChildren,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await AppDataSource.manager.find(Reservation);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getReservedRooms = async (
  allRooms: Room[],
  reservation: Reservation[]
) => {
  let reservedRooms = [];
  for (var i = 0; i < reservation.length; i++) {
    const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
      where: {
        ReservationId: reservation[i].ReservationId,
      },
    });

    for (var j = 0; j < reservedrooms.length; j++) {
      reservedRooms.push(reservedrooms[j]);
    }
  }
  reservedRooms = reservedRooms.filter(
    (v, i, a) => a.findIndex((t) => t.roomCode === v.roomCode) === i
  );
  let availableRooms = [];
  for (var i = 0; i < allRooms.length; i++) {
    let flag = 0;
    for (var j = 0; j < reservedRooms.length; j++) {
      if (allRooms[i].roomCode === reservedRooms[j].roomCode) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      availableRooms.push(allRooms[i]);
    }
  }

  return availableRooms;
};
const getReservedHalls = async (
  allHalls: Hall[],
  reservation: Reservation[]
) => {
  let reservedHalls = [];
  for (var i = 0; i < reservation.length; i++) {
    const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
      where: {
        ReservationId: reservation[i].ReservationId,
      },
    });

    for (var j = 0; j < reservedhalls.length; j++) {
      reservedHalls.push(reservedhalls[j]);
    }
  }
  reservedHalls = reservedHalls.filter(
    (v, i, a) => a.findIndex((t) => t.hallCode === v.hallCode) === i
  );
  let availableHalls = [];
  for (var i = 0; i < allHalls.length; i++) {
    let flag = 0;
    for (var j = 0; j < reservedHalls.length; j++) {
      if (allHalls[i].hallCode === reservedHalls[j].hallCode) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      availableHalls.push(allHalls[i]);
    }
  }

  return availableHalls;
};
const getAvailableRooms = async (req: Request, res: Response) => {
  try {
    let { holidayHomeId, checkinDate, checkoutDate } = req.query;
    holidayHomeId = holidayHomeId?.toString();
    if (checkinDate) {
      checkinDate = new Date(checkinDate as string).toISOString();
    }
    if (checkoutDate) {
      checkoutDate = new Date(checkoutDate as string).toISOString();
    }
    if (checkinDate && checkoutDate) {
      const allRooms = await AppDataSource.manager.find(Room, {
        where: {
          HolidayHomeId: holidayHomeId,
        },
      });
      const reservation = await AppDataSource.manager.find(Reservation, {
        where: [
          {
            HolidayHome: holidayHomeId,
            IsCancelled: false,
            CheckinDate: Between(new Date(checkinDate), new Date(checkoutDate)),
          },
          {
            HolidayHome: holidayHomeId,
            IsCancelled: false,
            CheckoutDate: Between(
              new Date(checkinDate),
              new Date(checkoutDate)
            ),
          },
          {
            HolidayHome: holidayHomeId,
            IsCancelled: false,
            CheckinDate: LessThanOrEqual(new Date(checkinDate)),
            CheckoutDate: MoreThanOrEqual(new Date(checkoutDate)),
          },
        ],
      });
      let availableRooms = await getReservedRooms(allRooms, reservation);
      res.status(200).json({ availableRooms });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getAvailableHalls = async (req: Request, res: Response) => {
  try {
    let { holidayHomeId, checkinDate, checkoutDate } = req.query;
    holidayHomeId = holidayHomeId?.toString();
    if (checkinDate) {
      checkinDate = new Date(checkinDate as string).toISOString();
    }
    if (checkoutDate) {
      checkoutDate = new Date(checkoutDate as string).toISOString();
    }

    if (checkinDate && checkoutDate) {
      const allHalls = await AppDataSource.manager.find(Hall, {
        where: {
          HolidayHomeId: holidayHomeId,
        },
      });

      const reservation = await AppDataSource.manager.find(Reservation, {
        where: [
          {
            HolidayHome: holidayHomeId,
            CheckinDate: Between(new Date(checkinDate), new Date(checkoutDate)),
          },
          {
            HolidayHome: holidayHomeId,
            CheckoutDate: Between(
              new Date(checkinDate),
              new Date(checkoutDate)
            ),
          },
        ],
      });

      let availableHalls = await getReservedHalls(allHalls, reservation);
      res.status(200).json({ availableHalls });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const CompletePayment = async (req: Request, res: Response) => {
  const { reservationId, status } = req.body;
  try {
    await AppDataSource.manager.update(
      Reservation,
      {
        ReservationId: reservationId,
      },
      {
        IsPaid: status,
      }
    );
    res.status(200).json({ message: "Payment completed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const checkUserValidation = async (serviceNO: string) => {
  const user = await AppDataSource.manager.find(HomlyUser, {
    where: {
      service_number: serviceNO,
      verified: true,
      blacklisted: false,
    },
  });
  return user;
};
const checkHolidayHomeValidation = async (holidayHomeId: string) => {
  const holidayHome = await AppDataSource.manager.find(HolidayHome, {
    where: {
      HolidayHomeId: holidayHomeId,
      Approved: true,
      Status: "Active",
    },
  });
  return holidayHome;
};
const getUserFromEmployee = async (req: Request, res: Response) => {
  const serviceno = req.params.serviceno;
  try {
    const user = await checkUserValidation(serviceno);
    if(user && user.length > 0) {
      await AppDataSource.manager.find(Employee, {
        where: {
          service_number: serviceno,
        },
      }).then((data) => {
        if(data) {
          res.send(data);
        }});
      };    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
const getRefund = async (req: Request, res: Response) => {
  try {
    const refund = await AppDataSource.manager.find(Refund);
    res.status(200).json(refund);
  } catch (error) {
    return [];
  }
};
const getRefundById = async (req: Request, res: Response) => {
  try {
    const refund = await AppDataSource.manager.find(Refund, {
      where: {
        reservationNo: req.params.reservationNo,
      }
    });
    res.status(200).json(refund);
  } catch (error) {
    return [];
  }
};
const addRefundByUser = async (req: Request, res: Response) => {
  const {
    reservationNo,
    serviceNo,
    contactNumber,
    cancelledBy,
    payment,
    status,
    accountHolder,
    accountNumber,
    bank,
    branch,
  } = req.body;
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Refund)
      .values([
        {
          reservationNo,
          serviceNo,
          contactNumber,
          cancelledBy,
          payment,
          status,
          accountHolder,
          accountNumber,
          bank,
          branch,
        },
      ])
      .execute();
    res.status(200).json({ message: "Refund added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
}
const UpdateRefundByAdmin = async (req: Request, res: Response) => {
  const { 
    refundId, 
    status,
    refundAmount, 
    reason, 
    bankSlip 
  } = req.body;
  try {
    await AppDataSource.manager.update(
      Refund,
      { refundId },
      {
        status,
        refundAmount, 
        reason,
        refundDate: new Date(),
        bankSlip,
      }
    );
    res.status(200).json({ message: "Refund updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!" });
  }
}
const deleteExpiredReservations = async () => {
  const expireDate = new Date(Date.now() - expireTime);
  await AppDataSource.manager
    .find(Reservation, {
      where: {
        createdAt: LessThan(expireDate),
        IsPaid: false,
      },
    })
    .then(async (reservations: Reservation[]) => {
      for (const reservation of reservations) {
        await AppDataSource.manager
          .delete(Reservation, {
            ReservationId: reservation.ReservationId,
          })
          .then(async () => {
            await AppDataSource.manager
              .delete(ReservedRooms, {
                ReservationId: reservation.ReservationId,
              })
              .then(() => {})
              .catch(() => {});

            await AppDataSource.manager
              .delete(ReservedHalls, {
                ReservationId: reservation.ReservationId,
              })
              .then(() => {})
              .catch(() => {});
          })
          .catch(() => {});
      }
    })
    .catch(() => {});
};

export {
  getReservation,
  AddResrvation,
  AddSpecialResrvation,
  getHolidayHomeNames,
  getRooms,
  getHalls,
  AddComplaint,
  getAvailableRooms,
  getAvailableHalls,
  getTotalRoomRental,
  CompletePayment,
  deleteExpiredReservations,
  getUserFromEmployee,
  getRefund,
  addRefundByUser,
  UpdateRefundByAdmin,
  getRefundById,
};
