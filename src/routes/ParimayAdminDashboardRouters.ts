import express from 'express'
import { Active_InActive_HHcount, Earning, HHcount, Hallincome, Roomincome, getBookingscounts, get_income_in_date, get_income_in_date_specificHH, get_not_approved_count, getallHH, gethallcount, getroomcount } from '../controllers/PrimaryAdminController';
const PrimaryAdminDashboardRouter = express.Router();




PrimaryAdminDashboardRouter.get('/auth/holidayhomecount',HHcount)
PrimaryAdminDashboardRouter.get('/auth/earning',Earning)
PrimaryAdminDashboardRouter.get('/auth/holidayhomehstatus',Active_InActive_HHcount )
PrimaryAdminDashboardRouter.get('/auth/bookingcount',getBookingscounts )
PrimaryAdminDashboardRouter.get('/auth/hall',gethallcount)
PrimaryAdminDashboardRouter.get('/auth/room',getroomcount)
PrimaryAdminDashboardRouter.get('/auth/hallincome',Hallincome)
PrimaryAdminDashboardRouter.get('/auth/roomincome',Roomincome)
PrimaryAdminDashboardRouter.get('/auth/dayincome/:date',get_income_in_date)
PrimaryAdminDashboardRouter.get('/auth/holidayhomenames',getallHH)
PrimaryAdminDashboardRouter.get('/auth/dayincome/:date/:hhid',get_income_in_date_specificHH)
PrimaryAdminDashboardRouter.get('/auth/notapprovedcount',get_not_approved_count)






export {PrimaryAdminDashboardRouter}