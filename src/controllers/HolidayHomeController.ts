import { Request, Response } from 'express';
import { HolidayHome } from '../entities/HolidayHome';
import { AppDataSource } from '../index';
import { ContactNo } from '../entities/ContactNo';
import { CareTaker } from '../entities/CareTaker';
import { Unit } from '../entities/Unit';
import { Room } from '../entities/Room';
import { Hall } from '../entities/Hall';

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
        .findBy(CareTaker, { holidayhome: { HolidayHomeId } });

    res.json({ homeDetails: holidayHome, contactNo: contactNo, unit: unit, room: room, hall: hall, caretaker: caretaker });
};


export { getHolidayHomes, getHolidayHomesDetails }