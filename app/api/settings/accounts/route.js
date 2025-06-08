import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.error("Authentication token is required.");
    return NextResponse.json(
      { error: "Authentication token is required" },
      {
        status: 401,
      }
    );
  }
  try {
    // Verify the token (you can skip this if already verified in middleware)
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    if (!payload) {
      console.error("JWT payload is missing.");
      return NextResponse.json(
        { error: "Invalid JWT: Payload is missing." },
        { status: 401 }
      );
    }

    // If verification is successful, return student data
    const client = await clientPromise;
    const db = client.db("studenthub"); // Replace with your database name
    // Retrieve all admins
    const admins = await db
      .collection("registrationInfo")
      .find({
        // role: { $in: ["admin", "temp-admin"] },
      })
      .toArray();
    return NextResponse.json(admins);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid authentication token" });
  }
}

export async function POST(req) {
  try {
    const { name, email, role, permission, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("studenthub");

    // Basic validation
    if (!name || !email || !role || !permission || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingAdmin = await db
      .collection("registrationInfo")
      .findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 400 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new admin
    const result = await db.collection("registrationInfo").insertOne({
      name,
      email,
      role,
      permission,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json(
      {
        id: result.insertedId,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database insertion error:", error);
    return NextResponse.json(
      { error: "Failed to register. Please try again later." },
      { status: 500 }
    );
  }
}
