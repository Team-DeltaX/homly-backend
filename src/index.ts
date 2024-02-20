import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import {SpecailReservation} from './entities/SpecialReservation';
import { SpecialReservationRouter } from "./routes/SpecialReservationRouter";
import { Hall } from "./entities/Hall";
import { CareTaker } from "./entities/CareTaker";
import { HolidayHome } from "./entities/HolidayHome";
import { Image } from "./entities/Image";
import { Unit } from "./entities/Unit";
import { Room } from "./entities/Room";
import { ContactNo } from "./entities/ContactNo";
import { LocationAdmin } from "./entities/LocationAdmin";
import { HolidayHomeRouter } from "./routes/HolidayHome";
import { Rental } from "./entities/Rental";
import { Userdel } from "./entities/Userdel";
import { Complaints } from "./entities/Complaint";
import { BlackListedUser } from "./entities/BlackListedUser";
import { BlackListHistory } from "./entities/BlackListHistory";
import { LocationAdminRoute } from "./routes/LocationAdminRoute";
import { HomlyUser,UserEmailVerification,UserOTPVerification } from "./entities/User";
import { Employee } from "./entities/Empolyee";
import { homly_user } from "./routes/UserRouters";
import { reg_users } from "./routes/RegUserRouters";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Employee,HomlyUser,UserEmailVerification,UserOTPVerification,Userdel,Complaints,BlackListedUser,BlackListHistory,Hall, CareTaker, HolidayHome, Image, Unit, Room, ContactNo, LocationAdmin, Rental, SpecailReservation],
  synchronize: true,
  logging: false,

});

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    app.use('/locationadmin/holidayhome', HolidayHomeRouter);
    app.use('/locationadmin/reservations',SpecialReservationRouter)
    app.use('/locationadmin',LocationAdminRoute)
    app.use('/users',homly_user);
    app.use('/users/auth',reg_users);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      
    });
  })
  .catch((error) => console.log(error));

