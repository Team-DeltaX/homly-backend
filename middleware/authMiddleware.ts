import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        const secretCode = process.env.JWT_SECRET;
        jwt.verify(token, secretCode!, (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
            console.log(err.message);
            res.redirect("/");
        } else {
            console.log(decodedToken);
            next();
        }
        });
    } else {
        res.redirect("/");
    }
}