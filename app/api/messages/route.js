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
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const chatroomId = searchParams.get('chatroomId');
  
    const db = await openDb();
  
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM messages WHERE chatroom_id = ? ORDER BY timestamp ASC', [chatroomId])
        .then((rows) => {
          resolve(NextResponse.json(rows));
        })
        .catch((err) => {
          reject(NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 }));
        });
    });
  }





// send message data function
export async function POST(request) {
    const { chatroomId, sender, message } = await request.json();
    const db = await openDb();
  
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO messages (chatroom_id, sender, message) VALUES (?, ?, ?)',
        [chatroomId, sender, message]
      )
        .then(() => {
          resolve(NextResponse.json({ message: 'Message sent' }, { status: 200 }));
        })
        .catch((err) => {
          reject(NextResponse.json({ error: 'Failed to send message' }, { status: 500 }));
        });
    });
  }

// Send message data function
// export async function POST(request) {
//     try {
//       const { chatroomId, userId, message } = await request.json();
  
//       if (!chatroomId || !userId || !message) {
//         return NextResponse.json(
//           { error: "Missing required fields" },
//           { status: 400 }
//         );
//       }
  
//       const db = await openDb();
  
//       // Insert the new message into the database
//       await db.run(
//         "INSERT INTO messages (chatroom_id, user_id, message) VALUES (?, ?, ?)",
//         [chatroomId, userId, message]
//       );
  
//       return NextResponse.json(
//         { message: "Message sent successfully" },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//       return NextResponse.json(
//         { error: "Failed to send message" },
//         { status: 500 }
//       );
//     }
//   }