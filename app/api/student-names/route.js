import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

    const client = await clientPromise;
    const db = client.db("studenthub"); // Replace with your database name

    // Retrieve all student names
    const students = await db
      .collection("students")
      .find({}, { projection: { name: 1, _id: 0 } })
      .toArray();
    // console.log(students);
    return NextResponse.json(students);
  } catch(error) {
    console.error("Error occurred while processing the request:", error);
    return NextResponse.json(
      { error: "Invalid authentication token or Invalid ID format" },
      { status: 401 }
    );
  }
}
