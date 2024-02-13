import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import {LocationAdmin} from './entities/LocationAdmin';
import {router} from '../src/controllers/PrimaryAdminController';
import {
    getUsers,
} from "./controllers/UserController";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING, 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [User,LocationAdmin],
  synchronize: true,
  logging: false,

});

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());

    app.use('/locationadmin',router)
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      
    });
  })
  .catch((error) => console.log(error));



