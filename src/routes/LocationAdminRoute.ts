import express from 'express'
import { AddAdmin,getall,disableadmin,sendMail} from "../controllers/PrimaryAdminController";
const LocationAdminRoute = express.Router();



LocationAdminRoute.post("/add", AddAdmin)
LocationAdminRoute.get("/all", getall)
LocationAdminRoute.put("/disable/:id", disableadmin)
LocationAdminRoute.post("/sendmail/:Email", sendMail)



export {LocationAdminRoute}