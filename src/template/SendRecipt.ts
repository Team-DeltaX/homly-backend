const SendReciptEmail = (employeeName: string, holidayHome: string, reservationNumber: any, checkinDate: Date, checkoutDate: Date, maxAdults: string, maxChildren: string, rooms: string, halls: string, roomPrice: string, hallPrice: string, TotalPrice: string) => {
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
img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
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
h1,img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;text-align:center}img,p{line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;mso-line-height-rule:exactly;mso-text-raise:2px}h1{line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;mso-line-height-rule:exactly;mso-text-raise:1px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t136{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.t137{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.t134{width:250px!important}.t5{padding-bottom:15px!important;width:600px!important}.t4{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.t184{padding:48px 50px!important;width:500px!important}.t103,.t116,.t12,.t130,.t140,.t15,.t176,.t182,.t19,.t22,.t26,.t30,.t34,.t37,.t67,.t79,.t8,.t92{width:600px!important}.t173{padding-bottom:44px!important;width:800px!important}.t2{padding-bottom:23px!important;width:130px!important}.t53{width:792px!important}.t42{padding-left:24px!important}.t127{width:592px!important}.t77{max-width:640px!important}.t100{width:561px!important}.t108,.t59,.t84{max-width:600px!important}.t125{width:540px!important}
}
</style>
<style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t136{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.moz-text-html .t137{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.moz-text-html .t134{width:250px!important}.moz-text-html .t5{padding-bottom:15px!important;width:600px!important}.moz-text-html .t4{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.moz-text-html .t184{padding:48px 50px!important;width:500px!important}.moz-text-html .t140{width:600px!important}.moz-text-html .t173{padding-bottom:44px!important;width:800px!important}.moz-text-html .t176,.moz-text-html .t182{width:600px!important}.moz-text-html .t2{padding-bottom:23px!important;width:130px!important}.moz-text-html .t12,.moz-text-html .t130,.moz-text-html .t15,.moz-text-html .t19,.moz-text-html .t22,.moz-text-html .t30,.moz-text-html .t34,.moz-text-html .t37,.moz-text-html .t8{width:600px!important}.moz-text-html .t53{width:792px!important}.moz-text-html .t42{padding-left:24px!important}.moz-text-html .t26{width:600px!important}.moz-text-html .t127{width:592px!important}.moz-text-html .t103,.moz-text-html .t79{width:600px!important}.moz-text-html .t77{max-width:640px!important}.moz-text-html .t100{width:561px!important}.moz-text-html .t59{max-width:600px!important}.moz-text-html .t67{width:600px!important}.moz-text-html .t84{max-width:600px!important}.moz-text-html .t92{width:600px!important}.moz-text-html .t125{width:540px!important}.moz-text-html .t108{max-width:600px!important}.moz-text-html .t116{width:600px!important}</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700;800&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t136{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t137{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important;width:600px !important}td.t134{width:250px !important}td.t5{padding-bottom:15px !important;width:600px !important}h1.t4{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important}td.t184{padding:48px 50px !important;width:600px !important}td.t140{width:600px !important}td.t173{padding-bottom:44px !important;width:800px !important}td.t176,td.t182{width:600px !important}td.t2{padding-bottom:23px !important;width:130px !important}td.t12,td.t130,td.t15,td.t19,td.t22,td.t30,td.t34,td.t37,td.t8{width:600px !important}td.t53{width:800px !important}td.t42{padding-left:24px !important}td.t26{width:600px !important}td.t127{width:592px !important}td.t103,td.t79{width:600px !important}div.t77{max-width:640px !important}td.t100{width:576px !important}div.t59{max-width:600px !important}td.t67{width:600px !important}div.t84{max-width:600px !important}td.t92{width:600px !important}td.t125{width:570px !important}div.t108{max-width:600px !important}td.t116{width:600px !important}
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
<body id="body" class="t188" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t187" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t186" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#242424"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t136" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
<table class="t138" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t137" style="background-color:#F8F8F8;width:420px;padding:0 30px 40px 30px;">
<!--<![endif]-->
<!--[if mso]><td class="t137" style="background-color:#F8F8F8;width:480px;padding:0 30px 40px 30px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><div class="t1" style="mso-line-height-rule:exactly;mso-line-height-alt:26px;line-height:26px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t3" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
<!--[if !mso]>--><td class="t2" style="width:80px;padding:0 0 50px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t2" style="width:80px;padding:0 0 50px 0;"><![endif]-->
<div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="130" height="35.546875" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/0b910546-52d8-4254-8ff6-c065d1d7f6e0.png"/></div></td>
</tr></table>
</td></tr><tr><td>
<table class="t6" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t5" style="width:480px;padding:0 0 20px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t5" style="width:480px;padding:0 0 20px 0;"><![endif]-->
<h1 class="t4" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:800;font-style:normal;font-size:26px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">${employeeName}, Thank you for your booking.</h1></td>
</tr></table>
</td></tr><tr><td>
<table class="t9" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t8" style="width:480px;padding:0 0 22px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t8" style="width:480px;padding:0 0 22px 0;"><![endif]-->
<p class="t7" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Thank you very much for choosing to book your holiday home with us at ${holidayHome}. We are delighted to be hosting you and look forward to ensuring your stay is comfortable and enjoyable.  Please find all the details regarding your booking below:</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t13" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t12" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t12" style="width:480px;"><![endif]-->
<p class="t11" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t10" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Reservation number</span></p></td>
</tr></table>
</td></tr><tr><td>
<table class="t16" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t15" style="width:480px;padding:0 0 22px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t15" style="width:480px;padding:0 0 22px 0;"><![endif]-->
<p class="t14" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${reservationNumber}</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t20" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t19" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t19" style="width:480px;"><![endif]-->
<p class="t18" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t17" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Holiday Home</span></p></td>
</tr></table>
</td></tr><tr><td>
<table class="t23" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t22" style="width:480px;padding:0 0 22px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t22" style="width:480px;padding:0 0 22px 0;"><![endif]-->
<p class="t21" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${holidayHome}</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t27" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t26" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t26" style="width:480px;"><![endif]-->
<p class="t25" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t24" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Checkin Date     :   ${checkinDate}</span></p></td>
</tr></table>
</td></tr><tr><td>
<table class="t31" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t30" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t30" style="width:480px;"><![endif]-->
<p class="t29" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t28" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Checkout Date :  ${checkoutDate}</span></p></td>
</tr></table>
</td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:8px;line-height:8px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t35" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t34" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t34" style="width:480px;"><![endif]-->
<p class="t32" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Maximum Adults      : ${maxAdults}</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t38" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t37" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t37" style="width:480px;"><![endif]-->
<p class="t36" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Maximum Children : ${maxChildren}</p></td>
</tr></table>
</td></tr><tr><td><div class="t39" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t54" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t53" style="background-color:#FFFFFF;width:472px;padding:16px 4px 16px 4px;">
<!--<![endif]-->
<!--[if mso]><td class="t53" style="background-color:#FFFFFF;width:480px;padding:16px 4px 16px 4px;"><![endif]-->
<div class="t52" style="display:inline-table;width:100%;text-align:left;vertical-align:middle;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="middle" width="492"><tr><td class="t41" style="width:10px;" width="10"></td><td width="266.40606" valign="middle"><![endif]-->
<div class="t45" style="display:inline-table;text-align:initial;vertical-align:inherit;width:58.42857%;max-width:409px;"><div class="t44" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t43"><tr>
<td class="t42"><h1 class="t40" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Room Codes : ${rooms}</h1></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t41" style="width:10px;" width="10"></td><td class="t47" style="width:10px;" width="10"></td><td width="185.59394" valign="middle"><![endif]-->
<div class="t51" style="display:inline-table;text-align:initial;vertical-align:inherit;width:41.57143%;max-width:291px;"><div class="t50" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t49"><tr>
<td class="t48"><p class="t46" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Hall Codes : ${halls}</p></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t47" style="width:10px;" width="10"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr><tr><td><div class="t55" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t128" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t127" style="width:480px;padding:7px 0 7px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t127" style="width:480px;padding:7px 0 7px 0;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t80" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t79" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t79" style="width:480px;"><![endif]-->
<div class="t78" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="500"><tr><td width="500" valign="top"><![endif]-->
<div class="t77" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t76"><tr>
<td class="t75" style="background-color:#FFFFFF;padding:20px 15px 20px 15px;"><div class="t74" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="470"><tr><td class="t61" style="width:5px;" width="5"></td><td width="225" valign="top"><![endif]-->
<div class="t65" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t64" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t63"><tr>
<td class="t62"><div class="t60" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="225"><tr><td width="225" valign="top"><![endif]-->
<div class="t59" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t58"><tr>
<td class="t57"><p class="t56" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Total Room Price</p></td>
</tr></table>
</div>
<!--[if mso]>
</td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t61" style="width:5px;" width="5"></td><td class="t69" style="width:5px;" width="5"></td><td width="225" valign="top"><![endif]-->
<div class="t73" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t72" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t71"><tr>
<td class="t70"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t68" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t67" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t67" style="width:480px;"><![endif]-->
<p class="t66" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">LKR. ${roomPrice}</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t69" style="width:5px;" width="5"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</div>
<!--[if mso]>
</td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr><tr><td><div class="t102" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t104" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t103" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t103" style="width:480px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t101" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t100" style="background-color:#FFFFFF;width:465px;padding:20px 15px 20px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t100" style="background-color:#FFFFFF;width:480px;padding:20px 15px 20px 0;"><![endif]-->
<div class="t99" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="485"><tr><td class="t86" style="width:5px;" width="5"></td><td width="232.5" valign="top"><![endif]-->
<div class="t90" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t89" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t88"><tr>
<td class="t87"><div class="t85" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="232.5"><tr><td width="232.5" valign="top"><![endif]-->
<div class="t84" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t83"><tr>
<td class="t82"><p class="t81" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Total Hall Price</p></td>
</tr></table>
</div>
<!--[if mso]>
</td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t86" style="width:5px;" width="5"></td><td class="t94" style="width:5px;" width="5"></td><td width="232.5" valign="top"><![endif]-->
<div class="t98" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t97" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t96"><tr>
<td class="t95"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t93" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t92" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t92" style="width:480px;"><![endif]-->
<p class="t91" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">LKR. ${hallPrice}</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t94" style="width:5px;" width="5"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t124" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t126" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t125" style="background-color:#F0E9E9;width:450px;padding:20px 15px 20px 15px;">
<!--<![endif]-->
<!--[if mso]><td class="t125" style="background-color:#F0E9E9;width:480px;padding:20px 15px 20px 15px;"><![endif]-->
<div class="t123" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="470"><tr><td class="t110" style="width:5px;" width="5"></td><td width="225" valign="top"><![endif]-->
<div class="t114" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t113" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t112"><tr>
<td class="t111"><div class="t109" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="225"><tr><td width="225" valign="top"><![endif]-->
<div class="t108" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t107"><tr>
<td class="t106"><p class="t105" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#0F0F0F;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Total Price</p></td>
</tr></table>
</div>
<!--[if mso]>
</td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t110" style="width:5px;" width="5"></td><td class="t118" style="width:5px;" width="5"></td><td width="225" valign="top"><![endif]-->
<div class="t122" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:310px;"><div class="t121" style="padding:0 5px 0 5px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t120"><tr>
<td class="t119"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t117" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t116" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t116" style="width:480px;"><![endif]-->
<p class="t115" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#171717;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">LKR. ${TotalPrice}</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t118" style="width:5px;" width="5"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td>
<table class="t131" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t130" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t130" style="width:480px;"><![endif]-->
<p class="t129" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Note that you have to pay for the full bill before 48 hours to the Checkin Date.<br/>﻿You can pay with and credit or Debit card.</p></td>
</tr></table>
</td></tr><tr><td><div class="t132" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t135" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
<!--[if !mso]>--><td class="t134" style="background-color:#181818;overflow:hidden;width:353px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:44px 44px 44px 44px;">
<!--<![endif]-->
<!--[if mso]><td class="t134" style="background-color:#181818;overflow:hidden;width:353px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:44px 44px 44px 44px;"><![endif]-->
<span class="t133" style="display:block;margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:44px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2.4px;direction:ltr;color:#F8F8F8;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;">Pay Now</span></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td>
<table class="t185" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t184" style="background-color:#242424;width:420px;padding:40px 30px 40px 30px;">
<!--<![endif]-->
<!--[if mso]><td class="t184" style="background-color:#242424;width:480px;padding:40px 30px 40px 30px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t141" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t140" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t140" style="width:480px;"><![endif]-->
<p class="t139" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Want updates through more platforms?</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t174" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t173" style="width:480px;padding:10px 0 36px 0;">
<!--<![endif]-->
<!--[if mso]><td class="t173" style="width:480px;padding:10px 0 36px 0;"><![endif]-->
<div class="t172" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="220"><tr><td class="t143" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
<div class="t147" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t146" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t145"><tr>
<td class="t144"><div style="font-size:0px;"><img class="t142" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/ca4029b7-e4a4-45d2-a20c-f7de912c2a88.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t143" style="width:10px;" width="10"></td><td class="t149" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
<div class="t153" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t152" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t151"><tr>
<td class="t150"><div style="font-size:0px;"><img class="t148" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/04981c2d-d0d6-45c7-8b01-3755aa8b7dde.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t149" style="width:10px;" width="10"></td><td class="t155" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
<div class="t159" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t158" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t157"><tr>
<td class="t156"><div style="font-size:0px;"><img class="t154" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/916207f0-a1d6-4a72-b1e2-60586703f18c.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t155" style="width:10px;" width="10"></td><td class="t161" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
<div class="t165" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t164" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t163"><tr>
<td class="t162"><div style="font-size:0px;"><img class="t160" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/65ccbe66-2772-4b5d-8371-b18695efeb04.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t161" style="width:10px;" width="10"></td><td class="t167" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
<div class="t171" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t170" style="padding:0 10px 0 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t169"><tr>
<td class="t168"><div style="font-size:0px;"><img class="t166" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://8402358a-096f-4511-a12e-1080b6349deb.b-cdn.net/e/6dbfbfec-c156-4a06-b016-f37abfe4a01f/d1680b74-2776-4802-ad96-696e1baf573b.png"/></div></td>
</tr></table>
</div></div>
<!--[if mso]>
</td><td class="t167" style="width:10px;" width="10"></td>
</tr></table>
<![endif]-->
</div></td>
</tr></table>
</td></tr><tr><td>
<table class="t177" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t176" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t176" style="width:480px;"><![endif]-->
<p class="t175" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">4019 Waterview Lane, Santa Fe, NM, New Mexico 87500</p></td>
</tr></table>
</td></tr><tr><td>
<table class="t183" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]>--><td class="t182" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t182" style="width:480px;"><![endif]-->
<p class="t181" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;"><a class="t178" href="https://tabular.email" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;" target="_blank">Unsubscribe</a>  •  <a class="t179" href="https://tabular.email" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;" target="_blank">Privacy policy</a>  •  <a class="t180" href="https://tabular.email" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#878787;mso-line-height-rule:exactly;" target="_blank">Contact us</a></p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td></tr></table></div></body>
</html>`
    )
};
export default SendReciptEmail;