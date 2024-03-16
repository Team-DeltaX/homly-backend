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
import { RoomTypeSettings } from '../entities/HolidayHome';
import { RoomRentalSettings } from '../entities/HolidayHome';
import { Reservation } from '../entities/Reservation';
import { ReservedRooms } from '../entities/ReservedRooms';

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

    const roomTypeSettings = await AppDataSource.manager.find(RoomTypeSettings, {
        where: { HolidayHomeId },
        select: ["roomType", "adults", "children"]
    });

    const roomRentalSettings = await AppDataSource.manager.find(RoomRentalSettings, {
        where: { HolidayHomeId },
        select: ["roomType", "rental", "acNonAc"]
    });



    res.json({ homeDetails: holidayHome, contactNo: contactNo, unit: units, room: rooms, hall: halls, caretaker: caretakers, roomTypeSettings: roomTypeSettings, roomRentalSettings: roomRentalSettings });
};

const getHolidayHomeNames = async (req: Request, res: Response) => {
    const holidayHomeNames = await AppDataSource.manager.find(HolidayHome, {
        select: ["Name", "HolidayHomeId"]
    });
    const names = holidayHomeNames.map((holidayHome) => ({
        name: holidayHome.Name,
        id: holidayHome.HolidayHomeId
    }));
    res.json({ names });
}

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
const getReservationDetails = async (req: Request, res: Response) => {
    const { HolidayHomeId } = req.params;
    const reservations: { reserved: any, reservation: any }[] = [];
    const reservationDetails = await AppDataSource.manager.find(Reservation, {
        where: { "HolidayHome": HolidayHomeId },
        select: ["ReservationId", "CheckinDate", "CheckoutDate"]
    });

    for (const reservation of reservationDetails) {
        const rooms = await AppDataSource.manager.find(ReservedRooms, {
            where: { "ReservationId": reservation.ReservationId },
            select: ["roomCode"]
        });

        reservations.push({ reserved: rooms, reservation });
    }

    res.json({ reservations: reservations });
}


