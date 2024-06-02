import { Request, Response } from "express";
import { HolidayHome } from "../entities/HolidayHome";
import { AppDataSource } from "../index";
import { ContactNo } from "../entities/ContactNo";
import { CareTaker } from "../entities/CareTaker";
import { Unit } from "../entities/Unit";
import { Room } from "../entities/Room";
import { Hall } from "../entities/Hall";
import { SelectedRooms } from "../entities/SelectedRooms";
import { Rental } from "../entities/Rental";
import { RoomTypeSettings } from "../entities/HolidayHome";
import { RoomRentalSettings } from "../entities/HolidayHome";
import { Reservation } from "../entities/Reservation";
import { ReservedRooms } from "../entities/ReservedRooms";

const getHolidayHomes = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  console.log("admin no got from middleware", serviceNo);
  const pending = await AppDataSource.manager.find(HolidayHome, {
    where: { Approved: false, AdminNo: serviceNo },
  });

  const acitve = await AppDataSource.manager.find(HolidayHome, {
    where: {
      Status: "Active",
      Approved: true,
      AdminNo: serviceNo,
    },
  });

  const inactive = await AppDataSource.manager.find(HolidayHome, {
    where: {
      Status: "Inactive",
      Approved: true,
      AdminNo: serviceNo,
    },
  });

  res.json({ pending: pending, active: acitve, inactive: inactive });
};

const getHolidayHomesDetails = async (req: Request, res: Response) => {
  const { HolidayHomeId } = req.params;

  const holidayHome = await AppDataSource.manager.find(HolidayHome, {
    where: { HolidayHomeId },
  });

  const contactNo = await AppDataSource.manager.find(ContactNo, {
    where: { HolidayHomeId },
  });

  const units = await AppDataSource.manager.find(Unit, {
    where: { HolidayHomeId },
  });

  const rooms = await AppDataSource.manager.find(Room, {
    where: { HolidayHomeId },
  });

  const halls = await AppDataSource.manager.find(Hall, {
    where: { HolidayHomeId },
  });

  const caretakers = await AppDataSource.manager.find(CareTaker, {
    where: { HolidayHomeId },
  });

  const roomTypeSettings = await AppDataSource.manager.find(RoomTypeSettings, {
    where: { HolidayHomeId },
    select: ["roomType", "adults", "children"],
  });

  const roomRentalSettings = await AppDataSource.manager.find(
    RoomRentalSettings,
    {
      where: { HolidayHomeId },
      select: ["roomType", "rental", "acNonAc"],
    }
  );

  res.json({
    homeDetails: holidayHome,
    contactNo: contactNo,
    unit: units,
    room: rooms,
    hall: halls,
    caretaker: caretakers,
    roomTypeSettings: roomTypeSettings,
    roomRentalSettings: roomRentalSettings,
  });
};

const getHolidayHomeNames = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  const holidayHomeNames = await AppDataSource.manager.find(HolidayHome, {
    where: { AdminNo: serviceNo },
    select: ["Name", "HolidayHomeId"],
  });
  const names = holidayHomeNames.map((holidayHome) => ({
    name: holidayHome.Name,
    id: holidayHome.HolidayHomeId,
  }));
  res.json({ names });
};

const getSelectedRooms = async (req: Request, res: Response) => {
  const { HolidayHomeId, unitCode } = req.params;
  console.log(HolidayHomeId, unitCode);

  const selectedRoom = await AppDataSource.manager.find(SelectedRooms, {
    where: { HolidayHomeId, unitCode },
  });

  const selectedRooms = [];
  for (let i = 0; i < selectedRoom.length; i++) {
    const room = await AppDataSource.manager.find(Room, {
      where: { HolidayHomeId, roomCode: selectedRoom[i].roomCode },
    });

    selectedRooms.push(room[0]);
  }

  res.json({ selectedRooms: selectedRooms });
};

const getRoom = async (req: Request, res: Response) => {
  const { HolidayHomeId, roomCode } = req.params;
  const room = await AppDataSource.manager.find(Room, {
    where: { HolidayHomeId, roomCode },
  });

  res.json({ room });
};

const getRoomRental = async (req: Request, res: Response) => {
  const { HolidayHomeId, HRUId } = req.params;
  const roomRental = await AppDataSource.manager.find(Rental, {
    where: { HolidayHomeId, HRUId },
  });

  res.json({ roomRental });
};
const getReservationDetails = async (req: Request, res: Response) => {
  const { HolidayHomeId } = req.params;
  console.log(HolidayHomeId);
  const reservationDetails = await AppDataSource.manager.find(Reservation, {
    where: { HolidayHome: HolidayHomeId },
    select: ["ReservationId", "CheckinDate", "CheckoutDate", "IsPaid"],
    order: { CheckinDate: "ASC" },
  });

  res.json({ reservations: reservationDetails });
};

const getReservedRooms = async (req: Request, res: Response) => {
  let roomCodes = [];
  const reservationIds = req.query;
  console.log("idr", reservationIds);
  for (let i in reservationIds) {
    // console.log(reservationIds[i])
    const reservedRooms = await AppDataSource.manager.find(ReservedRooms, {
      where: { ReservationId: reservationIds[i]?.toString() },
      select: ["roomCode"],
    });

    console.log("reserved rooms", reservedRooms);

    for (let i = 0; reservedRooms.length > i; i++) {
      roomCodes.push(reservedRooms[i].roomCode);
    }
  }

  res.json(roomCodes);
};

