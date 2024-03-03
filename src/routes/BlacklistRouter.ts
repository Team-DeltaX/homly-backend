import express from 'express'
import { addtoblacklist, addtoblacklisthistory, checkuserexist, deletefromblacklisttable, getblacklistedhistory, getblacklistedusers, markedcomplaints, updatehomlyuser ,} from '../controllers/PrimaryAdminController';
const BlacklistRouter = express.Router();



BlacklistRouter.post('/auth/blacklist',addtoblacklist);
BlacklistRouter.get('/auth/blacklist',getblacklistedusers);
BlacklistRouter.get('/auth/isexist/:serviceno',checkuserexist);
//remove from blacklist
BlacklistRouter.delete('/auth/unblacklist',deletefromblacklisttable)
BlacklistRouter.put('/auth/unblacklist',updatehomlyuser)
BlacklistRouter.post('/auth/blacklisthistory',addtoblacklisthistory)
BlacklistRouter.get('/auth/blacklisthistory',getblacklistedhistory);
BlacklistRouter.put('/auth/markcomplaint',markedcomplaints)




export {BlacklistRouter}