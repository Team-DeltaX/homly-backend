// email handler
import * as nodemailer from "nodemailer";

// unique string generator
import { v4 as uuidv4 } from "uuid";

// bycrypt
import bcrypt from "bcrypt";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../index";
import { Request, Response } from "express";
import {
  HomlyUser,
  UserEmailVerification,
  UserOTPVerification,
} from "../entities/User";

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

// send verification email
const sendVerificationEmail = (email: string, serviceNo: string) => {
  const url = `http://localhost:3002/users/verify`;
  const verificationCode = uuidv4() + serviceNo;
  const link = `${url}/${serviceNo}/${verificationCode}`;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Homly User Verification",
    html: `
    <!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>

    <style type="text/css">
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }

        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        table,
        td {
            color: #000000;
        }

        #u_body a {
            color: #0000ee;
            text-decoration: underline;
        }

        @media (max-width: 480px) {
            #u_content_image_1 .v-src-width {
                width: auto !important;
            }

            #u_content_image_1 .v-src-max-width {
                max-width: 40% !important;
            }

            #u_content_heading_1 .v-font-size {
                font-size: 38px !important;
            }

            #u_content_image_3 .v-src-width {
                width: 100% !important;
            }

            #u_content_image_3 .v-src-max-width {
                max-width: 100% !important;
            }

            #u_content_text_5 .v-container-padding-padding {
                padding: 10px 30px 11px 10px !important;
            }
        }
    </style>



    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
        type="text/css">

</head>

<body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">

    <table id="u_body"
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">


                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f1f2f6;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                            <table id="u_content_image_1" style="font-family:'Montserrat',sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="v-container-padding-padding"
                                                            style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 31px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://drive.google.com/thumbnail?id=1A-WuiaOpfKXcAqZjIVZVNH0VEkzWMxI2&sz=w1000"
                                                                            alt="Logo" title="Logo"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 24%;max-width: 139.2px;"
                                                                            width="139.2"
                                                                            class="v-src-width v-src-max-width" />

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #fbfcff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div
                                            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

                                                <table id="u_content_heading_1"
                                                    style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 30px;font-family:'Montserrat',sans-serif;"
                                                                align="left">

                                                                <h1 class="v-font-size"
                                                                    style="margin: 0px; color: #27187e; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 36px; font-weight: 400;">
                                                                    <span><strong>Verify Your Email
                                                                            Address</strong></span></h1>


                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="u_content_image_3"
                                                    style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding"
                                                                style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Montserrat',sans-serif;"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">

                                                                            <img align="center" border="0"
                                                                                src="https://drive.google.com/thumbnail?id=1uFMnsH8AYl5ax7U8MXvsZdkGKQy75uec&sz=w1000"
                                                                                alt="Hero Image" title="Hero Image"
                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 55%;max-width: 313.5px;"
                                                                                width="313.5"
                                                                                class="v-src-width v-src-max-width" />

                                                                        </td>
                                                                    </tr>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #fbfcff;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div
                                                style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <div
                                                    style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

                                                    <table id="u_content_text_5"
                                                        style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:40px 30px 20px 40px;font-family:'Montserrat',sans-serif;"
                                                                    align="left">

                                                                    <div class="v-font-size"
                                                                        style="font-size: 14px; color: #4b4a4a; line-height: 190%; text-align: left; word-wrap: break-word;">
                                                                        <p style="font-size: 14px; line-height: 190%;">
                                                                            <span
                                                                                style="font-size: 18px; line-height: 34.2px;"><strong><span
                                                                                        style="line-height: 34.2px; font-size: 18px;">Dear
                                                                                        ${serviceNo},</span></strong></span>
                                                                        </p>
                                                                        <p style="font-size: 14px; line-height: 190%;">
                                                                            <span
                                                                                style="font-size: 16px; line-height: 30.4px;">Please
                                                                                Verify Your Email</span></p>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Montserrat',sans-serif; "
                                                        role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 30px;font-family:'Montserrat',sans-serif;"
                                                                    align="left">


                                                                    <div align="center">

                                                                        <a href=${link} target="_blank"
                                                                            class="v-button v-font-size"
                                                                            style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff8600; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                                                            <span
                                                                                style="display:block;padding:16px 50px;line-height:120%;"><strong><span
                                                                                        style="font-size: 14px; line-height: 16.8px;">C
                                                                                        L I C K   H E R
                                                                                        E</span></strong></span>
                                                                        </a>

                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Montserrat',sans-serif;"
                                                        role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="v-container-padding-padding"
                                                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                                    align="left">

                                                                    <div class="v-font-size"
                                                                        style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                        <p style="line-height: 140%;">This link expire
                                                                            in 1 minute</p>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>

    `,
  };
  // hash the verification code
  const saltRound = 10;
  bcrypt
    .hash(verificationCode, saltRound)
    .then((hashedVerificationCode) => {
      // add verification code to useremailverification table
      const userVerification = UserEmailVerification.create({
        service_number: serviceNo,
        verification_code: hashedVerificationCode,
        created_at: new Date(),
        // expire after 1 minites
        expires_at: new Date(Date.now() + 1 * 60000),
      });

      userVerification
        .save()
        .then(() => {
          console.log("verification code saved");
          transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        })
        .catch((err) => {
          console.log("error saving verification code", err);
        });
    })
    .catch((err) => {
      console.log("error hashing verification code", err);
    });
};

