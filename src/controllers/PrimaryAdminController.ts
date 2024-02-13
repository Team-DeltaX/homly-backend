import express from "express";
const router = express.Router();
import { LocationAdmin } from "../entities/LocationAdmin";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { error } from "console";

router.post("/add", async (req: Request, res: Response) => {
  const {
    AdminNo,
    UserName,
    Password,
    ContactNo,
    Email,
    WorkLocation,
    Disabled,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(LocationAdmin)
      .values([
        {
          AdminNo,
          UserName,
          Password,
          ContactNo,
          Email,
          WorkLocation,
          Disabled,
        },
      ])
      .execute();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  const admins = await AppDataSource.manager.find(LocationAdmin);
  try {
    const admins = await AppDataSource.manager.find(LocationAdmin);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/disable/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const dis = req.body;

  try {
    await AppDataSource.manager.update(
      LocationAdmin,
      { AdminNo: id },
      { Disabled: dis }
    );

    res.status(200).json({ message: "disable sucessful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router };
