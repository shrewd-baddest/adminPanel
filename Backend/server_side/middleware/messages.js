import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const x=nodemailer.createTransport({
    service:process.env.MAIL_SERVICE,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    } 
});
export const sendEmail=async(to,subject,text)=>{
    const mailOptions={
        from:process.env.FROM_EMAIL,
        to,
        subject,
        text
    };

    try {
        await x.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};


const client = twilio(accountSid, authToken); 

export const sendSMS=async function createMessage(body,to) {
  const message = await client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });

  console.log(message.body);
}
