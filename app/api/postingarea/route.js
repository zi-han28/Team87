import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

// Function to open the SQLite database
async function openDb() {
    return new sqlite3.Database(process.cwd() + './database.db', (err) => {
        if (err) {
            console.error("Database connection error:", err);
        }
    });
}

// Handle GET request to `/api/home`
export async function GET(req) {
    try {
        const db = await openDb();
        const posts = await new Promise((resolve, reject) => {
            db.all(`SELECT post_id, post_content, share_amount, view_amount, like_amount, user_username, post_savedindatabase 
                FROM Post ORDER BY post_id DESC LIMIT 5`, 
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}

// **POST: Add a new post**
export async function POST(req) {
  try {
    const { post_content, user_username } = await req.json();
    if (!post_content || !user_username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await openDb();
    await db.run(
      "INSERT INTO Post (post_content, user_username, share_amount, view_amount, like_amount, post_savedindatabase) VALUES (?, ?, 0, 0, 0, 0)",
      [post_content, user_username]
    );

    return NextResponse.json({ success: true, message: "Post added successfully" });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}

// Handle POST request to `/api/posts/add`
// export async function POST(req) {
//     const { title, content, user_username } = await req.json();

//     try {
//         const db = await openDb();
//         const result = await new Promise((resolve, reject) => {
//             db.run(
//                 `INSERT INTO Post (post_content, user_username, title, like_amount, share_amount, view_amount, post_savedindatabase)
//                  VALUES (?, ?, ?, 0, 0, 0, 0)`,
//                 [content, user_username, title],
//                 function (err) {
//                     if (err) reject(err);
//                     else resolve(this.lastID); // Return the ID of the newly inserted post
//                 }
//             );
//         });

//         // Fetch the newly added post
//         const newPost = await new Promise((resolve, reject) => {
//             db.get(
//                 `SELECT * FROM Post WHERE post_id = ?`,
//                 [result],
//                 (err, row) => {
//                     if (err) reject(err);
//                     else resolve(row);
//                 }
//             );
//         });

//         return NextResponse.json(newPost);
//     } catch (error) {
//         console.error("Error adding post:", error);
//         return NextResponse.json({ error: "Failed to add post", details: error.message }, { status: 500 });
//     }
// }