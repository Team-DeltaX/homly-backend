import express from "express";
const router = express.Router();
import { LocationAdmin } from "../entities/LocationAdmin";
import { Request, Response } from "express";
import { AppDataSource } from "../index";
import { error } from "console";
import {v4 as uuid, v4} from 'uuid'
// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mnbro123321@gmail.com",
    pass: "dtpf laju vxbe yhqk",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages")
 
  }
});

  export const AddAdmin=async (req: Request, res: Response) => {
  const {
    AdminNo,
    UserName,
   
    ContactNo,
    Email,
    WorkLocation,
    // Disabled,
    Sub,
  } = req.body;

  //   const locationadmin = LocationAdmin.create();
  const loginurl="google.com"
  const str =uuid()
  const arrypw=str.split('-')
  
  const Password=arrypw[arrypw.length-1]

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(LocationAdmin)
      .values([
        {
          AdminNo,
          UserName,
          Password,
          ContactNo,
          Email,
          WorkLocation,
          // Disabled,
          Sub,

        },
      ])
      .execute();

      var mailOptions = {
        from: "mnbro123321@gmail.com",
        to: Email,
        subject: "You Are Added as Location Admin in Homly",
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
[style*="Lato"] {font-family: 'Lato', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
@media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t3,.t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.t25,.t35,.t45,.t56,.t66,.t76{width:600px!important}}
</style>
<style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3,.moz-text-html .t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.moz-text-html .t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.moz-text-html .t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.moz-text-html .t25,.moz-text-html .t35,.moz-text-html .t45,.moz-text-html .t56,.moz-text-html .t66,.moz-text-html .t76{width:600px!important}</style>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;800&amp;family=Lato:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3,div.t4{mso-line-height-alt:60px !important;line-height:60px !important;display:block !important}td.t9{border-radius:8px !important;overflow:hidden !important;padding:60px !important}td.t11{padding:60px !important;border-radius:8px !important;overflow:hidden !important;width:600px !important}td.t25,td.t35,td.t45,td.t56,td.t66,td.t76{width:600px !important}
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
<!--[if !mso]><!--><td class="t15" style="width:138px;padding:0 15px 0 0;">
<!--<![endif]-->
<!--[if mso]><td class="t15" style="width:153px;padding:0 15px 0 0;"><![endif]-->
<div style="font-size:0px;"><img class="t21" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="138" height="37.6875" alt="" src="https://drive.google.com/thumbnail?id=1A-WuiaOpfKXcAqZjIVZVNH0VEkzWMxI2&sz=w1000"/></div></td>
</tr></table>
</td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:42px;line-height:42px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t55" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t56" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t56" style="width:480px;"><![endif]-->
<h3 class="t62" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Dear ${UserName}</h3></td>
</tr></table>
</td></tr><tr><td>
<table class="t24" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t25" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t25" style="width:480px;"><![endif]-->
<h1 class="t31" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:25px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:5px;">You Are Added As Homly Admin</h1></td>
</tr></table>
</td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t34" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t35" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t35" style="width:480px;"><![endif]-->
<p class="t41" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Congratulations! Your admin account setup is complete. You can now log in and start managing your account. If you have any questions or need assistance, feel free to contact our support team.</p></td>
</tr></table>
</td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t65" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t66" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t66" style="width:480px;"><![endif]-->
<h3 class="t72" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Your AdminNo : ${AdminNo}</h3></td>
</tr></table>
</td></tr><tr><td>
<table class="t75" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t76" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t76" style="width:480px;"><![endif]-->
<h3 class="t82" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Your Password : ${Password}</h3></td>
</tr></table>
</td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t44" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t45" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t45" style="width:480px;"><![endif]-->
<p class="t51" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><a class="t52" href="${loginurl}" style="margin:0;Margin:0;font-weight:400;font-style:normal;text-decoration:none;direction:ltr;color:#3381F6;mso-line-height-rule:exactly;" target="_blank"> Click here to Login</a></p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
</html>
        `
      };

    

    transporter.sendMail(mailOptions, function (error: any, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // console.log("sucess added");

    res.status(200).json({ message: "User added successfully" });

  } catch (error) {
    
    
    
      console.log(`error is ${error}`);
      res.status(500).json({ message: "Internal Server Error!" });
    
  }
}

export const getall=async (req: Request, res: Response) => {
  const admins = await AppDataSource.manager.find(LocationAdmin);
  try {
    const admins = await AppDataSource.manager.find(LocationAdmin);
    res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
}


export const disableadmin =async (req: Request, res: Response) => {
  const id = req.params.id;
 
 

  try {
    await AppDataSource.manager.update(
      LocationAdmin,
      { AdminNo: id },
      { Disabled: true }
    );

    res.status(200).json({ message: "disable sucessful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mes: "Internal Server Error" });
  }
}


export const editadmindeatails =async (req: Request, res: Response) => {
  const AdminNo=req.body.AdminNo;
  const Email=req.body.Email
  const ContactNo=req.body.ContactNo
  console.log(AdminNo,ContactNo,Email)
  
 
 try {
    await AppDataSource.manager.update(
      LocationAdmin,
      { AdminNo: AdminNo },
      { Email:Email,ContactNo:ContactNo},
      
      
    );

    res.status(200).json({ message: "update sucessful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mes: "Internal Server Error" });
  }
}


export const sendMail=async (req: Request, res: Response) => {
  
  const {UserName,Email,AdminNo}=req.body
  console.log(Email)

  
  
  const str =uuid()
  const arrypw=str.split('-')
  
  const Password=arrypw[arrypw.length-1]
  const loginurl="google.com"
 

  try {
    

      var mailOptions = {
        from: "mnbro123321@gmail.com",
        to: Email,
        subject: "You Are Added as Location Admin in Homly",
        html: `<!--
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
        [style*="Lato"] {font-family: 'Lato', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
        @media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t3,.t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.t25,.t35,.t45,.t56,.t66{width:600px!important}}
        </style>
        <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3,.moz-text-html .t4{mso-line-height-alt:60px!important;line-height:60px!important;display:block!important}.moz-text-html .t9{border-radius:8px!important;overflow:hidden!important;padding:60px!important}.moz-text-html .t11{padding:60px!important;border-radius:8px!important;overflow:hidden!important;width:480px!important}.moz-text-html .t25,.moz-text-html .t35,.moz-text-html .t45,.moz-text-html .t56,.moz-text-html .t66{width:600px!important}</style>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;800&amp;family=Lato:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <style type="text/css">
        img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3,div.t4{mso-line-height-alt:60px !important;line-height:60px !important;display:block !important}td.t9{border-radius:8px !important;overflow:hidden !important;padding:60px !important}td.t11{padding:60px !important;border-radius:8px !important;overflow:hidden !important;width:600px !important}td.t25,td.t35,td.t45,td.t56,td.t66{width:600px !important}
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
        <!--[if !mso]><!--><td class="t15" style="width:138px;padding:0 15px 0 0;">
        <!--<![endif]-->
        <!--[if mso]><td class="t15" style="width:153px;padding:0 15px 0 0;"><![endif]-->
        <div style="font-size:0px;"><img class="t21" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="138" height="37.6875" alt="" src="https://drive.google.com/thumbnail?id=1A-WuiaOpfKXcAqZjIVZVNH0VEkzWMxI2&sz=w1000"/></div></td>
        </tr></table>
        </td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:42px;line-height:42px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t55" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]><!--><td class="t56" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t56" style="width:480px;"><![endif]-->
        <h3 class="t62" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Dear ${UserName}</h3></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t24" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]><!--><td class="t25" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t25" style="width:480px;"><![endif]-->
        <h1 class="t31" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:25px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:5px;">New Genarated Password</h1></td>
        </tr></table>
        </td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t34" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]><!--><td class="t35" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t35" style="width:480px;"><![endif]-->
        <p class="t41" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">  We&#39;ve generated a new password for your account to ensure its security. Please find your new password below</p></td>
        </tr></table>
        </td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t65" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]><!--><td class="t66" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t66" style="width:480px;"><![endif]-->
        <h3 class="t72" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Lato';line-height:26px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Your Password : ${Password}</h3></td>
        </tr></table>
        </td></tr><tr><td><div class="t42" style="mso-line-height-rule:exactly;mso-line-height-alt:35px;line-height:35px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t44" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]><!--><td class="t45" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t45" style="width:480px;"><![endif]-->
        <p class="t51" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><a class="t52" href="${loginurl}" style="margin:0;Margin:0;font-weight:400;font-style:normal;text-decoration:none;direction:ltr;color:#3381F6;mso-line-height-rule:exactly;" target="_blank"> Click here to Login</a></p></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr><tr><td><div class="t4" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
        </html>`
      };

    

    transporter.sendMail(mailOptions, function (error: any, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // console.log("sucess added");

    res.status(200).json({ message: "mail send sucessfull" });

  } catch (error) {
    
    
    
      console.log(`error is ${error}`);
      res.status(500).json({ message: "mailsend error!" });
    
  }

  try {
    await AppDataSource.manager.update(
      LocationAdmin,
      { AdminNo: AdminNo },
      { Verified: false }
    );

  
  } catch (error) {
    console.error(error);
   
  }
}


export { router };
