import express from 'express'
import { AddAdmin,getall,disableadmin,sendMail,editadmindeatails, getcomplaints, get_user_from_user, get_user_from_employee, getprevcomplaints, getallDisabled} from "../controllers/PrimaryAdminController";
const LocationAdminRoute = express.Router();



LocationAdminRoute.post("/auth/locationadmin/add", AddAdmin)
LocationAdminRoute.get("/auth/locationadmin/all", getall)
LocationAdminRoute.get("/auth/locationadmin/alldisabled", getallDisabled)
LocationAdminRoute.put("/auth/locationadmin/disable/:id", disableadmin)
LocationAdminRoute.post("/auth/locationadmin/resetpassword", sendMail)
LocationAdminRoute.put("/auth/locationadmin/",editadmindeatails )
LocationAdminRoute.get("/auth/locationadmin/complaints",getcomplaints )
LocationAdminRoute.get("/auth/locationadmin/user/:serviceno",get_user_from_user )
LocationAdminRoute.get("/auth/locationadmin/employee/:serviceno",get_user_from_employee )
LocationAdminRoute.get("/auth/locationadmin/complaint/:serviceno",getprevcomplaints )








export {LocationAdminRoute}