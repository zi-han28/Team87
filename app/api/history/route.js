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

// Handle GET request to `/api/history`
export async function GET(request) {
    try {
        const db = await openDb();

        // Extract the username from the query parameters
        const { searchParams } = new URL(request.url);
        const user_username = searchParams.get('user_username');

        if (!user_username) {
            return NextResponse.json({ error: "user_username is required" }, { status: 400 });
        }

        // Fetch posts liked by the user
        const posts = await new Promise((resolve, reject) => {
            db.all(
                `SELECT p.post_id, p.post_content, p.user_username, p.share_amount, p.view_amount, p.like_amount, p.post_savedindatabase, l.liked_at 
                 FROM Post p
                 JOIN Likes l ON p.post_id = l.post_id
                 WHERE l.user_username = ?
                 ORDER BY l.liked_at DESC`,
                [user_username],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        // Fetch the 3 earliest comments for each post
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
