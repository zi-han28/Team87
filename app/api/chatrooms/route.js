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

export async function GET() {
  // open database
  const db = await openDb();
  // fetch chatroom menu details
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM chatrooms')
      .then((rows) => {
        resolve(NextResponse.json(rows));
      })
      .catch((err) => {
        reject(NextResponse.json({ error: 'Failed to fetch chatrooms' }, { status: 500 }));
      });
  });
}
