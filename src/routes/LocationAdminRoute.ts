import express from 'express'
import { AddAdmin,getall,disableadmin,sendMail,editadmindeatails, getcomplaints, get_user_from_user, get_user_from_employee, getprevcomplaints} from "../controllers/PrimaryAdminController";
const LocationAdminRoute = express.Router();



LocationAdminRoute.post("/add", AddAdmin)
LocationAdminRoute.get("/all", getall)
LocationAdminRoute.put("/disable/:id", disableadmin)
LocationAdminRoute.post("/resetpassword", sendMail)
LocationAdminRoute.put("/",editadmindeatails )
LocationAdminRoute.get("/complaints",getcomplaints )
LocationAdminRoute.get("/user/:serviceno",get_user_from_user )
LocationAdminRoute.get("/employee/:serviceno",get_user_from_employee )
LocationAdminRoute.get("/complaint/:serviceno",getprevcomplaints )








export {LocationAdminRoute}