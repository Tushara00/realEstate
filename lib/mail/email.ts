// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // your Gmail
    pass: process.env.SMTP_PASS, // App password
  },
});

export async function sendEmailVerification(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <p>Hello!</p>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
}

export async function sendPasswordReset(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Hello!</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}