import { Request, Response } from 'express';
import { HolidayHome } from '../entities/HolidayHome';
import { AppDataSource } from '../index';
import { ContactNo } from '../entities/ContactNo';
import { CareTaker } from '../entities/CareTaker';
import { Unit } from '../entities/Unit';
import { Room } from '../entities/Room';
import { Hall } from '../entities/Hall';
import { Image } from '../entities/Image';
import { SelectedRooms } from '../entities/SelectedRooms';
import { Rental } from '../entities/Rental';
import { getManager } from 'typeorm';

const getHolidayHomes = async (req: Request, res: Response) => {

    const pending = await AppDataSource.manager
        .find(HolidayHome,
            {
                where:
                    { Approved: false }
            })

    const acitve = await AppDataSource.manager
        .find(HolidayHome,
            {
                where:
                {
                    Status: 'Active',
                    Approved: true
                }
            })

    const inactive = await AppDataSource.manager
        .find(HolidayHome,
            {
                where:
                {
                    Status: 'Inactive',
                    Approved: true
                }
            })


    res.json({ pending: pending, active: acitve, inactive: inactive });

};


const getHolidayHomesDetails = async (req: Request, res: Response) => {
    const { HolidayHomeId } = req.params;

    const holidayHome = await AppDataSource.manager.find(HolidayHome, {
        where: { HolidayHomeId }
    });

    const contactNo = await AppDataSource.manager.find(ContactNo, {
        where: { HolidayHomeId }
    });

    const units = await AppDataSource.manager.find(Unit, {
        where: { HolidayHomeId }
    });

    const rooms = await AppDataSource.manager.find(Room, {
        where: { HolidayHomeId }
    });

    const halls = await AppDataSource.manager.find(Hall, {
        where: { HolidayHomeId }
    });

    const caretakers = await AppDataSource.manager.find(CareTaker, {
        where: { HolidayHomeId }
    });

    res.json({ homeDetails: holidayHome, contactNo: contactNo, unit: units, room: rooms, hall: halls, caretaker: caretakers });
};

const getSelectedRooms = async (req: Request, res: Response) => {
    const { HolidayHomeId, unitCode } = req.params;
    const selectedRoom = await AppDataSource.manager.find(SelectedRooms, {
        where: { HolidayHomeId, unitCode }
    });

    res.json({ selectedRoom: selectedRoom });
}

const getRoom = async (req: Request, res: Response) => {
    const { HolidayHomeId, roomCode } = req.params;
    const room = await AppDataSource.manager.find(Room, {
        where: { HolidayHomeId, roomCode }
    });


    res.json({ room });
}

const getRoomRental = async (req: Request, res: Response) => {
    const { HolidayHomeId, HRUId } = req.params;
    const roomRental = await AppDataSource.manager.find(Rental, {
        where: { HolidayHomeId, HRUId }
    });

    res.json({ roomRental });
}


