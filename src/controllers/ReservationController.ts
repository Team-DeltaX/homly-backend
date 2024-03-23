import express, { response } from "express";
import { Reservation } from "../entities/Reservation";
import { Employee } from "../entities/Empolyee";
import { ReservedRooms } from "../entities/ReservedRooms";
import { ReservedHalls } from "../entities/ReservedHalls";
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
    HallCodes,
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
        // Extract the numeric part and increment by 1
        let num = parseInt(maxvalue.split("-")[1]);
        num++; // Increment
        reserveID = "RES-" + num.toString().padStart(5, '0'); // Format with leading zeros
    } else {
        reserveID = "RES-00001"; // Initial reservation ID
    }

    let checkinDate = new Date(CheckinDate);
    checkinDate.setHours(0,0,0,0);
    console.log("checkinDate", checkinDate);

    let checkoutDate = new Date(CheckoutDate);
    checkoutDate.setHours(23,59,0,0);


    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
      {
        ReservationId: reserveID,
        ServiceNO,
        HolidayHome,
        CheckinDate:checkinDate, // Set time to 12:00 am
        CheckoutDate:checkoutDate, // Set time to 11:59 pm
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
      // add hall code array to reserved hall table
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
    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

//return all reservations in between given checkinDate and Checkout date


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
    const existingReservations = await AppDataSource.manager.find(Reservation, {
      select: ["ReservationId"],
      where: {
        CheckinDate: LessThanOrEqual(new Date(CheckoutDate)),
        CheckoutDate: MoreThanOrEqual(new Date(CheckinDate)),
        HolidayHome: HolidayHome,
      },
    });
    for (const reservation of existingReservations) {
      await AppDataSource.manager.remove(Reservation, reservation);
      // remove them also from reservedRoom and ReservedHalls table
      // await AppDataSource.manager.remove(ReservedRooms, {
      //   ReservationId: reservation.ReservationId,
      // });
    }
    console.log("existing reservationsss",existingReservations);
    // generate unique auto incrementing reservation id
    const reservationId = await AppDataSource.query(
      `SELECT MAX("ReservationId") as maxval FROM "INOADMIN"."reservation" ORDER BY "createdAt"`
    );
    console.log("reservation id", reservationId[0].MAXVAL);
    let maxvalue = reservationId[0].MAXVAL;

    let reserveID;
    if (maxvalue) {
        // Extract the numeric part and increment by 1
        let num = parseInt(maxvalue.split("-")[1]);
        num++; // Increment
        reserveID = "RES-" + num.toString().padStart(5, '0'); // Format with leading zeros
    } else {
        reserveID = "RES-00001"; // Initial reservation ID
    }


    AppDataSource.createQueryBuilder()
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
      // delete all reservations which are between these checkin date and checkout date
      .execute();
      // get all rooms codes in HolidayHome
      // add all roomCodes in this holidayhome to the reservedRooms table in this reservation
      // const rooms = await AppDataSource.manager.find(Room, {
      //   where: {
      //     HolidayHomeId: HolidayHome,
      //   },
      // });
      // for (var i = 0; i < rooms.length; i++) {
      //   await AppDataSource.createQueryBuilder()
      //     .insert()
      //     .into(ReservedRooms)
      //     .values([
      //       {
      //         ReservationId: reserveID,
      //         roomCode: rooms[i].roomCode,
      //       },
      //     ])
      //     .execute();
      // }
      // AppDataSource.createQueryBuilder()
      // .delete()
      // .from(Reservation)
      // .where("CheckinDate BETWEEN :checkinDate AND :checkoutDate", {
      //   HolidayHomeId: HolidayHome,
      //   checkinDate: CheckinDate,
      //   checkoutDate: CheckoutDate,
      // })
      // .execute();
      // add all hallCodes in this holidayhome to the reservedHalls table in this reservation
      const halls = await AppDataSource.manager.find(Hall, {
        where: {
          HolidayHomeId: HolidayHome,
        },
      });
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
    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

const getHolidayHomeNames = async (req: Request, res: Response) => {
  try {
    const holidayHomes = await AppDataSource.manager.find(HolidayHome,{
      where:{
        Approved:true,
        Status:"Active"
      }
    });
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
// get halls
const getReservedHalls = async (
  allHalls: Hall[],
  reservation: Reservation[]
) => {
  // get reserved rooms
  let reservedHalls = [];
  for (var i = 0; i < reservation.length; i++) {
    const reservedhalls = await AppDataSource.manager.find(ReservedHalls, {
      // select: ["roomCode"],
      where: {
        ReservationId: reservation[i].ReservationId,
      },
    });

    for (var j = 0; j < reservedhalls.length; j++) {
      reservedHalls.push(reservedhalls[j]);
    }
  }

  // remove duplicated room code
  reservedHalls = reservedHalls.filter(
    (v, i, a) => a.findIndex((t) => t.hallCode === v.hallCode) === i
  );

  // remove room from all rooms
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
{
  /* available rooms for paticular holidayHome for paticular checkin and checkout date */
}
const getAvailableRooms = async (req: Request, res: Response) => {
  try {
    let { holidayHomeId, checkinDate, checkoutDate } = req.query;
    holidayHomeId = holidayHomeId?.toString();
    if (checkinDate) {
      checkinDate = new Date(checkinDate as string).toISOString();
    // let checkinDate = new Date(CheckinDate);
      //checkinDate.setHours(0,0,0,0);
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
      console.log("reservation", reservation);
      const onedayReservation = null
      // const onedayReservation = await AppDataSource.manager.find(Reservation, {
      //   where: {
      //     HolidayHome: holidayHomeId,
      //     CheckinDate: LessThanOrEqual(new Date(checkinDate)),
      //     CheckoutDate: MoreThanOrEqual(new Date(checkoutDate)),
      //   },
      // });

      // console.log("onedayReservation", onedayReservation);

      let availableRooms = await getReservedRooms(allRooms, reservation);
      // availableRooms = await getReservedRooms(
      //   availableRooms,
      //   onedayReservation
      // );
      console.log({availableRooms});
      res.status(200).json({ availableRooms });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

/* available halls for paticular holidayHome for paticular checkin and checkout date */
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
      console.log("holidayHomeId", holidayHomeId, checkinDate, checkoutDate);
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
  getAvailableHalls,
  getTotalRoomRental,
};
