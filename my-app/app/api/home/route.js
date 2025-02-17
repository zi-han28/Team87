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
export async function GET() {
    try {
        const db = await openDb();
        const posts = await new Promise((resolve, reject) => {
            db.all(`SELECT post_id, post_content, like_amount, user_username FROM Post ORDER BY post_id DESC LIMIT 5`, 
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
