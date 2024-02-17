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
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [ Hall, CareTaker, HolidayHome,Image],
  synchronize: true,
  logging: false,

});

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());

    // Routes
    // app.get("/users", getUsers);
    // app.get("/users/:id", getUserById);
    // app.post("/users", createUser);
    // app.put("/users/:id", updateUser);
    // app.delete("/users/:id", deleteUser);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

    });
  })
  .catch((error) => console.log(error));