const createHolidayHome = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;

    const hhId = await AppDataSource.query(
      `SELECT MAX("HolidayHomeId") as maxval FROM "INOADMIN"."holiday_home"`
    );
    console.log("holidayhome id", hhId[0].MAXVAL);
    let maxvalue = hhId[0].MAXVAL;

    let holidayHomeId;
    if (maxvalue) {
      // incremenet string maxvalue by 1
      let num = maxvalue.split("-");
      console.log(num[1]);
      holidayHomeId =
        "HH-" + (parseInt(num[1]) + 1).toString().padStart(6, "0");
    } else {
      holidayHomeId = "HH-000001";
    }

    const allValues = req.body;

    const holidayHome = HolidayHome.create({
      HolidayHomeId: holidayHomeId,
      Name: allValues.holidayHomeDetails.name.toLowerCase(),
      Address: allValues.holidayHomeDetails.address,
      Description: allValues.holidayHomeDetails.description,
      Category: allValues.holidayHomeDetails.category,
      Status: allValues.holidayHomeDetails.status,
      MaxNoOfAdults: allValues.homeBreakDown.adultsCount,
      MaxNoOfChildren: allValues.homeBreakDown.childCount,
      Approved: false,
      Gym: allValues.homeBreakDown.bdValue.gym,
      Kitchen: allValues.homeBreakDown.bdValue.kitchen,
      Park: allValues.homeBreakDown.bdValue.park,
      Wifi: allValues.homeBreakDown.bdValue.wifi,
      Facilities: allValues.homeBreakDown.bdValue.facilities,
      District: allValues.holidayHomeDetails.district.toLowerCase(),
      Pool: allValues.homeBreakDown.bdValue.pool,
      Bar: allValues.homeBreakDown.bdValue.bar,
      AdminNo: serviceNo,
      MainImage: allValues.mainImage,
      Image1: allValues.iamge1,
      Image2: allValues.image2,
      Image3: allValues.image3,
    });

    await holidayHome.save();

    const c1Id = await AppDataSource.query(
      `SELECT MAX("CareTakerId") as maxval FROM "INOADMIN"."care_taker"`
    );
    console.log("holidayhome id", c1Id[0].MAXVAL);
    let maxvaluecaretaker1 = c1Id[0].MAXVAL;

    let caretakerId;
    if (maxvaluecaretaker1) {
      // incremenet string maxvalue by 1
      let num = maxvaluecaretaker1.split("-");
      console.log(num[1]);
      caretakerId = "CT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
    } else {
      caretakerId = "CT-000001";
    }

    const careTaker1 = CareTaker.create({
      CareTakerId: caretakerId,
      Name: allValues.caretaker1.caretakerName,
      ContactNo: allValues.caretaker1.caretakerContactNo,
      Status: allValues.caretaker1.caretakerStatus,
      Address: allValues.caretaker1.caretakerAddress,
      Description: allValues.caretaker1.caretakerDescription,
      HolidayHomeId: holidayHomeId,
      Image: allValues.caretaker1Image,
      // HolidayHomeId: holidayHome.HolidayHomeId
    });

    await careTaker1.save();

    if (allValues.caretaker2.caretakerName !== "") {
      const c2Id = await AppDataSource.query(
        `SELECT MAX("CareTakerId") as maxval FROM "INOADMIN"."care_taker"`
      );
      console.log("caretaker2 id", c2Id[0].MAXVAL);
      let maxvaluecaretaker2 = c2Id[0].MAXVAL;
      console.log(maxvaluecaretaker2);

      let caretakerId2;
      if (maxvaluecaretaker2) {
        // incremenet string maxvalue by 1
        let num = maxvaluecaretaker2.split("-");
        console.log(num[1]);
        caretakerId2 =
          "CT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
      } else {
        caretakerId2 = "CT-000001";
      }

      const careTaker2 = CareTaker.create({
        CareTakerId: caretakerId2,
        Name: allValues.caretaker2.caretakerName,
        ContactNo: allValues.caretaker2.caretakerContactNo,
        Status: allValues.caretaker2.caretakerStatus,
        Address: allValues.caretaker2.caretakerAddress,
        Description: allValues.caretaker2.caretakerDescription,
        HolidayHomeId: holidayHomeId,
        Image: allValues.caretaker2Image,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });

      await careTaker2.save();
    }

    const contactNo1 = ContactNo.create({
      ContactNo: allValues.holidayHomeDetails.contactNo1,
      // HolidayHomeId: holidayHome.HolidayHomeId
      HolidayHomeId: holidayHomeId,
    });

    await contactNo1.save();

    if (allValues.holidayHomeDetails.contactNo2 !== "") {
      const contactNo2 = ContactNo.create({
        ContactNo: allValues.holidayHomeDetails.contactNo2,
        // HolidayHomeId: holidayHome.HolidayHomeId
        HolidayHomeId: holidayHomeId,
      });

      await contactNo2.save();
    }

    // // settingRoomType

    for (let i = 0; i < allValues.roomTypeArray.length; i++) {
      const roomTypeId = await AppDataSource.query(
        `SELECT MAX("RTId") as maxval FROM "INOADMIN"."room_type_settings"`
      );
      console.log("roomtypesettings id", roomTypeId[0].MAXVAL);
      let maxvalue = roomTypeId[0].MAXVAL;

      let RTId;
      if (maxvalue) {
        // incremenet string maxvalue by 1
        let num = maxvalue.split("-");
        console.log(num[1]);
        RTId = "RT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
      } else {
        RTId = "RT-0000001";
      }

      const allValues = req.body;

      const roomType = RoomTypeSettings.create({
        RTId: RTId,
        roomType: allValues.roomTypeArray[i].type,
        adults: allValues.roomTypeArray[i].adults,
        children: allValues.roomTypeArray[i].children,
        HolidayHomeId: holidayHomeId,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });

      await roomType.save();
    }

    // // settingRoomRental

    for (let i = 0; i < allValues.settingRoomRentalArray.length; i++) {
      const roomRentalId = await AppDataSource.query(
        `SELECT MAX("RSId") as maxval FROM "INOADMIN"."room_rental_settings"`
      );
      console.log("roomrentalsettings id", roomRentalId[0].MAXVAL);
      let maxvalue = roomRentalId[0].MAXVAL;

      let RRId;
      if (maxvalue) {
        // incremenet string maxvalue by 1
        let num = maxvalue.split("-");
        console.log(num[1]);
        RRId = "RR-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
      } else {
        RRId = "RR-000001";
      }

      const allValues = req.body;

      const roomRental = RoomRentalSettings.create({
        RSId: RRId,
        roomType: allValues.settingRoomRentalArray[i].type,
        acNonAc: allValues.settingRoomRentalArray[i].acNonAc,
        rental: allValues.settingRoomRentalArray[i].rental,
        HolidayHomeId: holidayHomeId,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });

      await roomRental.save();
    }

    for (let i = 0; i < allValues.roomArray.length; i++) {
      console.log(allValues.roomArray[i].rentalArray);
      for (let j = 0; j < allValues.roomArray[i].rentalArray.length; j++) {
        const rental = Rental.create({
          Month: allValues.roomArray[i].rentalArray[j].district,
          WeekRental: allValues.roomArray[i].rentalArray[j].weekDays,
          WeekEndRental: allValues.roomArray[i].rentalArray[j].weekEnds,
          // HolidayHomeId: holidayHome.HolidayHomeId,
          HolidayHomeId: holidayHomeId,
          HRUId: allValues.roomArray[i].roomCode,
        });

        await rental.save();
      }

      const room = Room.create({
        roomCode: allValues.roomArray[i].roomCode,
        roomAc: allValues.roomArray[i].roomAc,
        RoomType: allValues.roomArray[i].RoomType,
        FloorLevel: allValues.roomArray[i].floorLevel,
        NoOfAdults: allValues.roomArray[i].NoOfAdults,
        NoOfChildren: allValues.roomArray[i].NoOfChildren,
        groupByUnit: allValues.roomArray[i].groupByUnit,
        roomRemarks: allValues.roomArray[i].roomRemarks,
        roomRental: allValues.roomArray[i].roomRental,
        // HolidayHomeId: holidayHome.HolidayHomeId,
        HolidayHomeId: holidayHomeId,
      });

      await room.save();
    }

    // // console.log(allValues.hallArray);

    for (let i = 0; i < allValues.unitArray.length; i++) {
      for (let j = 0; j < allValues.unitArray[i].selectedRooms.length; j++) {
        console.log(allValues.unitArray[i].selectedRooms[j]);
        const selectedRoom = SelectedRooms.create({
          roomCode: allValues.unitArray[i].selectedRooms[j].roomCode,
          unitCode: allValues.unitArray[i].unitCode,
          HolidayHomeId: holidayHomeId,
          // HolidayHomeId: holidayHome.HolidayHomeId
        });
        await selectedRoom.save();
      }

      const unit = Unit.create({
        unitCode: allValues.unitArray[i].unitCode,
        unitAc: allValues.unitArray[i].unitAc,
        floorLevel: allValues.unitArray[i].floorLevel,
        unitRemark: allValues.unitArray[i].unitRemark,
        roomAttached: allValues.unitArray[i].roomAttached,
        HolidayHomeId: holidayHomeId,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });

      await unit.save();
    }

    for (let i = 0; i < allValues.hallArray.length; i++) {
      console.log(allValues.hallArray);
      console.log(allValues.hallArray[i].hallRentalArray);
      for (let j = 0; j < allValues.hallArray[i].hallRentalArray.length; j++) {
        const rental = Rental.create({
          Month: allValues.hallArray[i].hallRentalArray[j].district,
          WeekRental: allValues.hallArray[i].hallRentalArray[j].weekDays,
          WeekEndRental: allValues.hallArray[i].hallRentalArray[j].weekEnds,
          HolidayHomeId: holidayHomeId,
          // HolidayHomeId: holidayHome.HolidayHomeId,
          HRUId: allValues.hallArray[i].hallCode,
        });

        await rental.save();
      }
      const hall = Hall.create({
        hallCode: allValues.hallArray[i].hallCode,
        hallAc: allValues.hallArray[i].hallAc,
        floorLevel: allValues.hallArray[i].floorLevel,
        hallNoOfAdults: allValues.hallArray[i].hallNoOfAdults,
        hallNoOfChildren: allValues.hallArray[i].hallNoOfChildren,
        hallRemark: allValues.hallArray[i].hallRemark,
        hallRental: allValues.hallArray[i].hallRental,
        HolidayHomeId: holidayHomeId,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });

      await hall.save();
    }

    res.json({ message: "Holiday Home created successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateHolidayHome = async (req: Request, res: Response) => {
  try {
    console.log("first");
    const updatedValues = req.body;

    const HolidayHomeId = updatedValues.holidayHomeId;
    const CareTaker1Id = updatedValues.caretaker1Id;
    const CareTaker2Id = updatedValues.caretaker2Id;

    await HolidayHome.update(
      { HolidayHomeId: HolidayHomeId },
      {
        Name: updatedValues.holidayHomeDetails.name.toLowerCase(),
        Address: updatedValues.holidayHomeDetails.address,
        Description: updatedValues.holidayHomeDetails.description,
        Category: updatedValues.holidayHomeDetails.category,
        Status: updatedValues.holidayHomeDetails.status,
        MaxNoOfAdults: updatedValues.homeBreakDown.adultsCount,
        MaxNoOfChildren: updatedValues.homeBreakDown.childCount,
        Gym: updatedValues.homeBreakDown.bdValue.gym,
        Kitchen: updatedValues.homeBreakDown.bdValue.kitchen,
        Park: updatedValues.homeBreakDown.bdValue.park,
        Wifi: updatedValues.homeBreakDown.bdValue.wifi,
        Facilities: updatedValues.homeBreakDown.bdValue.facilities,
        District: updatedValues.holidayHomeDetails.district.toLowerCase(),
        Pool: updatedValues.homeBreakDown.bdValue.pool,
        Bar: updatedValues.homeBreakDown.bdValue.bar,
        MainImage: updatedValues.mainImage,
        Image1: updatedValues.iamge1,
        Image2: updatedValues.image2,
        Image3: updatedValues.image3,
      }
    );

    await CareTaker.update(
      { CareTakerId: CareTaker1Id },
      {
        Name: updatedValues.caretaker1.caretakerName,
        ContactNo: updatedValues.caretaker1.caretakerContactNo,
        Status: updatedValues.caretaker1.caretakerStatus,
        Address: updatedValues.caretaker1.caretakerAddress,
        Description: updatedValues.caretaker1.caretakerDescription,
      }
    );

    if (CareTaker2Id) {
      console.log("hello");
      await CareTaker.update(
        { CareTakerId: CareTaker2Id },
        {
          Name: updatedValues.caretaker2.caretakerName,
          ContactNo: updatedValues.caretaker2.caretakerContactNo,
          Status: updatedValues.caretaker2.caretakerStatus,
          Address: updatedValues.caretaker2.caretakerAddress,
          Description: updatedValues.caretaker2.caretakerDescription,
        }
      );
    } else {
      if (updatedValues.caretaker2.caretakerName !== "") {
        // const careatakerId2 = "ct2" + Date.now().toString();
        const c2Id = await AppDataSource.query(
          `SELECT MAX("CareTakerId") as maxval FROM "INOADMIN"."care_taker"`
        );
        console.log("caretaker2 id", c2Id[0].MAXVAL);
        let maxvaluecaretaker2 = c2Id[0].MAXVAL;
        console.log(maxvaluecaretaker2);

        let caretakerId2;
        if (maxvaluecaretaker2) {
          // incremenet string maxvalue by 1
          let num = maxvaluecaretaker2.split("-");
          console.log(num[1]);
          caretakerId2 =
            "CT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
        } else {
          caretakerId2 = "CT-000001";
        }
        const careTaker2 = CareTaker.create({
          CareTakerId: caretakerId2,
          Name: updatedValues.caretaker2.caretakerName,
          ContactNo: updatedValues.caretaker2.caretakerContactNo,
          Status: updatedValues.caretaker2.caretakerStatus,
          Address: updatedValues.caretaker2.caretakerAddress,
          Description: updatedValues.caretaker2.caretakerDescription,
          HolidayHomeId: HolidayHomeId,
          // HolidayHomeId: holidayHome.HolidayHomeId
        });
        await careTaker2.save();
      }
    }

    // //get all the RTId that available in database realated to HolidayHomeId
    // const RTIds = await AppDataSource.manager.find(RoomTypeSettings, {
    //   where: { HolidayHomeId },
    //   select: ["RTId"],
    // });

    // const RTIdsArray = RTIds.map((roomType) => roomType.RTId);

    // for (let i = 0; i < updatedValues.roomTypeArray.length; i++) {
    //   if (RTIdsArray.includes(updatedValues.roomTypeArray[i].RTId)) {
    //     console.log("inclued in database");
    //     await RoomTypeSettings.update(
    //       { RTId: updatedValues.roomTypeArray[i].RTId },
    //       {
    //         roomType: updatedValues.roomTypeArray[i].roomType,
    //         adults: updatedValues.roomTypeArray[i].adults,
    //         children: updatedValues.roomTypeArray[i].children,
    //       }
    //     );
    //   } else {
    //     console.log("new roomTypeSettings");
    //     const roomTypeId = await AppDataSource.query(
    //       `SELECT MAX("RTId") as maxval FROM "INOADMIN"."room_type_settings"`
    //     );
    //     console.log("roomtypesettings id", roomTypeId[0].MAXVAL);
    //     let maxvalue = roomTypeId[0].MAXVAL;

    //     let RTId;
    //     if (maxvalue) {
    //       // incremenet string maxvalue by 1
    //       let num = maxvalue.split("-");
    //       console.log(num[1]);
    //       RTId = "RT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
    //     } else {
    //       RTId = "RT-0000001";
    //     }

    //     const updatedValues = req.body;

    //     const roomType = RoomTypeSettings.create({
    //       RTId: RTId,
    //       roomType: updatedValues.roomTypeArray[i].roomType,
    //       adults: updatedValues.roomTypeArray[i].adults,
    //       children: updatedValues.roomTypeArray[i].children,
    //       HolidayHomeId: HolidayHomeId,
    //       // HolidayHomeId: holidayHome.HolidayHomeId
    //     });
    //     await roomType.save();
    //   }
    // }

    // //get all the RSId that available in database realated to HolidayHomeId

    // const RSIds = await AppDataSource.manager.find(RoomRentalSettings, {
    //   where: { HolidayHomeId },
    //   select: ["RSId"],
    // });

    // const RSIdsArray = RSIds.map((roomRental) => roomRental.RSId);

    // for (let i = 0; i < updatedValues.settingRoomRentalArray.length; i++) {
    //   if (RSIdsArray.includes(updatedValues.settingRoomRentalArray[i].RSId)) {
    //     console.log("inclued in database RoomRentalSettings");
    //     await RoomRentalSettings.update(
    //       { RSId: updatedValues.settingRoomRentalArray[i].RSId },
    //       {
    //         roomType: updatedValues.settingRoomRentalArray[i].roomType,
    //         acNonAc: updatedValues.settingRoomRentalArray[i].acNonAc,
    //         rental: updatedValues.settingRoomRentalArray[i].rental,
    //       }
    //     );
    //   } else {
    //     console.log("new RoomRentalSettings");
    //     const roomRentalId = await AppDataSource.query(
    //       `SELECT MAX("RSId") as maxval FROM "INOADMIN"."room_rental_settings"`
    //     );
    //     console.log("roomrentalsettings id", roomRentalId[0].MAXVAL);
    //     let maxvalue = roomRentalId[0].MAXVAL;

    //     let RRId;
    //     if (maxvalue) {
    //       // incremenet string maxvalue by 1
    //       let num = maxvalue.split("-");
    //       console.log(num[1]);
    //       RRId = "RR-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
    //     } else {
    //       RRId = "RR-000001";
    //     }

    //     const updatedValues = req.body;

    //     const roomRental = RoomRentalSettings.create({
    //       RSId: RRId,
    //       roomType: updatedValues.settingRoomRentalArray[i].roomType,
    //       acNonAc: updatedValues.settingRoomRentalArray[i].acNonAc,
    //       rental: updatedValues.settingRoomRentalArray[i].rental,
    //       HolidayHomeId: HolidayHomeId,
    //     });

    //     await roomRental.save();
    //   }
    // }

    // roomTypeSettings deelete where holidayhomeid = holidayhomeid
    await RoomTypeSettings.delete({ HolidayHomeId: HolidayHomeId });

    // create with new incoming data

    for (let i = 0; i < updatedValues.roomTypeArray.length; i++) {
      const roomTypeId = await AppDataSource.query(
        `SELECT MAX("RTId") as maxval FROM "INOADMIN"."room_type_settings"`
      );
      console.log("roomtypesettings id", roomTypeId[0].MAXVAL);
      let maxvalue = roomTypeId[0].MAXVAL;

      let RTId;
      if (maxvalue) {
        // incremenet string maxvalue by 1
        let num = maxvalue.split("-");
        console.log(num[1]);
        RTId = "RT-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
      } else {
        RTId = "RT-0000001";
      }

      const updatedValues = req.body;

      const roomType = RoomTypeSettings.create({
        RTId: RTId,
        roomType: updatedValues.roomTypeArray[i].roomType,
        adults: updatedValues.roomTypeArray[i].adults,
        children: updatedValues.roomTypeArray[i].children,
        HolidayHomeId: HolidayHomeId,
        // HolidayHomeId: holidayHome.HolidayHomeId
      });
      await roomType.save();
    }

    await RoomRentalSettings.delete({ HolidayHomeId: HolidayHomeId });

    for (let i = 0; i < updatedValues.settingRoomRentalArray.length; i++) {
      const roomRentalId = await AppDataSource.query(
        `SELECT MAX("RSId") as maxval FROM "INOADMIN"."room_rental_settings"`
      );
      console.log("roomrentalsettings id", roomRentalId[0].MAXVAL);
      let maxvalue = roomRentalId[0].MAXVAL;

      let RRId;
      if (maxvalue) {
        // incremenet string maxvalue by 1
        let num = maxvalue.split("-");
        console.log(num[1]);
        RRId = "RR-" + (parseInt(num[1]) + 1).toString().padStart(5, "0");
      } else {
        RRId = "RR-000001";
      }

      const updatedValues = req.body;

      const roomRental = RoomRentalSettings.create({
        RSId: RRId,
        roomType: updatedValues.settingRoomRentalArray[i].roomType,
        acNonAc: updatedValues.settingRoomRentalArray[i].acNonAc,
        rental: updatedValues.settingRoomRentalArray[i].rental,
        HolidayHomeId: HolidayHomeId,
      });

      await roomRental.save();
    }
    // ............... Hall Editing .........................
    // get all the hallcode that available in database realated to HolidayHomeId
    const hallCodes = await AppDataSource.manager.find(Hall, {
      where: { HolidayHomeId },
      select: ["hallCode"],
    });
    const hallCodesArray = hallCodes.map((hall) => hall.hallCode);

    //get all HRUIDs that available in database realated to HolidayHomeId from Rental

    const HRUIds = await AppDataSource.manager.find(Rental, {
      where: { HolidayHomeId },
      select: ["HRUId"],
    });

    const HRUIdsArray = HRUIds.map((rental) => rental.HRUId);

    //making a array of hallcodes coming from updatedValues.hallArray
    const hallCodesArray1 = updatedValues.hallArray.map(
      (hall: any) => hall.hallCode
    );
    //deleting the halls which are not in updatedValues.hallArray
    const hallCodesToDelete = hallCodesArray.filter(
      (hallCode) => !hallCodesArray1.includes(hallCode)
    );

    //deleting the halls related to holidayhomeid and hallCode

    for (let i = 0; i < hallCodesToDelete.length; i++) {
      await Hall.delete({
        HolidayHomeId: HolidayHomeId,
        hallCode: hallCodesToDelete[i],
      });
    }

    for (let i = 0; i < updatedValues.hallArray.length; i++) {
      if (hallCodesArray.includes(updatedValues.hallArray[i].hallCode)) {
        console.log("inclued in database");
        await Hall.update(
          { hallCode: updatedValues.hallArray[i].hallCode },
          {
            hallAc: updatedValues.hallArray[i].hallAc,
            floorLevel: updatedValues.hallArray[i].floorLevel,
            hallNoOfAdults: updatedValues.hallArray[i].hallNoOfAdults,
            hallNoOfChildren: updatedValues.hallArray[i].hallNoOfChildren,
            hallRemark: updatedValues.hallArray[i].hallRemark,
            hallRental: updatedValues.hallArray[i].hallRental,
          }
        );
        if (updatedValues.hallArray[i].hallRentalArray !== undefined) {
          console.log("hall rental array not undefined");
          if (
            HRUIdsArray.includes(
              updatedValues.hallArray[i].hallRentalArray.hallCode
            )
          ) {
            console.log("update");
            for (
              let j = 0;
              j < updatedValues.hallArray[i].hallRentalArray.length;
              j++
            ) {
              await Rental.update(
                {
                  HRUId: updatedValues.hallArray[i].hallCode,
                  Month: updatedValues.hallArray[i].hallRentalArray[j].Month,
                },
                {
                  WeekRental:
                    updatedValues.hallArray[i].hallRentalArray[j].WeekRental,
                  WeekEndRental:
                    updatedValues.hallArray[i].hallRentalArray[j].WeekEndRental,
                }
              );
            }
          } else {
            for (
              let j = 0;
              j < updatedValues.hallArray[i].hallRentalArray.length;
              j++
            ) {
              console.log("new");
              const rental = Rental.create({
                Month: updatedValues.hallArray[i].hallRentalArray[j].Month,
                WeekRental:
                  updatedValues.hallArray[i].hallRentalArray[j].WeekRental,
                WeekEndRental:
                  updatedValues.hallArray[i].hallRentalArray[j].WeekEndRental,
                HolidayHomeId: HolidayHomeId,
                HRUId: updatedValues.hallArray[i].hallCode,
              });

              await rental.save();
            }
          }
        }
      } else {
        for (
          let j = 0;
          j < updatedValues.hallArray[i].hallRentalArray.length;
          j++
        ) {
          console.log("first");
          const rental = Rental.create({
            Month: updatedValues.hallArray[i].hallRentalArray[j].Month,
            WeekRental:
              updatedValues.hallArray[i].hallRentalArray[j].WeekRental,
            WeekEndRental:
              updatedValues.hallArray[i].hallRentalArray[j].WeekEndRental,
            HolidayHomeId: HolidayHomeId,
            HRUId: updatedValues.hallArray[i].hallCode,
          });

          await rental.save();
        }
        const hall = Hall.create({
          hallCode: updatedValues.hallArray[i].hallCode,
          hallAc: updatedValues.hallArray[i].hallAc,
          floorLevel: updatedValues.hallArray[i].floorLevel,
          hallNoOfAdults: updatedValues.hallArray[i].hallNoOfAdults,
          hallNoOfChildren: updatedValues.hallArray[i].hallNoOfChildren,
          hallRemark: updatedValues.hallArray[i].hallRemark,
          hallRental: updatedValues.hallArray[i].hallRental,
          HolidayHomeId: HolidayHomeId,
        });

        await hall.save();
      }
    }

    // ............... Room Editing .........................
    // get all the roomcode that available in database realated to HolidayHomeId

    const roomCodes = await AppDataSource.manager.find(Room, {
      where: { HolidayHomeId },
      select: ["roomCode"],
    });

    const roomCodesArray = roomCodes.map((room) => room.roomCode);

    //get all HRUIDs that available in database realated to HolidayHomeId from Rental

    const HRUIdsRoom = await AppDataSource.manager.find(Rental, {
      where: { HolidayHomeId },
      select: ["HRUId"],
    });

    const HRUIdsArrayRoom = HRUIdsRoom.map((rental) => rental.HRUId);

    //making a array of roomcodes coming from updatedValues.roomArray
    const roomCodesArray1 = updatedValues.roomArray.map(
      (room: any) => room.roomCode
    );

    //deleting the rooms which are not in updatedValues.roomArray

    const roomCodesToDelete = roomCodesArray.filter(
      (roomCode) => !roomCodesArray1.includes(roomCode)
    );

    //deleting the rooms related to holidayhomeid and roomCode

    for (let i = 0; i < roomCodesToDelete.length; i++) {
      await Room.delete({
        HolidayHomeId: HolidayHomeId,
        roomCode: roomCodesToDelete[i],
      });
    }

    for (let i = 0; i < updatedValues.roomArray.length; i++) {
      if (roomCodesArray.includes(updatedValues.roomArray[i].roomCode)) {
        console.log("inclued in database");
        await Room.update(
          { roomCode: updatedValues.roomArray[i].roomCode },
          {
            roomAc: updatedValues.roomArray[i].roomAc,
            RoomType: updatedValues.roomArray[i].RoomType,
            FloorLevel: updatedValues.roomArray[i].floorLevel,
            NoOfAdults: updatedValues.roomArray[i].NoOfAdults,
            NoOfChildren: updatedValues.roomArray[i].NoOfChildren,
            groupByUnit: updatedValues.roomArray[i].groupByUnit,
            roomRemarks: updatedValues.roomArray[i].roomRemarks,
            roomRental: updatedValues.roomArray[i].roomRental,
          }
        );
        if (updatedValues.roomArray[i].rentalArray !== undefined) {
          console.log("rental array not undefined");
          if (
            HRUIdsArrayRoom.includes(
              updatedValues.roomArray[i].rentalArray.roomCode
            )
          ) {
            console.log("update");
            for (
              let j = 0;
              j < updatedValues.roomArray[i].rentalArray.length;
              j++
            ) {
              await Rental.update(
                {
                  HRUId: updatedValues.roomArray[i].roomCode,
                  Month: updatedValues.roomArray[i].rentalArray[j].district,
                },
                {
                  WeekRental:
                    updatedValues.roomArray[i].rentalArray[j].weekDays,
                  WeekEndRental:
                    updatedValues.roomArray[i].rentalArray[j].weekEnds,
                }
              );
            }
          } else {
            for (
              let j = 0;
              j < updatedValues.roomArray[i].rentalArray.length;
              j++
            ) {
              console.log("new");
              const rental = Rental.create({
                Month: updatedValues.roomArray[i].rentalArray[j].district,
                WeekRental: updatedValues.roomArray[i].rentalArray[j].weekDays,
                WeekEndRental:
                  updatedValues.roomArray[i].rentalArray[j].weekEnds,
                HolidayHomeId: HolidayHomeId,
                HRUId: updatedValues.roomArray[i].roomCode,
              });

              await rental.save();
            }
          }
        }
      } else {
        for (
          let j = 0;
          j < updatedValues.roomArray[i].rentalArray.length;
          j++
        ) {
          console.log("first");
          const rental = Rental.create({
            Month: updatedValues.roomArray[i].rentalArray[j].district,
            WeekRental: updatedValues.roomArray[i].rentalArray[j].weekDays,
            WeekEndRental: updatedValues.roomArray[i].rentalArray[j].weekEnds,
            HolidayHomeId: HolidayHomeId,
            HRUId: updatedValues.roomArray[i].roomCode,
          });

          await rental.save();
        }
        const room = Room.create({
          roomCode: updatedValues.roomArray[i].roomCode,
          roomAc: updatedValues.roomArray[i].roomAc,
          RoomType: updatedValues.roomArray[i].RoomType,
          FloorLevel: updatedValues.roomArray[i].floorLevel,
          NoOfAdults: updatedValues.roomArray[i].NoOfAdults,
          NoOfChildren: updatedValues.roomArray[i].NoOfChildren,
          groupByUnit: updatedValues.roomArray[i].groupByUnit,
          roomRemarks: updatedValues.roomArray[i].roomRemarks,
          roomRental: updatedValues.roomArray[i].roomRental,
          HolidayHomeId: HolidayHomeId,
        });

        await room.save();
      }
    }

    // ............... Unit Editing .........................
    // get all the unitcode that available in database realated to HolidayHomeId

    const unitCodes = await AppDataSource.manager.find(Unit, {
      where: { HolidayHomeId },
      select: ["unitCode"],
    });

    const unitCodesArray = unitCodes.map((unit) => unit.unitCode);

    //making a array of unitcodes coming from updatedValues.unitArray
    const unitCodesArray1 = updatedValues.unitArray.map(
      (unit: any) => unit.unitCode
    );

    //deleting the units which are not in updatedValues.unitArray

    const unitCodesToDelete = unitCodesArray.filter(
      (unitCode) => !unitCodesArray1.includes(unitCode)
    );

    //deleting the units related to holidayhomeid and unitCode

    for (let i = 0; i < unitCodesToDelete.length; i++) {
      await Unit.delete({
        HolidayHomeId: HolidayHomeId,
        unitCode: unitCodesToDelete[i],
      });
    }

    for (let i = 0; i < updatedValues.unitArray.length; i++) {
      if (unitCodesArray.includes(updatedValues.unitArray[i].unitCode)) {
        console.log("inclued in database");
        await Unit.update(
          { unitCode: updatedValues.unitArray[i].unitCode },
          {
            unitAc: updatedValues.unitArray[i].unitAc,
            floorLevel: updatedValues.unitArray[i].floorLevel,
            unitRemark: updatedValues.unitArray[i].unitRemark,
            roomAttached: updatedValues.unitArray[i].roomAttached,
          }
        );
        if (updatedValues.unitArray[i].selectedRooms !== undefined) {
          console.log("selectedRooms array not undefined");
          for (
            let j = 0;
            j < updatedValues.unitArray[i].selectedRooms.length;
            j++
          ) {
            await SelectedRooms.update(
              {
                unitCode: updatedValues.unitArray[i].unitCode,
                roomCode: updatedValues.unitArray[i].selectedRooms[j].roomCode,
              },
              {
                HolidayHomeId: HolidayHomeId,
              }
            );
          }
        }
      } else {
        for (
          let j = 0;
          j < updatedValues.unitArray[i].selectedRooms.length;
          j++
        ) {
          console.log("first");
          const selectedRoom = SelectedRooms.create({
            roomCode: updatedValues.unitArray[i].selectedRooms[j].roomCode,
            unitCode: updatedValues.unitArray[i].unitCode,
            HolidayHomeId: HolidayHomeId,
          });

          await selectedRoom.save();
        }
        const unit = Unit.create({
          unitCode: updatedValues.unitArray[i].unitCode,
          unitAc: updatedValues.unitArray[i].unitAc,
          floorLevel: updatedValues.unitArray[i].floorLevel,
          unitRemark: updatedValues.unitArray[i].unitRemark,
          roomAttached: updatedValues.unitArray[i].roomAttached,
          HolidayHomeId: HolidayHomeId,
        });

        await unit.save();
      }
    }

    res.json({ message: "Holiday Home updated successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const HHcount = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    // const count = await HolidayHome.count();
    const count = await HolidayHome.countBy({
      AdminNo: serviceNo,
    });
    // const serviceNo = (req as any).serviceNo;
    // console.log("first", serviceNo);
    // const homes = await HolidayHome.find({
    //   where: { AdminNo: serviceNo },
    // });

    // const count = homes.length;
    console.log("holidayhome count", count);
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting home count!" });
  }
};

export const Earning = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);
    let sum = 0;
    for (let i = 0; i < HidArray.length; i++) {
      const sum1 = await Reservation.sum("Price", {
        IsPaid: true,
        HolidayHome: HidArray[i],
      });
      if (sum1 !== null) {
        sum += sum1;
      }
    }
    // const sum = await Reservation.sum("Price", { IsPaid: true });
    res.status(200).json({ sum: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in calculating earnings!" });
  }
};

export const Active_InActive_HHcount = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);
    let ac_count = 0;
    let in_ac_count = 0;

    for (let i = 0; i < HidArray.length; i++) {
      const ac_count1 = await HolidayHome.countBy({
        Status: "Active",
        HolidayHomeId: HidArray[i],
      });
      const in_ac_count1 = await HolidayHome.countBy({
        Status: "Inactive",
        HolidayHomeId: HidArray[i],
      });
      ac_count += ac_count1;
      in_ac_count += in_ac_count1;
    }
    // const ac_count = await HolidayHome.countBy({ Status: "Active" });
    // const in_ac_count = await HolidayHome.countBy({ Status: "Inactive" });
    res.status(200).json({ Active: ac_count, Inactive: in_ac_count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in calculating active home count!" });
  }
};
export const getBookingscounts = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);

    let paid_count = 0;
    let unpaid_count = 0;

    for (let i = 0; i < HidArray.length; i++) {
      const paid_count1 = await Reservation.countBy({
        IsPaid: true,
        HolidayHome: HidArray[i],
      });
      const unpaid_count1 = await Reservation.countBy({
        IsPaid: false,
        HolidayHome: HidArray[i],
      });
      paid_count += paid_count1;
      unpaid_count += unpaid_count1;
    }

    // const paid_count = await Reservation.countBy({ IsPaid: true });
    // const unpaid_count = await Reservation.countBy({ IsPaid: false });
    res.status(200).json({ Paid: paid_count, Unpaid: unpaid_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting bookings!" });
  }
};

