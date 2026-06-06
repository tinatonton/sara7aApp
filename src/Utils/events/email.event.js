import { EventEmitter } from "node:events";
import { emailSubject, sendEmail } from "../email/email.utils.js";
import { template } from "../email/generateHtml.js";
export const emailEvent = new EventEmitter();

emailEvent.on("confirmEmail", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.confirmEmail,
    html: template(data.otp, data.firstName, emailSubject.confirmEmail),
  }).catch((err) => {
    console.log("Error while sending mail:", err);
  });
});

emailEvent.on("forgetPassword", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.resetPassword,
    html: template(data.otp, data.firstName, emailSubject.resetPassword),
  }).catch((err) => {
    console.log("Error while sending reset password :", err);
  });
});
