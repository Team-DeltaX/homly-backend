import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    const secretCode = process.env.JWT_SECRET;
    jwt.verify(
      token,
      secretCode!,
      (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          console.log('no token');
          res.status(401).json({ message: "Unauthorized", autherized: false });
        } else {
          console.log('token',decodedToken);
          (req as any).serviceNo = decodedToken.serviceNo;
          return next();
        }
      }
    );
  } else {
    console.log('no token');
    res.status(401).json({ message: "Unauthorized", autherized: false });
  }
};

export { requireAuth };
