import nodemailer from "nodemailer";
import { user_Email, user_Password } from "../../../config/config.service.js";

export async function sendEmail({
  to = "",
  subject = "",
  text = "",
  html = "",
  attachments = [],
  cc = "",
  bcc = "",
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user_Email,
      pass: user_Password,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"company" <${user_Email}>`, // sender address
      to, // list of recipients
      subject, // subject line
      text, // plain text body
      html, // HTML body
      attachments,
      cc,
      bcc,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

export const emailSubject = {
  confirmEmail: "confirm your email",
  resetPassword: "reset your password",
  welcome: "welcome to our platform",
  contactUs: "contact us",
};
