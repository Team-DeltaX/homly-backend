import express from 'express'
import { addtoblacklist, checkuserexist, getblacklistedusers } from '../controllers/PrimaryAdminController';
const BlacklistRouter = express.Router();



BlacklistRouter.post('/auth/blacklist',addtoblacklist);
BlacklistRouter.get('/auth/blacklist',getblacklistedusers);
BlacklistRouter.get('/auth/isexist/:serviceno',checkuserexist);








export {BlacklistRouter}