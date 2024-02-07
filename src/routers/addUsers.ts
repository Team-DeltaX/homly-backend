import express from "express";
import { HomlyUser } from "../entities/User";

const router = express.Router();

router.post("/users/add", async (req, res) => {
    // const data = req.body;
    const {
        ServiceNo,
        Password,
        Email,
        ContactNo,
        image,
    } = req.body;
    
    const user = HomlyUser.create({
        service_number:ServiceNo,
        password:Password,
        email:Email,
        contact_number:ContactNo,
        image,
    });
   await user.save();
    // console.log(service_number + " " + password + " " + email + " " + contact_number + " " + image + " " + "User added successfully");
   return res.status(201).json(user);
});



export {
    router as addUsers
}