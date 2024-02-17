import  express  from "express";
import { getHolidayHomes } from "../controllers/UserController";


const HolidayHomeRouter = express.Router();

HolidayHomeRouter.get("/", getHolidayHomes);

export {HolidayHomeRouter}