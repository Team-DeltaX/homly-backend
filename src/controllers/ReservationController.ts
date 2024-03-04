import express from "express";
import { Reservation } from "../entities/Reservation";
import { Employee } from "../entities/Empolyee";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { getConnection } from 'typeorm';

const router = express.Router();

const AddResrvation = async (req: Request, res: Response) => {
  console.log(req.body);
  const {
    
    ServiceNO,
    HolidayHome,
    CheckinDate,
    CheckoutDate,
    NoOfAdults,
    NoOfChildren,
    NoOfSingleRooms,
    NoOfDoubleRooms,
    NoOfTripleRooms,
    NoOfHalls,
    Price,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();
  console.log("arunaaa",ServiceNO)
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([
        {
          ServiceNO,
          HolidayHome,
          CheckinDate,
          CheckoutDate,
          NoOfAdults,
          NoOfChildren,
          NoOfSingleRooms,
          NoOfDoubleRooms,
          NoOfTripleRooms,
          NoOfHalls,
          Price,
        },
      ])
      .execute();

    res.status(200).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
  console.log(ServiceNO, HolidayHome, CheckinDate, CheckoutDate);
};

const getReservation = async (req: Request, res: Response) => {
  const Reservations = await AppDataSource.manager.find(Reservation);

  try {
    const Reservations = await AppDataSource.manager.find(Reservation);

    // console.log(Reservation);
    let reservationData: { Reservations: Reservation[]; empName: string; }[] = [];
    for(let i=0; i<Reservations.length;i++){
      if(Reservations[i].ServiceNO){
        const service_no = Reservations[i].ServiceNO;
        await AppDataSource.manager.find(Employee,{
          where: {service_number:service_no }
        }).then((res)=>{
          console.log(res[i].name)
          reservationData.push({
            Reservations:Reservations,
            empName:res[i].name
          })
        })
      }
    }
    res.status(200).json(reservationData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

// const getReciptName = async (req: Request, res: Response) => {
//   const ReciptName = await AppDataSource.manager.find(Employee);
//   try {
//     const ReciptName = await AppDataSource.manager.find(Employee.name);
//     res.status(200).json(Employee);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error!!" });
//   }
// }
// const getNameFromServiceNumber(ServiceNO: string): string | undefined {
//   const employee = Employee.find(emp => emp.serviceNumber === ServiceNO);
//   return employee ? employee.name : undefined;
// }

export { getReservation, AddResrvation };
