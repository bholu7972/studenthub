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

    // If verification is successful, return student data
    const client = await clientPromise;
    const db = client.db("studenthub"); // Replace with your database name
    // Retrieve all students
    const students = await db.collection("students").find({}).toArray();
    return NextResponse.json(students);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid authentication token" });
  }
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("studenthub"); // Replace with your database name

  // Read the request body as JSON
  const student = await req.json(); // Parse the incoming JSON data
  // Check if the student already exists based on email and schlor_no
  const existingStudent = await db.collection("students").findOne({
    $or: [
      { email_id: student.email_id },
      // { schlor_no: student.schlor_no } // Add additional checks as needed
    ],
  }); // Assuming email and schlor_no are unique
  if (existingStudent) {
    return NextResponse.json(
      { error: "Student already exists" },
      { status: 400 }
    );
  }

  // Get the last schlor_no
  try {
    const lastStudent = await db
      .collection("students")
      .find()
      .sort({ schlor_no: -1 })
      .limit(1)
      .toArray();
    const lastSchlorNo =
      lastStudent.length > 0 ? lastStudent[0].schlor_no : "0/0/0/0"; // Default value if no students exist
    const parts = lastSchlorNo.split("/"); // Split the schlor_no into parts
    const lastNumber = parseInt(parts[parts.length - 1], 10); // Get the last part as an integer
    parts[parts.length - 1] = (lastNumber + 1).toString(); // Increment the last part
    const newSchlorNo = parts.join("/"); // Join the parts back together

    // Add the new student with the generated schlor_no
    const newStudent = { ...student, schlor_no: newSchlorNo };
    await db.collection("students").insertOne(newStudent);
    return NextResponse.json(
      { message: "Student resistered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Adding student failed. Please try again.",
      status: 500,
    });
  }
}