const createHolidayHome = async (req: Request, res: Response) => {
    try {

        const allValues = req.body;
        console.log(allValues);
        console.log("roomtypearray", allValues.roomTypeArray);
        // console.log(allValues.holidayHomeDetails);
        // console.log(allValues.images);
        // console.log(allValues.caretaker1);
        // console.log(allValues.caretaker2);
        // console.log("hello", allValues.homeBreakDown);
        // console.log(allValues.roomArray);
        // console.log(allValues.unitArray);
        // console.log(allValues.hallArray);
        // console.log(allValues);

        const holidayHomeId = Date.now().toString();


        const holidayHome = HolidayHome.create({
            HolidayHomeId: holidayHomeId,
            Name: allValues.holidayHomeDetails.name,
            Address: allValues.holidayHomeDetails.address,
            Description: allValues.holidayHomeDetails.description,
            Category: allValues.holidayHomeDetails.category,
            Status: allValues.holidayHomeDetails.status,
            TotalRental: allValues.homeBreakDown.bdValue.totalRental,
            MaxNoOfAdults: allValues.homeBreakDown.adultsCount,
            MaxNoOfChildren: allValues.homeBreakDown.childCount,
            Approved: false,
            Gym: allValues.homeBreakDown.bdValue.gym,
            Kitchen: allValues.homeBreakDown.bdValue.kitchen,
            Park: allValues.homeBreakDown.bdValue.park,
            Wifi: allValues.homeBreakDown.bdValue.wifi,
            Facilities: allValues.homeBreakDown.bdValue.facilities,
            District: allValues.holidayHomeDetails.district,
            Pool: allValues.homeBreakDown.bdValue.pool,
            Bar: allValues.homeBreakDown.bdValue.bar,
            AdminNo: "1",

        })

        await holidayHome.save();

        const careatakerId = "ct" + Date.now().toString();


        const careTaker1 = CareTaker.create({
            CareTakerId: careatakerId,
            Name: allValues.caretaker1.caretakerName,
            ContactNo: allValues.caretaker1.caretakerContactNo,
            Status: allValues.caretaker1.caretakerStatus,
            Address: allValues.caretaker1.caretakerAddress,
            Description: allValues.caretaker1.caretakerDescription,
            HolidayHomeId: holidayHomeId,
            // HolidayHomeId: holidayHome.HolidayHomeId

        })


        await careTaker1.save();


        if (allValues.caretaker2.caretakerName !== "") {
            const careatakerId2 = "ct2" + Date.now().toString();
            const careTaker2 = CareTaker.create({
                CareTakerId: careatakerId2,
                Name: allValues.caretaker2.caretakerName,
                ContactNo: allValues.caretaker2.caretakerContactNo,
                Status: allValues.caretaker2.caretakerStatus,
                Address: allValues.caretaker2.caretakerAddress,
                Description: allValues.caretaker2.caretakerDescription,
                HolidayHomeId: holidayHomeId,
                // HolidayHomeId: holidayHome.HolidayHomeId

            })

            await careTaker2.save();
        }

        const contactNo1 = ContactNo.create({
            ContactNo: allValues.holidayHomeDetails.contactNo1,
            // HolidayHomeId: holidayHome.HolidayHomeId
            HolidayHomeId: holidayHomeId,

        })

        await contactNo1.save();

        if (allValues.holidayHomeDetails.contactNo2 !== "") {
            const contactNo2 = ContactNo.create({
                ContactNo: allValues.holidayHomeDetails.contactNo2,
                // HolidayHomeId: holidayHome.HolidayHomeId
                HolidayHomeId: holidayHomeId,

            })

            await contactNo2.save();
        }

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

        // settingRoomType

        for (let i = 0; i < allValues.roomTypeArray.length; i++) {

            const RTId = "RT" + Date.now().toString();
            const roomType = RoomTypeSettings.create({
                RTId: RTId,
                roomType: allValues.roomTypeArray[i].type,
                adults: allValues.roomTypeArray[i].adults,
                children: allValues.roomTypeArray[i].children,
                HolidayHomeId: holidayHomeId,
                // HolidayHomeId: holidayHome.HolidayHomeId
            })

            await roomType.save();


        }

        // settingRoomRental

        for (let i = 0; i < allValues.settingRoomRentalArray.length; i++) {

            const RSId = "RS" + Date.now().toString();
            const roomRental = RoomRentalSettings.create({
                RSId: RSId,
                roomType: allValues.settingRoomRentalArray[i].type,
                acNonAc: allValues.settingRoomRentalArray[i].acNonAc,
                rental: allValues.settingRoomRentalArray[i].rental,
                HolidayHomeId: holidayHomeId,
                // HolidayHomeId: holidayHome.HolidayHomeId
            })

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
                    HRUId: allValues.roomArray[i].roomCode
                })

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


            })

            await room.save();
        }

        // // console.log(allValues.hallArray);

        for (let i = 0; i < allValues.unitArray.length; i++) {


            for (let j = 0; j < allValues.unitArray[i].selectedRooms.length; j++) {
                console.log(allValues.unitArray[i].selectedRooms[j])
                const selectedRoom = SelectedRooms.create({
                    roomCode: allValues.unitArray[i].selectedRooms[j].roomCode,
                    unitCode: allValues.unitArray[i].unitCode,
                    HolidayHomeId: holidayHomeId,
                    // HolidayHomeId: holidayHome.HolidayHomeId
                })
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



            })

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
                    HRUId: allValues.hallArray[i].hallCode
                })

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

            })

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
        console.log("first")
        const updatedValues = req.body;
        const HolidayHomeId = updatedValues.holidayHomeId;
        const CareTaker1Id = updatedValues.caretaker1Id;
        const CareTaker2Id = updatedValues.caretaker2Id;

        await HolidayHome.update({ HolidayHomeId: HolidayHomeId },
            {
                Name: updatedValues.holidayHomeDetails.name,
                Address: updatedValues.holidayHomeDetails.address,
                Description: updatedValues.holidayHomeDetails.description,
                Category: updatedValues.holidayHomeDetails.category,
                Status: updatedValues.holidayHomeDetails.status,
                TotalRental: updatedValues.homeBreakDown.bdValue.totalRental,
                MaxNoOfAdults: updatedValues.homeBreakDown.adultsCount,
                MaxNoOfChildren: updatedValues.homeBreakDown.childCount,
                Gym: updatedValues.homeBreakDown.bdValue.gym,
                Kitchen: updatedValues.homeBreakDown.bdValue.kitchen,
                Park: updatedValues.homeBreakDown.bdValue.park,
                Wifi: updatedValues.homeBreakDown.bdValue.wifi,
                Facilities: updatedValues.homeBreakDown.bdValue.facilities,
                District: updatedValues.holidayHomeDetails.district,
                Pool: updatedValues.homeBreakDown.bdValue.pool,
                Bar: updatedValues.homeBreakDown.bdValue.bar,
            }

        );


        await CareTaker.update({ CareTakerId: CareTaker1Id },
            {
                Name: updatedValues.caretaker1.caretakerName,
                ContactNo: updatedValues.caretaker1.caretakerContactNo,
                Status: updatedValues.caretaker1.caretakerStatus,
                Address: updatedValues.caretaker1.caretakerAddress,
                Description: updatedValues.caretaker1.caretakerDescription,
            }
        );


        if (CareTaker2Id) {
            console.log("hello")
            await CareTaker.update({ CareTakerId: CareTaker2Id },
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
                const careatakerId2 = "ct2" + Date.now().toString();
                const careTaker2 = CareTaker.create({
                    CareTakerId: careatakerId2,
                    Name: updatedValues.caretaker2.caretakerName,
                    ContactNo: updatedValues.caretaker2.caretakerContactNo,
                    Status: updatedValues.caretaker2.caretakerStatus,
                    Address: updatedValues.caretaker2.caretakerAddress,
                    Description: updatedValues.caretaker2.caretakerDescription,
                    HolidayHomeId: HolidayHomeId,
                    // HolidayHomeId: holidayHome.HolidayHomeId

                })
                await careTaker2.save();
            }


        }



        await ContactNo.update({ HolidayHomeId: HolidayHomeId },
            {
                ContactNo: updatedValues.holidayHomeDetails.contactNo1,
            }
        );

        if (updatedValues.holidayHomeDetails.contactNo2) {
            await ContactNo.update({ HolidayHomeId: HolidayHomeId },
                {
                    ContactNo: updatedValues.holidayHomeDetails.contactNo2,
                }
            );
        } else {
            if (updatedValues.holidayHomeDetails.contactNo2 !== "") {
                const contactNo2 = ContactNo.create({
                    ContactNo: updatedValues.holidayHomeDetails.contactNo2,
                    HolidayHomeId: HolidayHomeId,
                })
                await contactNo2.save();
            }
        }


        // for (let i = 0; i < updatedValues.roomTypeArray.length; i++) {
        //     await RoomTypeSettings.update({ HolidayHomeId: HolidayHomeId },
        //         {
        //             roomType: updatedValues.roomTypeArray[i].roomType,
        //             adults: updatedValues.roomTypeArray[i].adults,
        //             children: updatedValues.roomTypeArray[i].children,
        //         }
        //     );
        // }

        // for (let i = 0; i < updatedValues.settingRoomRentalArray.length; i++) {
        //     await RoomRentalSettings.update({ HolidayHomeId: HolidayHomeId },
        //         {
        //             roomType: updatedValues.settingRoomRentalArray[i].type,
        //             acNonAc: updatedValues.settingRoomRentalArray[i].acNonAc,
        //             rental: updatedValues.settingRoomRentalArray[i].rental,
        //         }
        //     );
        // }


        // for (let i = 0; i < updatedValues.roomArray.length; i++) {

        //     if (updatedValues.roomArray[i].rentalArray) {
        //         for (let j = 0; j < updatedValues.roomArray[i].rentalArray.length; j++) {
        //             await Rental.update({ HolidayHomeId: HolidayHomeId },
        //                 {
        //                     Month: updatedValues.roomArray[i].rentalArray[j].district,
        //                     WeekRental: updatedValues.roomArray[i].rentalArray[j].weekDays,
        //                     WeekEndRental: updatedValues.roomArray[i].rentalArray[j].weekEnds,
        //                 }
        //             );
        //         }
        //     }

        //     await Room.update({ HolidayHomeId: HolidayHomeId },
        //         {
        //             roomCode: updatedValues.roomArray[i].roomCode,
        //             roomAc: updatedValues.roomArray[i].roomAc,
        //             RoomType: updatedValues.roomArray[i].RoomType,
        //             FloorLevel: updatedValues.roomArray[i].floorLevel,
        //             NoOfAdults: updatedValues.roomArray[i].NoOfAdults,
        //             NoOfChildren: updatedValues.roomArray[i].NoOfChildren,
        //             groupByUnit: updatedValues.roomArray[i].groupByUnit,
        //             roomRemarks: updatedValues.roomArray[i].roomRemarks,
        //             roomRental: updatedValues.roomArray[i].roomRental,
        //         }
        //     );
        // }

        // for (let i = 0; i < updatedValues.unitArray.length; i++) {
        //     for (let j = 0; j < updatedValues.unitArray[i].selectedRooms.length; j++) {
        //         await SelectedRooms.update({ HolidayHomeId: HolidayHomeId },
        //             {
        //                 roomCode: updatedValues.unitArray[i].selectedRooms[j].roomCode,
        //                 unitCode: updatedValues.unitArray[i].unitCode,
        //             }
        //         );
        //     }

        //     await Unit.update({ HolidayHomeId: HolidayHomeId },
        //         {
        //             unitCode: updatedValues.unitArray[i].unitCode,
        //             unitAc: updatedValues.unitArray[i].unitAc,
        //             floorLevel: updatedValues.unitArray[i].floorLevel,
        //             unitRemark: updatedValues.unitArray[i].unitRemark,
        //             roomAttached: updatedValues.unitArray[i].roomAttached,
        //         }
        //     );
        // }



        // for (let i = 0; i < updatedValues.hallArray.length; i++) {
        //     for (let j = 0; j < updatedValues.hallArray[i].hallRentalArray.length; j++) {
        //         await Rental.update({ HolidayHomeId: HolidayHomeId },
        //             {
        //                 Month: updatedValues.hallArray[i].hallRentalArray[j].district,
        //                 WeekRental: updatedValues.hallArray[i].hallRentalArray[j].weekDays,
        //                 WeekEndRental: updatedValues.hallArray[i].hallRentalArray[j].weekEnds,
        //             }
        //         );
        //     }

        //     await Hall.update({ HolidayHomeId: HolidayHomeId },
        //         {
        //             hallCode: updatedValues.hallArray[i].hallCode,
        //             hallAc: updatedValues.hallArray[i].hallAc,
        //             floorLevel: updatedValues.hallArray[i].floorLevel,
        //             hallNoOfAdults: updatedValues.hallArray[i].hallNoOfAdults,
        //             hallNoOfChildren: updatedValues.hallArray[i].hallNoOfChildren,
        //             hallRemark: updatedValues.hallArray[i].hallRemark,
        //             hallRental: updatedValues.hallArray[i].hallRental,
        //         }
        //     );
        // }













        res.json({ message: "Holiday Home updated successfully" });

    }
    catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }

};


export { getHolidayHomes, getHolidayHomesDetails, createHolidayHome, getSelectedRooms, getRoom, getRoomRental, updateHolidayHome, getHolidayHomeNames, getReservationDetails }