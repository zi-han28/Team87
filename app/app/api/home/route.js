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

// Handle POST request to toggle like
export async function POST(req) {
    try {
        const { post_id, action } = await req.json();  // Get post_id & action (like/unlike)
        const db = await openDb();

        // Increase or decrease like count based on action
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE Post SET like_amount = like_amount ${action === 'like' ? '+ 1' : '- 1'} WHERE post_id = ? AND like_amount > 0`,
                [post_id],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        return NextResponse.json({ message: `Post ${action}d successfully!` });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}