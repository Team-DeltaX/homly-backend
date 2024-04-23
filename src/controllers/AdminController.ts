import { AppDataSource } from "../index";
import { Request, Response } from "express";
import { HomlyAdmin } from "../entities/HomlyAdmin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create token
const maxAge = 5 * 60 * 60;
const createToken = (serviceNo: String, role: String) => {
  const secretCode = process.env.JWT_SECRET;
  return jwt.sign({ serviceNo, role }, secretCode!, {
    expiresIn: maxAge,
  });
};

const adminLogin = async (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  await AppDataSource.manager
    .find(HomlyAdmin, {
      where: { AdminNo: adminId },
    })
    .then((admin) => {
      if (admin) {
        bcrypt
          .compare(password, admin[0].Password)
          .then((result) => {
            if (result) {
              const token = createToken(admin[0].AdminNo, "Admin");
              if (admin[0].Role === "PrimaryAdmin") {
                res.status(200).json({
                  message: "Login Success",
                  success: true,
                  role: "PrimaryAdmin",
                  token: token,
                });
              } else {
                if (admin[0].Verified) {
                  res.status(200).json({
                    message: "Login Success",
                    success: true,
                    verified: true,
                    role: "LocationAdmin",
                    token: token,
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
              res.status(200).json({
                message: "Invalid Username or Password",
                success: false,
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    })
    .catch((error) => {
      res.status(200).json({ message: "You are not an Admin", success: false });
    });
};

const changeDefaultPassword = async (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  await AppDataSource.manager
    .find(HomlyAdmin, { where: { AdminNo: adminId } })
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
            res
              .status(200)
              .json({ message: "Password Changed", success: true });
          })
          .catch((error) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export { adminLogin, changeDefaultPassword };
