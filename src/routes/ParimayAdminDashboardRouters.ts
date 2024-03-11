import express from 'express'
import { HHcount } from '../controllers/PrimaryAdminController';
const PrimaryAdminDashboardRouter = express.Router();




PrimaryAdminDashboardRouter.get('/auth/hhcount',HHcount)



export {PrimaryAdminDashboardRouter}