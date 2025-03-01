import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs";
import path from "path";

// Open SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.db"),//to point to root folder
    driver: sqlite3.Database,
  });
}

// Handle POST requests to /api/login
export async function POST(req) {
  try {
    // fetch the appropriate email and password data
    const { email, password } = await req.json();
    // open database
    const db = await openDb();
    // Find user by email
    const user = await db.get("SELECT * FROM User WHERE user_email = ?", [email]);
    // If user does not exist
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 400 }
      );
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.user_password);
    // if passwords do not match
    if (!isMatch) {
      return NextResponse.json({status: 400 });
    }

    // set an HTTP-only cookie with the user ID
    const response = NextResponse.json(
      { message:"Login successful",
        user: {
        user_id: user.user_id,
        user_username: user.user_username,
        user_email: user.user_email,
      },},
      { status: 200 }
    );
    response.cookies.set("user_id", user.user_id, {
      httpOnly: true, // Prevent access from JavaScript
      path: "/", // Available across all routes
      maxAge: 60 * 60 * 24 * 7, // 1 week time limit
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ status: 500});
  }
}
