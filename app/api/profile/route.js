import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Open SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.db"),//point to root folder
    driver: sqlite3.Database,
  });
}
// Handle GET requests to profile api
export async function GET(req) {
  try {
    // Read the user_id from the request cookie
    const userId = req.cookies.get("user_id");
    // if userId does not exist
    if (!userId) {
      return NextResponse.json({status: 401});
    }
    // open database
    const db = await openDb();

    // Fetch user by ID
    const user = await db.get("SELECT user_username, user_email, user_introduction FROM User WHERE user_id = ?", [userId.value]);
    // if user does not exist
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    // fetch user activities
      const posts = await db.all('SELECT * FROM Post WHERE user_username = ?', [user.user_username]);
      const comments = await db.all('SELECT * FROM comments WHERE user_username = ?', [user.user_username]);
      const messages = await db.all('SELECT * FROM messages WHERE sender = ?', [user.user_username]);

    // Combine and sort activities by timestamp
      const activities = [
        // log post activities
        ...posts.map(post => ({ 
          ...post, 
          type: 'post', 
          timestamp: new Date().toISOString() // Add a timestamp as it is missing a timestamp column in post table
        })),
         // log comment activities
        ...comments.map(comment => ({ 
          ...comment, 
          type: 'comment', 
          timestamp: comment.created_at 
        })),
         // log messages activities
        ...messages.map(message => ({ 
          ...message, 
          type: 'message', 
          timestamp: message.timestamp 
        }))
      ].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));  //sort activities by timestamp

    return NextResponse.json({ user, activities },{ status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ message: "An error occurred. Please try again." },
      {status: 500});
  }
}

// Handle PUT request to update user_introduction
export async function PUT(req) {
  try {
    // Read the user_id from the request cookie
    const userId = req.cookies.get("user_id");
    // if user does not exist
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: No user logged in." }, { status: 401 });
    }
    // create user_introduction
    const { user_introduction } = await req.json();
    // have the user create and introduction
    if (!user_introduction) {
      return NextResponse.json({ message: "Introduction text is required." }, {status: 400});
    }
    // open database
    const db = await openDb();
    // Update the user_introduction field
    await db.run("UPDATE User SET user_introduction = ? WHERE user_id = ?", [user_introduction, userId.value]);
    return NextResponse.json({ status: 200});
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ status: 500 });
  }
}

