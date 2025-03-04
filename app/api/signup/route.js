import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs";
import path from "path";

// Function to open the SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.db"),//point to root folder
    driver: sqlite3.Database,
  });
}

// Handle POST requests to sign up api
export async function POST(req) {
  try {

    const { email, username, password } = await req.json();
    // open database
    const db = await openDb();

    // Check if user already exists
    const existingUser = await db.get(
      `SELECT * FROM User WHERE user_email = ? OR user_username = ?`,
      [email, username]
    );
    // If user already exists
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.run(
      `INSERT INTO User (user_email, user_username, user_password) VALUES (?, ?, ?)`,
      [email, username, hashedPassword]
    );

    return NextResponse.json({message: "User created succesfully"} ,{status: 201});
  } catch (error) {
    return NextResponse.json({status: 500});
  }
}
