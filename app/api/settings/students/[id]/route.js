import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { jwtVerify } from "jose";

export async function GET(req, { params }) {
  const { id } = await params;
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

    const student = await db.collection("students").findOne({
      _id: new ObjectId(String(id)), // Convert id to string first
    });
    return NextResponse.json(student); // Return student data
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid authentication token or Invalid ID format" },
      { status: 401 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db("studenthub"); // Replace with your database name
  const body = await req.json(); // Get the entire request body

  try {
    await db
      .collection("students")
      .updateOne({ _id: new ObjectId(String(id)) }, { $set: body });
    return NextResponse.json(
      { message: "Student updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Updating student failed. Please try again.",
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db("studenthub"); // Replace with your database name

  // // Delete a student
  try {
    await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(String(id)) });
    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Deleting student failed. Please try again.",
      status: 500,
    });
  }
}