export const gethallcount = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);

    let hall_count = 0;

    for (let i = 0; i < HidArray.length; i++) {
      const hall_count1 = await Hall.countBy({
        HolidayHomeId: HidArray[i],
      });
      hall_count += hall_count1;
    }
    // const hall_count = await Hall.countBy({});
    res.status(200).json({ count: hall_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting hall count!" });
  }
};

export const getroomcount = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);

    let room_count = 0;

    for (let i = 0; i < HidArray.length; i++) {
      const room_count1 = await Room.countBy({
        HolidayHomeId: HidArray[i],
      });
      room_count += room_count1;
    }
    // const room_count = await Room.countBy({});
    res.status(200).json({ count: room_count });
  } catch (error) {
    res.status(500).json({ message: "Error in getting room count!" });
  }
};

export const Hallincome = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);

    let sum = 0;
    for (let i = 0; i < HidArray.length; i++) {
      const sum1 = await Reservation.sum("HallPrice", {
        IsPaid: true,
        HolidayHome: HidArray[i],
      });
      if (sum1 !== null) {
        sum += sum1;
      }
    }

    // const sum = await Reservation.sum("HallPrice", { IsPaid: true });
    res.status(200).json({ hallincome: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in calculating hall income!" });
  }
};

export const Roomincome = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);

    let sum = 0;

    for (let i = 0; i < HidArray.length; i++) {
      const sum1 = await Reservation.sum("RoomPrice", {
        IsPaid: true,
        HolidayHome: HidArray[i],
      });
      if (sum1 !== null) {
        sum += sum1;
      }
    }

    // const sum = await Reservation.sum("RoomPrice", { IsPaid: true });
    res.status(200).json({ roomincome: sum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in room income!" });
  }
};

