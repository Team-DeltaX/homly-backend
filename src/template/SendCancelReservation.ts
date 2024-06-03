const SendCancelReservationEmail = (employeeName: string, holidayHome: string, reservationNumber: string, checkinDate: Date, reason: string) => {
    return (
        `<!--
        * This email was built using Tabular.
        * For more information, visit https://tabular.email
        -->
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
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
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
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
        @media (min-width: 481px) {
        h1,img,p{margin:0;Margin:0}img,p{font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t60{width:560px!important}.t10,.t15,.t21,.t26,.t30,.t35,.t38,.t5,.t53,.t58{width:600px!important}.t55{padding-top:30px!important;width:500px!important}
        }
        </style>
        <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t60{width:560px!important}.moz-text-html .t10,.moz-text-html .t15,.moz-text-html .t21,.moz-text-html .t26,.moz-text-html .t30,.moz-text-html .t35,.moz-text-html .t38,.moz-text-html .t5,.moz-text-html .t58{width:600px!important}.moz-text-html .t55{padding-top:30px!important;width:500px!important}.moz-text-html .t53{width:600px!important}</style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,900&amp;family=Lato:ital,wght@0,400;1,700;1,900&amp;family=Fira+Sans:wght@500&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <style type="text/css">
        img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}td.t10,td.t15,td.t21,td.t26,td.t30,td.t35,td.t38,td.t5,td.t58,td.t60{width:600px !important}td.t55{padding-top:30px !important;width:600px !important}td.t53{width:600px !important}
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
        <body id="body" class="t64" style="min-width:100%;Margin:0px;padding:0px;background-color:#ffffff;"><div class="t63" style="background-color:#ffffff;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t62" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#ffffff;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#ffffff"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td>
        <table class="t61" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t60" style="width:440px;padding:20px 20px 20px 20px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t60" style="width:480px;padding:20px 20px 20px 20px;"><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <table class="t6" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t5" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t5" style="width:480px;"><![endif]-->
        <div class="t4" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
        <!--[if mso]>
        <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="219"><tr><td width="219" valign="top"><![endif]-->
        <div class="t3" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:219px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t2"><tr>
        <td class="t1" style="padding:0 27px 0 0;"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="192" height="52.5" alt="" src="https://tabular.b-cdn.net/u/abe243ea-6269-4ce2-bc92-a29cf514a8f4/644f3355-23a4-4b5d-9c37-acf590679d2e.png"/></div></td>
        </tr></table>
        </div>
        <!--[if mso]>
        </td>
        </tr></table>
        <![endif]-->
        </div></td>
        </tr></table>
        </td></tr><tr><td><div class="t57" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t59" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t58" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t58" style="width:480px;"><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><div class="t9" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t11" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t10" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t10" style="width:480px;"><![endif]-->
        <h1 class="t8" style="margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:700;font-style:normal;font-size:19px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:5px;">Cancellation of Reservation: <span class="t7" style="margin:0;Margin:0;font-weight:900;font-style:italic;mso-line-height-rule:exactly;">${reservationNumber}</span></h1></td>
        </tr></table>
        </td></tr><tr><td><div class="t12" style="mso-line-height-rule:exactly;mso-line-height-alt:26px;line-height:26px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:9px;line-height:9px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t22" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t21" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t21" style="width:480px;"><![endif]-->
        <p class="t20" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">We regret to inform you that we have had to cancel your reservation with us, scheduled for <span class="t18" style="margin:0;Margin:0;font-weight:900;font-style:italic;mso-line-height-rule:exactly;">${checkinDate}</span>, at<span class="t19" style="margin:0;Margin:0;font-weight:900;font-style:italic;mso-line-height-rule:exactly;"> ${holidayHome}</span>. We understand this may cause inconvenience, and we sincerely apologize for any disruption to your plans.  </p></td>
        </tr></table>
        </td></tr><tr><td><div class="t23" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t27" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t26" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t26" style="width:480px;"><![endif]-->
        <p class="t25" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Reason for this cancellation: <span class="t24" style="margin:0;Margin:0;font-weight:900;font-style:italic;mso-line-height-rule:exactly;">${reason}</span>.  </p></td>
        </tr></table>
        </td></tr><tr><td><div class="t28" style="mso-line-height-rule:exactly;mso-line-height-alt:7px;line-height:7px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
        <table class="t31" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t30" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t30" style="width:480px;"><![endif]-->
        <p class="t29" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">We kindly ask you to acknowledge this email and confirm your understanding of the cancellation. Should you have any questions or require further assistance, please do not hesitate to contact us.</p></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t13" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t12" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t12" style="width:480px;"><![endif]-->
        <p class="t11" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t10" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Your Service number</span></p></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t15" style="width:480px;padding:0 0 22px 0;">
        <!--<![endif]-->
        <!--[if mso]><td class="t15" style="width:480px;padding:0 0 22px 0;"><![endif]-->
        <p class="t14" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${employeeName}</p></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t36" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t35" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t35" style="width:480px;"><![endif]-->
        <p class="t34" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If you pay this reservation already please contact <span class="t32" style="margin:0;Margin:0;font-weight:700;font-style:italic;mso-line-height-rule:exactly;">Welfare Department of INOVA IT &quot;  </span><span class="t33" style="margin:0;Margin:0;font-weight:400;font-style:normal;mso-line-height-rule:exactly;">for the refund process</span></p></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t39" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t38" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t38" style="width:480px;"><![endif]-->
        <p class="t37" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Once again, we apologize for any inconvenience this may cause and appreciate your understanding in this matter.</p></td>
        </tr></table>
        </td></tr><tr><td>
        <table class="t56" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t55" style="background-color:#FFFFFF;width:380px;padding:20px 50px 30px 50px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t55" style="background-color:#FFFFFF;width:480px;padding:20px 50px 30px 50px;"><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
        <table class="t54" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
        <!--[if !mso]>--><td class="t53" style="width:480px;">
        <!--<![endif]-->
        <!--[if mso]><td class="t53" style="width:480px;"><![endif]-->
        <div class="t52" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
        <!--[if mso]>
        <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="212"><tr><td class="t41" style="width:3px;" width="3"></td><td width="80" valign="top"><![endif]-->
        <div class="t45" style="display:inline-table;text-align:initial;vertical-align:inherit;width:40.56604%;max-width:86px;"><div class="t44" style="padding:0 3px 0 3px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t43"><tr>
        <td class="t42" style="overflow:hidden;background-color:#f3f3f3;text-align:center;line-height:20px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:5px 0 5px 0;border-radius:8px 8px 8px 8px;"><span class="t40" style="display:block;margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:20px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;direction:ltr;color:#CCCCCC;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Unsubscribe</span></td>
        </tr></table>
        </div></div>
        <!--[if mso]>
        </td><td class="t41" style="width:3px;" width="3"></td><td class="t47" style="width:3px;" width="3"></td><td width="120" valign="top"><![endif]-->
        <div class="t51" style="display:inline-table;text-align:initial;vertical-align:inherit;width:59.43396%;max-width:126px;"><div class="t50" style="padding:0 3px 0 3px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t49"><tr>
        <td class="t48" style="overflow:hidden;background-color:#f3f3f3;text-align:center;line-height:20px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:5px 0 5px 0;border-radius:8px 8px 8px 8px;"><span class="t46" style="display:block;margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:20px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;direction:ltr;color:#CCCCCC;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Manage Preferences</span></td>
        </tr></table>
        </div></div>
        <!--[if mso]>
        </td><td class="t47" style="width:3px;" width="3"></td>
        </tr></table>
        <![endif]-->
        </div></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td>
        </tr></table>
        </td></tr></table></td></tr></table></div></body>
        </html>`
    )
};
export default SendCancelReservationEmail;
