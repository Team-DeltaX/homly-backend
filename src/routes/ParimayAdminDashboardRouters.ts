import express from 'express'
import { Earning, HHcount } from '../controllers/PrimaryAdminController';
const PrimaryAdminDashboardRouter = express.Router();




PrimaryAdminDashboardRouter.get('/auth/hhcount',HHcount)
PrimaryAdminDashboardRouter.get('/auth/earning',Earning)



export {PrimaryAdminDashboardRouter}