import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: `"Automation Flow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });

  console.log("📧 Email sent:", info.messageId);
}
