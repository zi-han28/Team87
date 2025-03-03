import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Open SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.db"), // to point to root folder
    driver: sqlite3.Database,
  });
}
// Handle GET requests to navbar api
export async function GET(req) {
  try {
    // Extract the user_id from the cookie
    const cookies = req.cookies.get("user_id");
    const userId = cookies ? cookies.value : null;

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated." },
        { status: 401 }
      );
    }
    // open data base
    const db = await openDb();

    // Fetch the user's username from the database
    const user = await db.get("SELECT user_username, user_email FROM User WHERE user_id = ?", [userId]);
    // If user does not exist
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    // Return the username in the dropdown menu
    return NextResponse.json(
      {user_username: user.user_username,
       user_email: user.user_email,
       },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
// Handle POST requests for signing out api
export async function POST() {
    try {
      // Create a response object
      const response =NextResponse.json(
        { status: 200 }
      );
      // Clear the user_id cookie
      response.cookies.set("user_id", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0, // Expire the cookie immediately
      });
      return response;
    } catch (error) {
      console.error("Sign out error:", error);
      return NextResponse.json({ status: 500});
    }
  }