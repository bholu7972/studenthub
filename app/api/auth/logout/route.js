import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Welcome to the API", status: true });
}

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" });

    // Clear the token by setting an expired cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // Set to a past date to expire the cookie
    });
    response.cookies.set({
      name: "role",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // Set to a past date to expire the cookie
    });
    response.cookies.set({
      name: "id",
      value: "",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // Set to a past date to expire the cookie
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}