export const get_income_in_date = async (req: Request, res: Response) => {
  const date = req.params.date;
  //get all paid ones
  try {
    const reservations = await Reservation.find({
      where: { IsPaid: true },
      select: ["Price", "createdAt"],
    });
    //chnage the format of the time(to easy comparing)
    const modifiedReservations = reservations.map((reservation) => ({
      Price: reservation.Price,
      createdAt: reservation.createdAt.toISOString().split("T")[0],
    }));

    const targetDate = date;
    //get reservations in given date
    const reservationsForDate = modifiedReservations.filter(
      (reservation) => reservation.createdAt === targetDate
    );

    let sumForDate = 0;
    reservationsForDate.forEach((reservation) => {
      sumForDate += reservation.Price;
    });

    res.status(200).json({ sumForDate });
  } catch (error) {
    res.status(500).json({ message: "error occured in get income in date" });
  }
};

export const holidayHomeRatings = async (req: Request, res: Response) => {
  try {
    const serviceNo = (req as any).serviceNo;
    const HidList = await HolidayHome.find({
      where: { AdminNo: serviceNo },
    });
    const HidArray = HidList.map((holidayhome) => holidayhome.HolidayHomeId);
    const ratings: any[] = [];

    for (let i = 0; i < HidArray.length; i++) {
      const rating = await HolidayHome.find({
        where: { HolidayHomeId: HidArray[i] },
        select: ["Name", "overall_rating"],
      });
      ratings.push(rating);
    }

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ message: "Error in getting holiday home ratings" });
  }
};

