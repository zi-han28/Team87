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

// Handle GET request to `/api/history`
export async function GET() {
    try {
        const db = await openDb();
        const posts = await new Promise((resolve, reject) => {
            db.all(
                `SELECT post_id, post_content, user_username, share_amount, view_amount, like_amount 
                 FROM Post 
                 WHERE like_amount > 0 
                 ORDER BY like_amount DESC`,
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}