import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import OracleDB from "oracledb";
import { DataSource } from "typeorm";
import { SpecailReservation } from "./entities/SpecialReservation";
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
import { Complaints } from "./entities/Complaint";
import { BlackListedUser } from "./entities/BlackListedUser";
import { BlackListHistory } from "./entities/BlackListHistory";
import { LocationAdminRoute } from "./routes/LocationAdminRoute";
import {
  HomlyUser,
  UserEmailVerification,
  UserOTPVerification,
  UserInteresed,
} from "./entities/User";
import { Employee } from "./entities/Empolyee";
import { HomlyAdmin } from "./entities/HomlyAdmin";
import { UserFeedback } from "./entities/Feedback";

// routes
import { homly_user } from "./routes/UserRouters";
import { reg_users } from "./routes/RegUserRouters";
import { admin_router } from "./routes/AdminRouters";
import { homly_review } from "./routes/Review";
import { requireAuth } from "./middleware/authMiddleware";
import { BlacklistRouter } from "./routes/BlacklistRouter";

import dotenv from "dotenv";
import { SelectedRooms } from "./entities/SelectedRooms";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

OracleDB.initOracleClient();

export const AppDataSource = new DataSource({
  type: "oracle",
  connectString: process.env.DB_CONNECTION_STRING,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    HomlyAdmin,
    Employee,
    HomlyUser,
    UserInteresed,
    UserEmailVerification,
    UserOTPVerification,
    Complaints,
    BlackListedUser,
    BlackListHistory,
    Hall,
    CareTaker,
    HolidayHome,
    Image,
    Unit,
    Room,
    ContactNo,
    LocationAdmin,
    Rental,
    SpecailReservation,
    UserFeedback,
    SelectedRooms
  ],
  synchronize: true,
  logging: false,
});

// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

AppDataSource.initialize()
  .then(() => {

    // use requireAuth middleware to users/auth all paths
    app.use('/users/auth/*', requireAuth);
    app.use('/admin/auth/locationadmin/holidayhome', HolidayHomeRouter);
    app.use('/admin/auth/locationadmin/reservations', SpecialReservationRouter)
    app.use('/admin', LocationAdminRoute)
    app.use('/admin', BlacklistRouter)
    app.use('/users', homly_user);
    app.use('/users', reg_users);
    app.use('/users', homly_review);
    app.use('/admin', admin_router);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);

    });
  })
  .catch((error) => console.log(error));
