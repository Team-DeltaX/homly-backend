import express from 'express'
import { AddAdmin,getall,disableadmin,sendMail,editadmindeatails, getcomplaints} from "../controllers/PrimaryAdminController";
const LocationAdminRoute = express.Router();



LocationAdminRoute.post("/add", AddAdmin)
LocationAdminRoute.get("/all", getall)
LocationAdminRoute.put("/disable/:id", disableadmin)
LocationAdminRoute.post("/resetpassword", sendMail)
LocationAdminRoute.put("/",editadmindeatails )
LocationAdminRoute.get("/complaints",getcomplaints )




export {LocationAdminRoute}