import { Request, Response } from 'express';
import { HolidayHome } from '../entities/HolidayHome';


const getHolidayHomes = async (req: Request, res: Response) => {

    const holidayhomes = await HolidayHome.find();
    res.json(holidayhomes);
    // res.send("hello");

};

export { getHolidayHomes }