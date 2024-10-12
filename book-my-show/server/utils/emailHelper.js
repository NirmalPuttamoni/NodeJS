const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { SENDGRID_APIKEY } = process.env;

function replaceContent(content, creds) {
  const allKeys = Object.keys(creds);
  allKeys.forEach((key) => {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    const content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from: "puttamoninirmal01@gmail.com",
      text: `Hi ${creds.name}, your otp is ${creds.otp}`,
      subject: templateName==="otp.html" ? "OTP Verification" : "Movie Booking",
      html: replaceContent(content, creds),
    };
    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: SENDGRID_APIKEY,
      },
    };
    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
    console.log("email sent");
  } catch (error) {
    console.error(error);
  }
}

module.exports = EmailHelper;