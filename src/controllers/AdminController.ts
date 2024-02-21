import { AppDataSource } from "../index";
import { Request, Response } from "express";

import { Admin } from "../entities/Admin";

const adminLogin = async (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  await AppDataSource.manager
    .findOneBy(Admin, {
      AdminNo: adminId,
    })
    .then((admin) => {
      if (admin) {
        if (admin.Password === password) {
          if (admin.Role === "PrimaryAdmin") {
            res
              .status(200)
              .json({
                message: "Login Success",
                success: true,
                role: "PrimaryAdmin",
              });
          } else {
            if (admin.Verified) {
              res
                .status(200)
                .json({
                  message: "Login Success",
                  success: true,
                  verified: true,
                  role: "LocationAdmin",
                });
            } else {
              res.status(200).json({
                message: "Login Success,Please Change Your default password",
                success: true,
                verified: false,
              });
            }
          }
        } else {
          res.status(200).json({ message: "Invalid Username or Password" ,success:false});
        }
      } else {
        res.status(200).json({ message: "You are not an Admin" ,success:false});
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export { adminLogin };
