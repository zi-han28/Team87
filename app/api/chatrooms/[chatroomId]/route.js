// app/api/chatrooms/[chatroomId]/route.js
import { NextResponse } from 'next/server';
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs";
import path from "path";


// Open SQLite database
async function openDb() {
    return open({
      filename: path.join(process.cwd(), "database.db"), // to point to root folder
      driver: sqlite3.Database,
    });
  }
export async function GET(request, { params }) {
  // fetch the appropriate chatroomId details
  const { chatroomId } = await params;
  // open database
  const db = await openDb();
// fetch the appropriate chatroom details
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM chatrooms WHERE id = ?', [chatroomId])
      .then((row) => {
        if (row) {
          resolve(NextResponse.json(row));
        } else {
          reject(NextResponse.json({ error: 'Chatroom not found' }, { status: 404 }));
        }
      })
      .catch((err) => {
        reject(NextResponse.json({ error: 'Failed to fetch chatroom' }, { status: 500 }));
      });
  });
}