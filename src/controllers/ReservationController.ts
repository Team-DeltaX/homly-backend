import express, { response } from "express";
import { Reservation } from "../entities/Reservation";
import { Employee } from "../entities/Empolyee";
import { ReservedRooms } from "../entities/ReservedRooms";
import { Complaints } from "../entities/Complaint";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { HolidayHome } from "../entities/HolidayHome";
import { Room } from "../entities/Room";
import { Hall } from "../entities/Hall";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const router = express.Router();

const AddComplaint = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    ServiceNo,
    AdminNo = "2324",
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
    res.status(200).json({ message: "Complaint added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const AddResrvation = async (req: Request, res: Response) => {
  console.log(req.body);
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
  } = req.body;

  const ServiceNO = req.cookies.serviceNo;
  console.log("roomsss codesing ", RoomCodes);
  //   const locationadmin = LocationAdmin.create();
  console.log("arunaaa", ServiceNO);

  // add roomcodes array to database

  try {
    // generate unique auto incrementing reservation id
    const reservationId = await AppDataSource.query(
      `SELECT MAX("ReservationId") as maxval FROM "INOADMIN"."reservation"`
    );
    console.log("reservation id", reservationId[0].MAXVAL);
    let maxvalue = reservationId[0].MAXVAL;

    let reserveID;
    if (maxvalue) {
      // incremenet string maxvalue by 1
      let num = maxvalue.split("-");
      console.log(num[1]);
      reserveID = "RES-" + (parseInt(num[1]) + 1);
    } else {
      reserveID = "RES-1";
    }


    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
        {
          ReservationId: reserveID,
          ServiceNO,
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
        },
      ])

      .execute();

      // add room code array to reserved room table
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
    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

const AddSpecialResrvation = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    ServiceNO,
    HolidayHome,
    CheckinDate,
    CheckoutDate,
    NoOfAdults,
    NoOfChildren,
    RoomPrice,
    HallPrice,
    Price,
    IsPaid,
  } = req.body;

  // const ServiceNO = req.cookies.serviceNo;
  //console.log("roomsss codesing ", RoomCodes);
  //   const locationadmin = LocationAdmin.create();
  console.log("arunaaa", ServiceNO);

  // add roomcodes array to database

  try {
    // generate unique auto incrementing reservation id
    const reservationId = await AppDataSource.query(
      `SELECT MAX("ReservationId") as maxval FROM "INOADMIN"."reservation"`
    );
    console.log("reservation id", reservationId[0].MAXVAL);
    let maxvalue = reservationId[0].MAXVAL;

    let reserveID;
    if (maxvalue) {
      // incremenet string maxvalue by 1
      let num = maxvalue.split("-");
      console.log(num[1]);
      reserveID = "RES-" + (parseInt(num[1]) + 1);
    } else {
      reserveID = "RES-1";
    }


    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
        {
          ReservationId: reserveID,
          ServiceNO,
          HolidayHome,
          CheckinDate,
          CheckoutDate,
          NoOfAdults,
          NoOfChildren,
          RoomPrice,
          HallPrice,
          Price,
          IsPaid,
          IsSpecial: true,
        },
      ])

      .execute();

      // add room code array to reserved room table
      // for (var i = 0; i < RoomCodes.length; i++) {
      //   await AppDataSource.createQueryBuilder()
      //     .insert()
      //     .into(ReservedRooms)
      //     .values([
      //       {
      //         ReservationId: reserveID,
      //         roomCode: RoomCodes[i],
      //       },
      //     ])
      //     .execute();
      // }
    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

const getHolidayHomeNames = async (req: Request, res: Response) => {
  try {
    const holidayHomes = await AppDataSource.manager.find(HolidayHome);
    const holidayHomeNames = holidayHomes.map((home) => ({
      id: home.HolidayHomeId,
      name: home.Name,
    }));
    res.status(200).json(holidayHomeNames);
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await AppDataSource.manager.find(Room);
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

//get total room rental in paticular holidayhome
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
    let totalRoomRental = 0;
    let maxAdults = 0;
    let maxChildren = 0;
    let totalHallRental = 0;
    for (var i = 0; i < rooms.length; i++) {
      totalRoomRental += rooms[i].roomRental;
      maxAdults += rooms[i].NoOfAdults;
      maxChildren += rooms[i].NoOfChildren;
    }
    for (var i = 0; i < halls.length; i++) {
      totalHallRental += Number(halls[i].hallRental);
      maxAdults += Number(halls[i].hallNoOfAdults);
      maxChildren += Number(halls[i].hallNoOfChildren);
    }
    //console.log(totalRental);
    res.status(200).json({totalRoomRental, totalHallRental , maxAdults, maxChildren});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

const getReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await AppDataSource.manager.find(Reservation);
    res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

// get rooms
const getReservedRooms = async (
  allRooms: Room[],
  reservation: Reservation[]
) => {
  // get reserved rooms
  let reservedRooms = [];
  for (var i = 0; i < reservation.length; i++) {
    const reservedrooms = await AppDataSource.manager.find(ReservedRooms, {
      // select: ["roomCode"],
      where: {
        ReservationId: reservation[i].ReservationId,
      },
    });

    for (var j = 0; j < reservedrooms.length; j++) {
      reservedRooms.push(reservedrooms[j]);
    }
  }

  // remove duplicated room code
  reservedRooms = reservedRooms.filter(
    (v, i, a) => a.findIndex((t) => t.roomCode === v.roomCode) === i
  );

  // remove room from all rooms
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

{
  /* available rooms for paticular holidayHome for paticular checkin and checkout date */
}
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
      console.log("holidayHomeId", holidayHomeId, checkinDate, checkoutDate);
      const allRooms = await AppDataSource.manager.find(Room, {
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
      const onedayReservation = await AppDataSource.manager.find(Reservation, {
        where: {
          HolidayHome: holidayHomeId,
          CheckinDate: LessThanOrEqual(new Date(checkinDate)),
          CheckoutDate: MoreThanOrEqual(new Date(checkoutDate)),
        },
      });

      let availableRooms = await getReservedRooms(allRooms, reservation);
      availableRooms = await getReservedRooms(
        availableRooms,
        onedayReservation
      );

      res.status(200).json({ availableRooms });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
export {
  getReservation,
  AddResrvation,
  AddSpecialResrvation,
  getHolidayHomeNames,
  getRooms,
  AddComplaint,
  getAvailableRooms,
  getTotalRoomRental,
};
