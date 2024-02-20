import express from 'express'
import { AddAdmin,getall,disableadmin,sendMail,editadmindeatails} from "../controllers/SpecialReservaionController";
const LocationAdminRoute = express.Router();



LocationAdminRoute.post("/add", AddAdmin)
LocationAdminRoute.get("/all", getall)
LocationAdminRoute.put("/disable/:id", disableadmin)
LocationAdminRoute.post("/resetpassword", sendMail)
LocationAdminRoute.put("/",editadmindeatails )




export {LocationAdminRoute}