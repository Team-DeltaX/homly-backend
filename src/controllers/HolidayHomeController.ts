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

const getHolidayHomes = async (req: Request, res: Response) => {

    const pending = await AppDataSource.manager
        .findBy(HolidayHome, { Approved: false })

    const acitve = await AppDataSource.manager
        .findBy(HolidayHome, { Status: 'active', Approved: true })

    const inactive = await AppDataSource.manager
        .findBy(HolidayHome, { Status: 'inactive', Approved: true })


    res.json({ pending: pending, active: acitve, inactive: inactive });

};

const getHolidayHomesDetails = async (req: Request, res: Response) => {
    const { HolidayHomeId } = req.params;
    const holidayHome = await AppDataSource.manager
        .findOneBy(HolidayHome, { HolidayHomeId });

    const contactNo = await AppDataSource.manager
        .findBy(ContactNo, { HolidayHomeId });

    const unit = await AppDataSource.manager
        .findBy(Unit, { HolidayHomeId });

    const room = await AppDataSource.manager
        .findBy(Room, { HolidayHomeId });

    const hall = await AppDataSource.manager
        .findBy(Hall, { HolidayHomeId });

    const caretaker = await AppDataSource.manager
        .findBy(CareTaker, { HolidayHomeId });

    res.json({ homeDetails: holidayHome, contactNo: contactNo, unit: unit, room: room, hall: hall, caretaker: caretaker });
};


const createHolidayHome = async (req: Request, res: Response) => {
    try {
        const { allValues } = req.body;
        // console.log(allValues.holidayHomeDetails);
        // console.log(allValues.images);
        // console.log(allValues.caretaker1);
        // console.log(allValues.caretaker2);
        // console.log(allValues.homeBreakDown);
        // console.log(allValues.roomArray);
        // console.log(allValues.unitArray);
        // console.log(allValues);



        // const holidayHome = HolidayHome.create({
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


        // const careTaker1 = CareTaker.create({
        //     Name: allValues.caretaker1.caretakerName,
        //     ContactNo: allValues.caretaker1.caretakerContactNo,
        //     Status: allValues.caretaker1.caretakerStatus,
        //     Address: allValues.caretaker1.caretakerAddress,
        //     Description: allValues.caretaker1.caretakerDescription,
        //     // HolidayHomeId: "2",
        // HolidayHomeId: holidayHome.HolidayHomeId

        // })

        // await careTaker1.save();

        // const contactNo1 = ContactNo.create({
        //     ContactNo: allValues.holidayHomeDetails.contactNo1,
        //     // HolidayHomeId: holidayHome.HolidayHomeId
        //     // HolidayHomeId: "6"

        // })

        // await contactNo1.save();

        // if (allValues.holidayHomeDetails.contactNo2 !== "") {
        //     const contactNo2 = ContactNo.create({
        //         ContactNo: allValues.holidayHomeDetails.contactNo2,
        //         // HolidayHomeId: holidayHome.HolidayHomeId
        //         // HolidayHomeId: "4"

        //     })

        //     await contactNo2.save();
        // }


        // const image = Image.create({
        //     MainImage: allValues.images.mainImage,
        //     Image1: allValues.images.image1,
        //     Image2: allValues.images.image2,
        //     Image3: allValues.images.image3,
        //     // HolidayHomeId: holidayHome.HolidayHomeId
        //     HolidayHomeId: "4"
        // })

        // await image.save();



        for (let i = 0; i < allValues.roomArray.length; i++) {
            const room = Room.create({
                roomCode: allValues.roomArray[i].roomCode,
                roomAc: allValues.roomArray[i].roomAc,
                RoomType: allValues.roomArray[i].RoomType,
                NoOfBeds: allValues.roomArray[i].NoOfBeds,
                NoOfAdults: allValues.roomArray[i].NoOfAdults,
                NoOfChildren: allValues.roomArray[i].NoOfChildren,
                groupByUnit: allValues.roomArray[i].groupByUnit,
                roomRemarks: allValues.roomArray[i].roomRemarks,
                roomRental: allValues.roomArray[i].roomRental,
                // HolidayHomeId: holidayHome.HolidayHomeId
                HolidayHomeId: "4",


            })

            await room.save();
        }

        // console.log(allValues.hallArray);

        for (let i = 0; i < allValues.unitArray.length; i++) {

            console.log(allValues.unitArray[i].selectedRooms);
            for (let j = 0; j < allValues.unitArray[i].selectedRooms.length; j++) {
                const selectedRoom = SelectedRooms.create({
                    roomCode: allValues.unitArray[i].selectedRooms[j].roomCode,
                    unitCode: allValues.unitArray[i].unitCode,
                    HolidayHomeId: "4",
                })
                await selectedRoom.save();
            }


            const unit = Unit.create({
                unitCode: allValues.unitArray[i].unitCode,
                unitRental: allValues.unitArray[i].unitRental,
                unitAc: allValues.unitArray[i].unitAc,
                floorLevel: allValues.unitArray[i].floorLevel,
                unitRemark: allValues.unitArray[i].unitRemark,
                roomAttached: allValues.unitArray[i].roomAttached,
                HolidayHomeId: "4",

                // HolidayHomeId: holidayHome.HolidayHomeId



            })

            await unit.save();
        }


        // for (let i = 0; i < allValues.hallArray.length; i++) {
        //     const hall = Hall.create({
        //         hallCode: allValues.hallArray[i].hallCode,
        //         hallAc: allValues.hallArray[i].hallAc,
        //         floorLevel: allValues.hallArray[i].floorLevel,
        //         hallNoOfAdults: allValues.hallArray[i].hallNoOfAdults,
        //         hallNoOfChildren: allValues.hallArray[i].hallNoOfChildren,
        //         hallRemark: allValues.hallArray[i].hallRemark,
        //         hallRental: allValues.hallArray[i].hallRental,
        //         HolidayHomeId: "4",
        //         // HolidayHomeId: holidayHome.HolidayHomeId

        //     })

        //     await hall.save();
        // }




        res.json({ message: "Holiday Home created successfully" });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export { getHolidayHomes, getHolidayHomesDetails, createHolidayHome }