// verify email
// url with verification code and service number
const emailVerification = async (req: Request, res: Response) => {
  let message, verified; // send details to frontend
  const { serviceNo, verificationCode } = req.params;
  const userVerification = await AppDataSource.manager.findOneBy(
    UserEmailVerification,
    {
      service_number: serviceNo,
    }
  );

  if (userVerification) {
    const expiresAt = userVerification?.expires_at; // Add null check here

    if (expiresAt && expiresAt < new Date()) {
      // record has expired, then delete data
      // delete user record from userverification table
      console.log("verified email expired");
      await AppDataSource.manager
        .delete(UserEmailVerification, {
          service_number: serviceNo,
        })
        .then((result) => {
          AppDataSource.manager.delete(HomlyUser, {
            service_number: serviceNo,
          });
        });
      message = "Verification Link is Expired";
      verified = false;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    } else {
      bcrypt
        .compare(verificationCode, userVerification.verification_code)
        .then((result) => {
          if (result) {
            // update user
            console.log("email verified");
            AppDataSource.manager
              .update(
                HomlyUser,
                { service_number: serviceNo },
                { verified: true }
              )
              .then(() => {
                console.log(
                  "user verified and deleted from userverification table"
                );
                AppDataSource.manager.delete(UserEmailVerification, {
                  service_number: serviceNo,
                });
              });
            verified = true;
            message = "User is Verified";
            res.redirect(
              `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
            );
          }
        });
    }
  } else {
    const user = await AppDataSource.manager.findOneBy(HomlyUser, {
      service_number: serviceNo,
    });

    if (user && user.verified) {
      // res.status(200).json({ message: "User already verified", success: true });
      message = "User already verified";
      verified = true;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    } else {
      // res.status(200).json({ message: "User not found or Verification link is Expired", success: false });
      message = "User not found";
      verified = false;
      res.redirect(
        `http://localhost:3000/Registration/Success?message=${message}&verified=${verified}`
      );
    }
  }
};

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

const allUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
};

// user registration
const userRegistration = async (req: Request, res: Response) => {
  const { ServiceNo, Password, Email, ContactNo, image } = req.body;

  if (await userExist(ServiceNo)) {
    sendVerificationEmail(Email, ServiceNo);
    // bcrypt password
    const saltRounds = 10;
    bcrypt
      .hash(Password, saltRounds)
      .then(async (hash) => {
        const user = HomlyUser.create({
          service_number: ServiceNo,
          password: hash,
          email: Email,
          contact_number: ContactNo,
          image,
        });
        await user.save();
        return res.status(201).json({
          message: "Check your emails,We will send you a verification link",
          success: true,
        });
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ message: "Error saving user", success: false });
      });
  } else {
    return res
      .status(201)
      .json({ message: "User already exists!", success: false });
  }
};

