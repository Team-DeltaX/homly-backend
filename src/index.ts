import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";

// import {
//   getUsers,
// } from "./controllers/UserController";

import dotenv from "dotenv";
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


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Hall, CareTaker, HolidayHome, Image, Unit, Room, ContactNo, LocationAdmin, Rental],
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
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      
    });
  })
  .catch((error) => console.log(error));




// AppDataSource.initialize()
// .then(() => {
  
  
//   app.use(express.json());
//   app.use("locationadmin/holidayhome", HolidayHomeRouter);

//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
    
//   });
// })
// .catch((error) => console.log(error));