// .................... remove..............................

export const getallHH = async (req: Request, res: Response) => {
  try {
    const HH = await HolidayHome.find({
      select: {
        Name: true,
        HolidayHomeId: true,
      },
    });
    res.status(200).json({ HH });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all HH names " });
  }
};

export const get_income_in_date_specificHH = async (
  req: Request,
  res: Response
) => {
  const date = req.params.date;
  const hhid = req.params.hhid;

  try {
    const reservations = await Reservation.find({
      where: { IsPaid: true, HolidayHome: hhid },
      select: ["Price", "createdAt"],
    });
    const modifiedReservations = reservations.map((reservation) => ({
      Price: reservation.Price,
      createdAt: reservation.createdAt.toISOString().split("T")[0],
    }));

    const targetDate = date;

    const reservationsForDate = modifiedReservations.filter(
      (reservation) => reservation.createdAt === targetDate
    );

    let sumForDate = 0;
    reservationsForDate.forEach((reservation) => {
      sumForDate += reservation.Price;
    });

    res.status(200).json({ sumForDate });
  } catch (error) {
    res.status(500).json({ message: "Error " });
  }
};

export const get_not_approved_count = async (req: Request, res: Response) => {
  try {
    const count = await HolidayHome.count({
      where: {
        Approved: false,
      },
    });
    res.status(200).json({ notapprovedcount: count });
  } catch {
    res.status(500).json({ message: "Error in getting not approved count" });
  }
};

//..................................................................................................

export const get_holiday_home_rating = async (req: Request, res: Response) => {
  const holidayhomeid = req.params.homeid;
  try {
    const rating = await AppDataSource.manager.find(HolidayHome, {
      select: {
        overall_rating: true,
      },
      where: {
        HolidayHomeId: holidayhomeid,
      },
    });
    res.status(200).json({ rating: rating });
  } catch {
    res.status(500).json({ message: "error in getting holiday home rating" });
  }
};

export {
  getHolidayHomes,
  getHolidayHomesDetails,
  createHolidayHome,
  getSelectedRooms,
  getRoom,
  getRoomRental,
  updateHolidayHome,
  getHolidayHomeNames,
  getReservationDetails,
  getReservedRooms,
};
