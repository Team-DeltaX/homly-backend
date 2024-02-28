import { AppDataSource } from "../index";
import { Request, Response } from "express";

import { HomlyAdmin } from "../entities/HomlyAdmin";

// bycrypt
import bcrypt from "bcrypt";

const adminLogin = async (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  await AppDataSource.manager
    .findOneBy(HomlyAdmin, {
      AdminNo: adminId,
    })
    .then((admin) => {
      if (admin) {
        bcrypt
          .compare(password, admin.Password)
          .then((result) => {
            if (result) {
              if (admin.Role === "PrimaryAdmin") {
                res.status(200).json({
                  message: "Login Success",
                  success: true,
                  role: "PrimaryAdmin",
                });
              } else {
                if (admin.Verified) {
                  res.status(200).json({
                    message: "Login Success",
                    success: true,
                    verified: true,
                    role: "LocationAdmin",
                  });
                } else {
                  res.status(200).json({
                    message:
                      "Login Success,Please Change Your default password",
                    success: true,
                    verified: false,
                  });
                }
              }
            } else {
              res
                .status(200)
                .json({
                  message: "Invalid Username or Password",
                  success: false,
                });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      } else {
        res
          .status(200)
          .json({ message: "You are not an Admin", success: false });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const changeDefaultPassword = async (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  await AppDataSource.manager
    .findOneBy(HomlyAdmin, { AdminNo: adminId })
    .then((admin) => {
      if (admin) {
        const saltRound = 10;
        bcrypt
          .hash(password, saltRound)
          .then((hash) => {
            AppDataSource.manager.update(
              HomlyAdmin,
              { AdminNo: adminId },
              { Password: hash, Verified: true }
            );
            res.status(200).json({ message: "Password Changed", success: true });
          })
          .catch((error) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    });
};

export { adminLogin,changeDefaultPassword };