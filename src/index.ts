import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import OracleDB from "oracledb";
import io from "./services/socketio";
import { DataSource } from "typeorm";
import { ReservedRooms } from "./entities/ReservedRooms";
import { ReservedHalls } from "./entities/ReservedHalls";
import { Hall } from "./entities/Hall";
import { CareTaker } from "./entities/CareTaker";
import { HolidayHome } from "./entities/HolidayHome";
import { RoomRentalSettings } from "./entities/HolidayHome";
import { RoomTypeSettings } from "./entities/HolidayHome";
import { Unit } from "./entities/Unit";
import { Room } from "./entities/Room";
import { ContactNo } from "./entities/ContactNo";
import { LocationAdmin } from "./entities/LocationAdmin";
import { HolidayHomeRouter } from "./routes/HolidayHome";
import { Rental } from "./entities/Rental";
import { Complaints } from "./entities/Complaint";
import { BlackListedUser } from "./entities/BlackListedUser";
import { BlackListHistory } from "./entities/BlackListHistory";
import { Reservation } from "./entities/Reservation";
import { Refund } from "./entities/Refund";
import { LocationAdminRoute } from "./routes/LocationAdminRoute";
import {
  HomlyUser,
  UserEmailVerification,
  UserOTPVerification,
  UserInteresed,
} from "./entities/User";
import { WishList } from "./entities/WishList";
import { Employee } from "./entities/Empolyee";
import { HomlyAdmin } from "./entities/HomlyAdmin";
import { SelectedRooms } from "./entities/SelectedRooms";
import { Review } from "./entities/Review";
import { Notification } from "./entities/Notification";

// routes
import { homly_user } from "./routes/UserRouters";
import { reg_users } from "./routes/RegUserRouters";
import { admin_router } from "./routes/AdminRouters";
import { homly_review } from "./routes/Review";
import { BlacklistRouter } from "./routes/BlacklistRouter";
import { ReportsRouter } from "./routes/ReportRouters";
import { requireAuth } from "./middleware/authMiddleware";
import { requireUserAuth } from "./middleware/authUserMiddleware";
import { requireAdminAuth } from "./middleware/authAdminMiddleware";
import { common_router } from "./routes/Common";

import dotenv from "dotenv";
import { ReservationRouter } from "./routes/ReservationRouter";
import { PrimaryAdminDashboardRouter } from "./routes/ParimayAdminDashboardRouters";
import { LocationAdminDashboardRouter } from "./routes/LocationAdminDashboardRouter";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

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
    Unit,
    Room,
    Reservation,
    Refund,
    ContactNo,
    LocationAdmin,
    Rental,
    SelectedRooms,
    RoomRentalSettings,
    RoomTypeSettings,
    ReservedRooms,
    Review,
    ReservedHalls,
    WishList,
    Notification,
  ],
  synchronize: true,
  logging: false,
});

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

io.listen(8081);

AppDataSource.initialize()
  .then(() => {
    app.use("/common/auth/*", requireAuth);
    app.use("/user/auth/*", requireUserAuth);
    app.use("/admin/auth/*", requireAdminAuth);
    app.use("/admin/auth/locationadmin/holidayhome", HolidayHomeRouter);
    app.use("/admin", LocationAdminRoute);
    app.use("/admin", ReportsRouter);
    app.use("/admin", BlacklistRouter);
    app.use("/user", homly_user);
    app.use("/user", reg_users);
    app.use("/user", homly_review);
    app.use("/admin", admin_router);
    app.use("/", ReservationRouter);
    app.use("/admin", PrimaryAdminDashboardRouter);
    app.use("/admin", LocationAdminDashboardRouter);
    app.use("/common", common_router);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