// user login
const userLogin = async (req: Request, res: Response) => {
  const { serviceNo, password } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        res.status(200).json({ message: "Login Successful", success: true });
      } else {
        res
          .status(200)
          .json({ message: "Incorrect password or Username", success: false });
      }
    });
  } else {
    res
      .status(200)
      .json({ message: "You are not a registered user", success: false });
  }
};

// forget password
// generate OTP and send to email function
const sendOTP = (email: string, serviceNo: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1><hr><h4>Your OTP is:</h4><h2 style="color:red">${otp}</h2><h4>Your OTP expire in<span style="text-decoration: underline"> 1 minutes </span></h4>`,
  };

  // hash the otp
  const saltRound = 10;
  bcrypt
    .hash(otp.toString(), saltRound)
    .then((hashedOTP) => {
      // add otp to userotpverification table
      const userOTPVerification = UserOTPVerification.create({
        service_number: serviceNo,
        otp: hashedOTP,
        created_at: new Date(),
        // expire after 1 minites
        expires_at: new Date(Date.now() + 1 * 60000),
      });

      userOTPVerification
        .save()
        .then(() => {
          console.log("OTP saved");
          transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email OTP sent: " + info.response);
            }
          });
        })
        .catch((err) => {
          console.log("error saving otp", err);
        });
    })
    .catch((err) => {
      console.log("error hashing otp", err);
    });
};

// get user by email,serviceno
const forgetPasswordDetails = async (req: Request, res: Response) => {
  const { serviceNo, email } = req.body;
  console.log(serviceNo, email);
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  console.log(user?.verified, user?.email === email);
  if (user && user.verified) {
    if (user.email === email) {
      sendOTP(email, serviceNo);

      res
        .status(200)
        .json({ message: "Check your email,We will send OTP", success: true });
    } else {
      res
        .status(200)
        .json({ message: "Invalid Service Number or Email", success: false });
    }
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};

// get otp and validate
const otpVerification = async (req: Request, res: Response) => {
  const { serviceNo, otp } = req.body;
  const userOTP = await AppDataSource.manager.findOneBy(UserOTPVerification, {
    service_number: serviceNo,
  });

  if (userOTP) {
    const expiresAt = userOTP.expires_at;

    if (expiresAt && expiresAt < new Date()) {
      // record has expired, then delete data
      // delete user record from userotpverification table
      console.log("otp expired");
      await AppDataSource.manager.delete(UserOTPVerification, {
        service_number: serviceNo,
      });
      res.status(200).json({ message: "OTP Expired", success: false });
    } else {
      bcrypt.compare(otp, userOTP.otp).then(async (result) => {
        if (result) {
          console.log("OTP Verified");
          await AppDataSource.manager.update(
            UserOTPVerification,
            { service_number: serviceNo },
            { verified: true }
          );
          res.status(200).json({ message: "OTP Verified", success: true });
        } else {
          res.status(200).json({ message: "Invalid OTP", success: false });
        }
      });
    }
  } else {
    res.status(200).json({ message: "error", success: false });
  }
};

// reset password
const resetPassword = async (req: Request, res: Response) => {
  const { serviceNo, password } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    const otp = await AppDataSource.manager.findOneBy(UserOTPVerification, {
      service_number: serviceNo,
    });

    if (otp?.verified) {
      const saltRounds = 10;
      bcrypt
        .hash(password, saltRounds)
        .then(async (hash) => {
          await AppDataSource.manager.update(
            HomlyUser,
            { service_number: serviceNo },
            { password: hash }
          );
          res
            .status(200)
            .json({ message: "Password Reset Successful", success: true });
        })
        .catch((err) => {
          res
            .status(200)
            .json({ message: "Error resetting password", success: false });
        });
    } else {
      res.status(200).json({ message: "OTP not verified", success: false });
    }
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};

export {
  allUsers,
  userRegistration,
  emailVerification,
  userLogin,
  forgetPasswordDetails,
  otpVerification,
  resetPassword,
};
