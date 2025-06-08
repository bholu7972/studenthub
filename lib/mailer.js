import nodemailer from "nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";

export default async function sendLocalMail({ email }) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter once and reuse
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Generate a more secure OTP (using crypto.randomBytes instead of randomInt)
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP for StudentHub Verification",
      html: `
        <h2>StudentHub Verification</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>It is valid for 5 minutes.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>Note: Never share your OTP with anyone.</p>
      `,
      text: `Your OTP is ${otp}. It is valid for 5 minutes. Never share your OTP with anyone.`,
    };

    await transporter.sendMail(mailOptions);

    // Don't send OTP back in response for security
    return NextResponse.json(
      { message: "OTP sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // Add more specific error handling
    console.error("Email sending error:", error);
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? "Failed to send OTP email" 
      : error.message;
    
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
