import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const secretCode = process.env.JWT_SECRET;
    jwt.verify(
      token,
      secretCode!,
      (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          res
            .status(401)
            .json({
              message: "Unauthorized",
              autherized: false,
              role: "Admin",
            });
        } else {
          if (decodedToken.exp < Date.now() / 1000) {
            res
              .status(401)
              .json({
                message: "Token expired",
                autherized: false,
                role: "Admin",
              });
          } else {
            if (decodedToken.role !== "Admin") {
              return res
                .status(401)
                .json({
                  message: "Unauthorized",
                  autherized: false,
                  role: "Admin",
                });
            }
            (req as any).serviceNo = decodedToken.serviceNo;
            return next();
          }
        }
      }
    );
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized", autherized: false, role: "Admin" });
  }
};

export { requireAdminAuth };