const createHolidayHome = async (req: Request, res: Response) => {
    try {

        const allValues = req.body;
        console.log(allValues);
        // console.log(allValues.holidayHomeDetails);
        // console.log(allValues.images);
        // console.log(allValues.caretaker1);
        // console.log(allValues.caretaker2);
        // console.log(allValues.homeBreakDown);
        // console.log(allValues.roomArray);
        // console.log(allValues.unitArray);
        // console.log(allValues.hallArray);
        // console.log(allValues);

        // const holidayHomeId = Date.now().toString();


        // const holidayHome = HolidayHome.create({
        //     HolidayHomeId: holidayHomeId,
        //     Name: allValues.holidayHomeDetails.name,
        //     Address: allValues.holidayHomeDetails.address,
        //     Description: allValues.holidayHomeDetails.description,
        //     Category: allValues.holidayHomeDetails.category,
        //     Status: allValues.holidayHomeDetails.status,
        //     TotalRental: allValues.homeBreakDown.totalRental,
        //     ServiceCharge: allValues.homeBreakDown.serviceCharges,
        //     OtherCharge: allValues.homeBreakDown.otherCharges,
        //     MaxNoOfAdults: allValues.homeBreakDown.adultsCount,
        //     MaxNoOfChildren: allValues.homeBreakDown.childCount,
        //     Approved: false,
        //     Gym: allValues.homeBreakDown.gym,
        //     Kitchen: allValues.homeBreakDown.kitchen,
        //     Park: allValues.homeBreakDown.park,
        //     Wifi: allValues.homeBreakDown.wifi,
        //     Facilities: allValues.homeBreakDown.facilities,
        //     District: allValues.holidayHomeDetails.district,
        //     Pool: allValues.homeBreakDown.pool,
        //     Bar: allValues.homeBreakDown.bar,
        //     AdminNo: "1",

        // })

        // await holidayHome.save();

        // const careatakerId = "ct" + Date.now().toString();


        // const careTaker1 = CareTaker.create({
        //     CareTakerId: careatakerId,
        //     Name: allValues.caretaker1.caretakerName,
        //     ContactNo: allValues.caretaker1.caretakerContactNo,
        //     Status: allValues.caretaker1.caretakerStatus,
        //     Address: allValues.caretaker1.caretakerAddress,
        //     Description: allValues.caretaker1.caretakerDescription,
        //     HolidayHomeId: holidayHomeId,
        //     // HolidayHomeId: holidayHome.HolidayHomeId

        // })


        // await careTaker1.save();

        // if (allValues.caretaker2.caretakerName !== "") {
        //     const careTaker2 = CareTaker.create({
        //         CareTakerId: careatakerId,
        //         Name: allValues.caretaker2.caretakerName,
        //         ContactNo: allValues.caretaker2.caretakerContactNo,
        //         Status: allValues.caretaker2.caretakerStatus,
        //         Address: allValues.caretaker2.caretakerAddress,
        //         Description: allValues.caretaker2.caretakerDescription,
        //         HolidayHomeId: holidayHomeId,
        //         // HolidayHomeId: holidayHome.HolidayHomeId

        //     })

        //     await careTaker2.save();
        // }

        // const contactNo1 = ContactNo.create({
        //     ContactNo: allValues.holidayHomeDetails.contactNo1,
        //     // HolidayHomeId: holidayHome.HolidayHomeId
        //     HolidayHomeId: holidayHomeId,

        // })

        // await contactNo1.save();

        // if (allValues.holidayHomeDetails.contactNo2 !== "") {
        //     const contactNo2 = ContactNo.create({
        //         ContactNo: allValues.holidayHomeDetails.contactNo2,
        //         // HolidayHomeId: holidayHome.HolidayHomeId
        //         HolidayHomeId: holidayHomeId,

        //     })

        //     await contactNo2.save();
        // }

        // // const imageId = "img" + Date.now().toString();

        // // const image = Image.create({

        // //     ImageId: imageId,
        // //     MainImage: allValues.images.mainImage,
        // //     Image1: allValues.images.image1,
        // //     Image2: allValues.images.image2,
        // //     Image3: allValues.images.image3,
        // //     // HolidayHomeId: holidayHome.HolidayHomeId
        // //     HolidayHomeId: holidayHomeId,
        // // })

        // // await image.save();



        // for (let i = 0; i < allValues.roomArray.length; i++) {

        //     console.log(allValues.roomArray[i].rentalArray);
        //     for (let j = 0; j < allValues.roomArray[i].rentalArray.length; j++) {
        //         const rental = Rental.create({
        //             Month: allValues.roomArray[i].rentalArray[j].district,
        //             WeekRental: allValues.roomArray[i].rentalArray[j].weekDays,
        //             WeekEndRental: allValues.roomArray[i].rentalArray[j].weekEnds,
        //             // HolidayHomeId: holidayHome.HolidayHomeId,
        //             HolidayHomeId: holidayHomeId,
        //             HRUId: allValues.roomArray[i].roomCode
        //         })

        //         await rental.save();

        //     }

        //     const room = Room.create({
        //         roomCode: allValues.roomArray[i].roomCode,
        //         roomAc: allValues.roomArray[i].roomAc,
        //         RoomType: allValues.roomArray[i].RoomType,
        //         NoOfBeds: allValues.roomArray[i].NoOfBeds,
        //         NoOfAdults: allValues.roomArray[i].NoOfAdults,
        //         NoOfChildren: allValues.roomArray[i].NoOfChildren,
        //         groupByUnit: allValues.roomArray[i].groupByUnit,
        //         roomRemarks: allValues.roomArray[i].roomRemarks,
        //         roomRental: allValues.roomArray[i].roomRental,
        //         // HolidayHomeId: holidayHome.HolidayHomeId,
        //         HolidayHomeId: holidayHomeId,


        //     })

        //     await room.save();
        // }

        // // console.log(allValues.hallArray);

        // for (let i = 0; i < allValues.unitArray.length; i++) {

        //     for (let k = 0; k < allValues.unitArray[i].unitRentalArray.length; k++) {
        //         const rental = Rental.create({
        //             Month: allValues.unitArray[i].unitRentalArray[k].district,
        //             WeekRental: allValues.unitArray[i].unitRentalArray[k].weekDays,
        //             WeekEndRental: allValues.unitArray[i].unitRentalArray[k].weekEnds,
        //             HolidayHomeId: holidayHomeId,
        //             // HolidayHomeId: holidayHome.HolidayHomeId,
        //             HRUId: allValues.unitArray[i].unitCode
        //         })

        //         await rental.save();
        //     }

        //     for (let j = 0; j < allValues.unitArray[i].selectedRooms.length; j++) {
        //         console.log(allValues.unitArray[i].selectedRooms[j])
        //         const selectedRoom = SelectedRooms.create({
        //             roomCode: allValues.unitArray[i].selectedRooms[j].roomCode,
        //             unitCode: allValues.unitArray[i].unitCode,
        //             HolidayHomeId: holidayHomeId,
        //             // HolidayHomeId: holidayHome.HolidayHomeId
        //         })
        //         await selectedRoom.save();
        //     }


        //     const unit = Unit.create({
        //         unitCode: allValues.unitArray[i].unitCode,
        //         unitRental: allValues.unitArray[i].unitRental,
        //         unitAc: allValues.unitArray[i].unitAc,
        //         floorLevel: allValues.unitArray[i].floorLevel,
        //         unitRemark: allValues.unitArray[i].unitRemark,
        //         roomAttached: allValues.unitArray[i].roomAttached,
        //         HolidayHomeId: holidayHomeId,
        //         // HolidayHomeId: holidayHome.HolidayHomeId



        //     })

        //     await unit.save();
        // }


        // for (let i = 0; i < allValues.hallArray.length; i++) {
        //     console.log(allValues.hallArray);
        //     console.log(allValues.hallArray[i].hallRentalArray);
        //     for (let j = 0; j < allValues.hallArray[i].hallRentalArray.length; j++) {
        //         const rental = Rental.create({
        //             Month: allValues.hallArray[i].hallRentalArray[j].district,
        //             WeekRental: allValues.hallArray[i].hallRentalArray[j].weekDays,
        //             WeekEndRental: allValues.hallArray[i].hallRentalArray[j].weekEnds,
        //             HolidayHomeId: holidayHomeId,
        //             // HolidayHomeId: holidayHome.HolidayHomeId,
        //             HRUId: allValues.hallArray[i].hallCode
        //         })

        //         await rental.save();

        //     }
        //     const hall = Hall.create({
        //         hallCode: allValues.hallArray[i].hallCode,
        //         hallAc: allValues.hallArray[i].hallAc,
        //         floorLevel: allValues.hallArray[i].floorLevel,
        //         hallNoOfAdults: allValues.hallArray[i].hallNoOfAdults,
        //         hallNoOfChildren: allValues.hallArray[i].hallNoOfChildren,
        //         hallRemark: allValues.hallArray[i].hallRemark,
        //         hallRental: allValues.hallArray[i].hallRental,
        //         HolidayHomeId: holidayHomeId,
        //         // HolidayHomeId: holidayHome.HolidayHomeId

        //     })

        //     await hall.save();
        // }
        // console.log("first")
        // const { holidayHomeDetails } = req.body;
        // console.log(holidayHomeDetails);




        res.json({ message: "Holiday Home created successfully" });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const updateHolidayHome = async (req: Request, res: Response) => {
    try {
        console.log("first")
        const updatedValues = req.body;
        console.log(updatedValues.holidayHomeDetails);

        res.json({ message: "Holiday Home updated successfully" });

    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }

};


export { getHolidayHomes, getHolidayHomesDetails, createHolidayHome, getSelectedRooms, getRoom, getRoomRental, updateHolidayHome }