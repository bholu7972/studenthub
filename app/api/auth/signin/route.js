import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";

export async function GET() {
  return NextResponse.json({
    message: "Welcome to the login API",
    status: true,
  });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("studenthub");

    const user = await db.collection("registrationInfo").findOne({
      email: String(email),
    });

    const validateUser = async (user, password) => {
      // Assuming you have a function to compare hashed passwords
      return user && (await bcrypt.compare(password, user.password));
    };

    if (user && (await validateUser(user, password))) {
      // Generate token
      const token = await new SignJWT({
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

      // Create response with cookies
      const response = NextResponse.json(
        {
          message: "Login successful",
          user: {
            email: user.email,
            role: user.role,
          },
        },
        {
          status: 200,
        }
      );

      // Set cookies
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 2, // 2 hours
      });
      response.cookies.set({
        name: "id",
        value: user._id,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 2, // 2 hours
      });
      response.cookies.set({
        name: "role",
        value: user.role,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 2, // 2 hours
      });

      return response;
    } else {
      console.log("Invalid credentials");
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/auth/signin:", error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
