import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from "path";

// Function to open the SQLite database
async function openDb() {
    const dbPath = path.join(process.cwd(), 'database.db');
    return new sqlite3.Database(dbPath, (err) => {
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
            db.all(`SELECT post_id, post_content, share_amount, view_amount, like_amount, user_username, post_savedindatabase,  timestamp FROM Post 
                WHERE post_savedindatabase = 1 
                ORDER BY post_id 
                DESC LIMIT 5`, 
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await new Promise((resolve, reject) => {
                    db.all(
                        `SELECT * FROM comments 
                         WHERE post_id = ? 
                         ORDER BY created_at DESC`,
                        [post.post_id],
                        (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        }
                    );
                });
                return { ...post, comments }; // Add comments to the post object
            })
        );
        return NextResponse.json(postsWithComments);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}

// Handle POST request to `/api/posts/save`
export async function POST(req) {
    const { post_id, action } = await req.json(); // action: "save" or "unsave"

    try {
        const db = await openDb();
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE Post 
                 SET post_savedindatabase = ? 
                 WHERE post_id = ?`,
                [action === "save" ? 1 : 0, post_id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        return NextResponse.json({ message: `Post ${action === "save" ? "saved" : "unsaved"} successfully!` });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}