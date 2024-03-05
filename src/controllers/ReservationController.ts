import express, { response } from "express";
import { Reservation } from "../entities/Reservation";
import { Employee } from "../entities/Empolyee";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { getConnection } from "typeorm";
import { getManager } from 'typeorm';
import { HolidayHome } from '../entities/HolidayHome';


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
  console.log("arunaaa", ServiceNO);
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
const getHolidayHomeNames = async (req: Request, res: Response) => {
  try {
    const holidayHomes = await AppDataSource.manager.find(HolidayHome);
    const holidayHomeNames = holidayHomes.map(home => home.Name);
    res.status(200).json(holidayHomeNames);
  } catch (error) {
    console.log(`error is ${error}`);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};



const getReservation = async (req: Request, res: Response) => {
  try {
    let Reservations = await AppDataSource.manager.find(Reservation);

    // reverse reservation
    Reservations = Reservations.reverse();

    console.log(Reservations, Reservations.length);
    let reservationData: { Reservations: Reservation[]; empName: string }[] =
      [];
    if (Reservations) {
      for (let i = 0; i < Reservations.length; i++) {
        if (Reservations[i].ServiceNO) {
          const service_no = Reservations[i].ServiceNO;
          console.log(service_no);

          await AppDataSource.manager
            .find(Employee, {
              where: { service_number: service_no },
            })
            .then((response) => {
              console.log(response[0].name);
              reservationData.push({
                Reservations: Reservations,
                empName: response[0].name,
              });
            })

            .catch((err) => console.log(err));

          // await AppDataSource.manager.find(Employee,{
          //   where: {service_number:service_no }
          // }).then((res)=>{
          //   if(res){
          //     console.log(res[i])
          //   }
          //   // if(res !== undefined){
          //   //   console.log(res[i])
          //   //   // reservationData.push({
          //   //   //   Reservations:Reservations,
          //   //   //   empName:res[i].name
          //   //   // })

          //   // }
          //   console.log("i",i)
          // }).catch(err => console.log(err));
        }
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

export { getReservation, AddResrvation, getHolidayHomeNames };
