import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { HomlyUser,UserEmailVerification,UserOTPVerification } from "./entities/User";
import { homly_user } from "./routers/UserRouters";
import { reg_users } from "./routers/RegUserRouters";

import dotenv from "dotenv";
// import { homly_user } from "./routers/addUsers";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING, 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [HomlyUser,UserEmailVerification,UserOTPVerification],
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

    // Routes
    // app.get("/users", getUsers);

    // app.get("/users/:id", getUserById);
    // app.post("/users", createUser);
    // app.put("/users/:id", updateUser);
    // app.delete("/users/:id", deleteUser);

    app.use('/users',homly_user);
    app.use('/users/auth',reg_users);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      
    });
  })
  .catch((error) => console.log(error));

