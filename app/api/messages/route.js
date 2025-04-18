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

// Handle GET requests to messages api
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    // get the respective chatroomId
    const chatroomId = searchParams.get('chatroomId');

    // open database
    const db = await openDb();
  // fetch messages
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
    // fetch the appropriate data
    const { chatroomId, sender, message } = await request.json();
    // open database
    const db = await openDb();
    // send messages
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO messages (chatroom_id, sender, message) VALUES (?, ?, ?)',
        [chatroomId, sender, message]
      )
        .then(() => {
          resolve(NextResponse.json({ message: 'Message sent' }, { status: 200 }));
        })
        .catch((err) => {
          reject(NextResponse.json({ message:"Failed to send message. Try logging in before sending a message." }, { status: 500 }));
        });
    });
  }
