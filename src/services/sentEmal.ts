import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_PASS,
  },
});

transporter.verify((error: any, success: any) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

const sentEmail = (email: string, subject: string, html: string) => {
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: subject,
        html: html,
        };
    transporter.sendMail(mailOptions);

}

export default sentEmail;