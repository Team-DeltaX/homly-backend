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
import e, { Request, Response } from "express";
import {
  HomlyUser,
  UserEmailVerification,
  UserOTPVerification,
} from "../entities/User";

import { Employee } from "../entities/Empolyee";

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
   

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: 1;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    [style*="Lato"] {font-family: 'Lato', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Inter Tight"] {font-family: 'Inter Tight', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
    @media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t3,.t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.t15,.t37,.t57{width:600px!important}}
    </style>
    <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3,.moz-text-html .t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.moz-text-html .t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.moz-text-html .t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.moz-text-html .t15,.moz-text-html .t37,.moz-text-html .t57{width:600px!important}</style>
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;800&amp;family=Inter+Tight:wght@900&amp;family=Lato:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
    
    </head>
    <body class="t0" style="min-width:100%;Margin:0px;padding:0px;background-color:#F4F4F4;"><div class="t1" style="background-color:#F4F4F4;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t2" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F4F4F4;" valign="top" align="center">
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color="#F4F4F4"/>
    </v:background>
    <![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t3" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
    <table class="t10" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t11" style="background-color:#FFFFFF;width:400px;padding:40px 40px 40px 40px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t11" style="background-color:#FFFFFF;width:480px;padding:40px 40px 40px 40px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t46" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
    <!--[if !mso]><!--><td class="t47" style="width:134px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t47" style="width:134px;"><![endif]-->
    <div style="font-size:0px;"><img class="t53" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="134" height="36.59375" alt="" src="https://drive.google.com/thumbnail?id=1A-WuiaOpfKXcAqZjIVZVNH0VEkzWMxI2&sz=w1000"/></div></td>
    </tr></table>
    </td></tr><tr><td><div class="t45" style="mso-line-height-rule:exactly;mso-line-height-alt:29px;line-height:29px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t56" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t57" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t57" style="width:480px;"><![endif]-->
    <h3 class="t63" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t64" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">Dear ${serviceNo},</span></h3></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t14" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t15" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t15" style="width:480px;"><![endif]-->
    <h1 class="t21" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Confirm your account</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t36" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t37" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t37" style="width:480px;"><![endif]-->
    <p class="t43" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Please click the button below to confirm your email address and finish setting up your account. This link is valid for 2 minutes.</p></td>
    </tr></table>
    </td></tr><tr><td><div class="t22" style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t24" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
    <!--[if !mso]><!--><td class="t25" style="background-color:#882233;overflow:hidden;width:105px;text-align:center;line-height:34px;mso-line-height-rule:exactly;mso-text-raise:6px;border-radius:40px 40px 40px 40px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t25" style="background-color:#882233;overflow:hidden;width:105px;text-align:center;line-height:34px;mso-line-height-rule:exactly;mso-text-raise:6px;border-radius:40px 40px 40px 40px;"><![endif]-->
        <a href="${link}"><span class="t31" style="display:block;margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:34px;font-weight:900;font-style:normal;font-size:13px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:6px;">Confirm</span></td>
    </a>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
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
// get all employees
const allEmployees = async (req: Request, res: Response) => {
  const employees = await AppDataSource.manager.find(Employee);
  res.json({ employees: employees });
};

// get all users
const allUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(HomlyUser);
  res.json(users);
};

