import express from 'express'
import { addtoblacklist } from '../controllers/PrimaryAdminController';
const BlacklistRouter = express.Router();



BlacklistRouter.post('/blacklist',addtoblacklist);







export {BlacklistRouter}