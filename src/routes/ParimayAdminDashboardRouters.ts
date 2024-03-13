import express from 'express'
import { Active_InActive_HHcount, Earning, HHcount, getBookingscounts, gethallcount } from '../controllers/PrimaryAdminController';
const PrimaryAdminDashboardRouter = express.Router();




PrimaryAdminDashboardRouter.get('/auth/hhcount',HHcount)
PrimaryAdminDashboardRouter.get('/auth/earning',Earning)
PrimaryAdminDashboardRouter.get('/auth/hhstatus',Active_InActive_HHcount )
PrimaryAdminDashboardRouter.get('/auth/bookingcount',getBookingscounts )
PrimaryAdminDashboardRouter.get('/auth/hall',gethallcount)




export {PrimaryAdminDashboardRouter}