// get user by service number
const userById = async (req: Request, res: Response) => {
  const { serviceNo } = req.params;
  AppDataSource.manager
    .findOneBy(HomlyUser, { service_number: serviceNo })
    .then((user) => {
      AppDataSource.manager
        .findOneBy(Employee, { service_number: serviceNo })
        .then((employee) => {
          res.status(200).json({
            name: employee?.name,
            nic: employee?.nic,
            work: employee?.work_place,
            address: employee?.address,
            contactNo: user?.contact_number,
            email: user?.email,
            image: user?.image,
          });
        })
        .catch(() => {
          res.status(404).json({ message: "Error", success: false });
        });
      // res.status(200).json(user);
    })
    .catch(() => {
      res.status(404).json({ message: "User not found", success: false });
    });
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
    html: `
    <!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: 1;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
[style*="Lato"] {font-family: 'Lato', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Roboto"] {font-family: 'Roboto', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
@media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t3,.t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.t25,.t35,.t45,.t55,.t65{width:600px!important}}
</style>
<style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3,.moz-text-html .t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.moz-text-html .t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.moz-text-html .t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.moz-text-html .t25,.moz-text-html .t35,.moz-text-html .t45,.moz-text-html .t55,.moz-text-html .t65{width:600px!important}</style>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;800&amp;family=Lato:wght@400;700;900&amp;family=Roboto:wght@700&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3,div.t4{mso-line-height-alt:60px !important;line-height:60px !important;display:block !important}td.t9{border-radius:8px !important;overflow:hidden !important;padding:60px !important}td.t11{padding:60px !important;border-radius:8px !important;overflow:hidden !important;width:600px !important}td.t25,td.t35,td.t45,td.t55,td.t65{width:600px !important}
</style>
<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body class="t0" style="min-width:100%;Margin:0px;padding:0px;background-color:#F4F4F4;"><div class="t1" style="background-color:#F4F4F4;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t2" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F4F4F4;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#F4F4F4"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t3" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
<table class="t10" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t11" style="background-color:#FFFFFF;width:400px;padding:40px 40px 40px 40px;">
<!--<![endif]-->
<!--[if mso]><td class="t11" style="background-color:#FFFFFF;width:480px;padding:40px 40px 40px 40px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t14" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
<!--[if !mso]><!--><td class="t15" style="width:139px;padding:0 15px 0 0;">
<!--<![endif]-->
<!--[if mso]><td class="t15" style="width:154px;padding:0 15px 0 0;"><![endif]-->
<div style="font-size:0px;"><img class="t21" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="139" height="37.953125" alt="" src="https://drive.google.com/thumbnail?id=1A-WuiaOpfKXcAqZjIVZVNH0VEkzWMxI2&sz=w1000"/></div></td>
</tr></table>
</td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:42px;line-height:42px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t44" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t45" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t45" style="width:480px;"><![endif]-->
<h3 class="t51" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Dear ${serviceNo}</h3></td>
</tr></table>
</td></tr><tr><td>
<table class="t24" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t25" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t25" style="width:480px;"><![endif]-->
<h1 class="t31" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Reset Password</h1></td>
</tr></table>
</td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t34" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t35" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t35" style="width:480px;"><![endif]-->
<p class="t41" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">A request to reset your account password has been received. Please use the following OTP to complete the reset process</p></td>
</tr></table>
</td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t54" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t55" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t55" style="width:480px;"><![endif]-->
<h1 class="t61" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Roboto';line-height:34px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:10px;direction:ltr;color:#882233;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">${otp}</h1></td>
</tr></table>
</td></tr><tr><td><div class="t62" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t64" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t65" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t65" style="width:480px;"><![endif]-->
<p class="t71" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Please note that the OTP will expire in <span class="t72" style="margin:0;Margin:0;font-weight:900;mso-line-height-rule:exactly;">1 minute</span> for security purposes.</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
</html>
    `,
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

// update user details
const updateUserDetails = async (req: Request, res: Response) => {
  const { serviceNo, email, contactNo, image } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  try {
    if (user && user.verified) {
      await AppDataSource.manager.update(
        HomlyUser,
        { service_number: serviceNo },
        {
          email,
          contact_number: contactNo,
          image,
        }
      );
      res.status(200).json({ message: "User details updated", success: true });
    } else {
      res.status(200).json({ message: "User not found", success: false });
    }
  } catch (error: any) {
    console.log(error);
    res
      .status(200)
      .json({ message: "Error updating user details", success: false });
  }
};
// update user password
const updateUserPassword = async (req: Request, res: Response) => {
  const { serviceNo, oldPassword, newPassword } = req.body;
  const user = await AppDataSource.manager.findOneBy(HomlyUser, {
    service_number: serviceNo,
  });
  if (user && user.verified) {
    bcrypt.compare(oldPassword, user.password).then(async (result) => {
      if (result) {
        const saltRounds = 10;
        bcrypt
          .hash(newPassword, saltRounds)
          .then(async (hash) => {
            await AppDataSource.manager.update(
              HomlyUser,
              { service_number: serviceNo },
              {
                password: hash,
              }
            );
            res
              .status(200)
              .json({ message: "Password updated", success: true });
          })
          .catch((err) => {
            res
              .status(200)
              .json({ message: "Error updating password", success: false });
          });
      } else {
        res
          .status(200)
          .json({ message: "Incorrect old password", success: false });
      }
    });
  } else {
    res.status(200).json({ message: "User not found", success: false });
  }
};

export {
  allEmployees,
  allUsers,
  userById,
  userRegistration,
  emailVerification,
  userLogin,
  forgetPasswordDetails,
  otpVerification,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
};
