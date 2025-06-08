import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Welcome to the Register API",
    status: true,
  });
}

export async function POST(req) {
  try {
    const { name, email, role, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("studenthub");
    const permission = "r--";

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Check if the user already exists
    const existingUser = await db
      .collection("registrationInfo")
      .findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Add a new student
    const result = await db
      .collection("registrationInfo")
      .insertOne({ name, email, role, permission, password: hashedPassword });
    return NextResponse.json(
      { id: result.insertedId, name, email, role, permission },
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
