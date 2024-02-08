import express from "express";

import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { HomlyUser } from "../entities/User";

const homly_user = express.Router();

const userExist = async (ServiceNo: string) => {
  const usersWithSameNo = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: ServiceNo,
  });
  
  if (usersWithSameNo && usersWithSameNo.verified) {
    return false;
  } else {
    return true;
  }
  
};

homly_user.get("/users", async (req, res) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
});

homly_user.post("/users/add", async (req, res) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;

  if (await userExist(ServiceNo)) {
    const user = HomlyUser.create({
      service_number: ServiceNo,
      password: Password,
      email: Email,
      contact_number: ContactNo,
      image,
    });
    //  await user.save();
    return res.status(201).json({message: "User successfully registred",success:true});
  }else{
    return res.status(201).json({message:'User already exists!',success:false})
  }
});

export { homly_user };
