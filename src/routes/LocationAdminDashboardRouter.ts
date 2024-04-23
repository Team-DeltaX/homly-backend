import express from 'express'
import { Active_InActive_HHcount, Earning, HHcount, Hallincome, Roomincome, getBookingscounts, get_holiday_home_rating, get_income_in_date, get_income_in_date_specificHH, get_not_approved_count, getallHH, gethallcount, getroomcount } from '../controllers/HolidayHomeController';
const LocationAdminDashboardRouter = express.Router();




LocationAdminDashboardRouter.get('/auth/holidayhomecount',HHcount)
LocationAdminDashboardRouter.get('/auth/earning',Earning)
LocationAdminDashboardRouter.get('/auth/holidayhomehstatus',Active_InActive_HHcount )
LocationAdminDashboardRouter.get('/auth/bookingcount',getBookingscounts )
LocationAdminDashboardRouter.get('/auth/hall',gethallcount)
LocationAdminDashboardRouter.get('/auth/room',getroomcount)
LocationAdminDashboardRouter.get('/auth/hallincome',Hallincome)
LocationAdminDashboardRouter.get('/auth/roomincome',Roomincome)
LocationAdminDashboardRouter.get('/auth/dayincome/:date',get_income_in_date)
LocationAdminDashboardRouter.get('/auth/holidayhomenames',getallHH)
LocationAdminDashboardRouter.get('/auth/dayincome/:date/:hhid',get_income_in_date_specificHH)
LocationAdminDashboardRouter.get('/auth/notapprovedcount',get_not_approved_count)
LocationAdminDashboardRouter.get('/auth/holidayhomerating/:homeid',get_holiday_home_rating)





export {LocationAdminDashboardRouter}