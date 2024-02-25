import express from 'express'
import { addtoblacklist, checkuserexist, getblacklistedusers } from '../controllers/PrimaryAdminController';
const BlacklistRouter = express.Router();



BlacklistRouter.post('/blacklist',addtoblacklist);
BlacklistRouter.get('/blacklistusers',getblacklistedusers);
BlacklistRouter.get('/isexist/:serviceno',checkuserexist);








export {BlacklistRouter}