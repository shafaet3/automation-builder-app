import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  const info = await transporter.sendMail({
    from: `"Automation Flow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log(`📧 Email sent to ${to}`);
  console.log("Message ID:", info.messageId);

  // Gmail does not give preview link like Ethereal
  return `https://mail.google.com/mail/u/0/#search/rfc822msgid:${info.messageId}`;
}
