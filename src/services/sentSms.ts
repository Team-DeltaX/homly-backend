import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sentSms = (phone: string, message: string) => {

    if(phone.length < 10 || phone.length > 15) {
        console.log("Invalid phone number");
        return;
    }
    if(phone[0] === "0") {
        phone = "+94" + phone.slice(1);
    }else if(phone[0] === "9") {
        phone = "+" + phone;
    }

  client.messages
    .create({
      body: "hello, are you there?",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+94764112542",
    })
    .then((message) => console.log(message));
};

export default sentSms;