import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = await params;

  const token = req.cookies.get("token")?.value;
  if (!token) {
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
      return NextResponse.json(
        { error: "Invalid token: Payload is missing or incomplete" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("studenthub"); // Your database name

    // Fetch user data by email
    const data = await db.collection("registrationInfo").findOne(
      { _id: new ObjectId(String(id)) },
      {
        projection: {
          // Explicitly select fields to return (exclude sensitive ones like password)
          name: 1,
          email: 1,
          role: 1,
          permission: 1,
        },
      }
    );

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data); // Return user data
  } catch (error) {
    console.error("Error in GET /api/user:", error);

    // Differentiate error types
    if (error.name === "JWTError") {
      return NextResponse.json(
        { error: "Invalid or expired authentication token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
