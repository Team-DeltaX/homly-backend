import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const serviceNo = req.cookies.serviceNo;
  if (token) {
    const secretCode = process.env.JWT_SECRET;
    jwt.verify(
      token,
      secretCode!,
      (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message: "Unauthorized", autherized: false });
        } else {
          console.log(decodedToken, serviceNo);
          if (decodedToken.serviceNo !== serviceNo) {
            res
              .status(401)
              .json({ message: "Unauthorized", autherized: false });
          } else {
            if (decodedToken.role === "user") {
              (req as any).serviceNo = decodedToken.serviceNo;
              return next();
            }
          }
        }
      }
    );
  } else {
    console.log("No token");
    // res.redirect("http://localhost:3000/");
    res.status(401).json({ message: "Unauthorized", autherized: false });
  }
};

export { requireAuth };
