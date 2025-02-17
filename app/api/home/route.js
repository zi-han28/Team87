import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to open SQLite database
async function openDb() {
    return open({
        filename: process.cwd() + '/lib/database.db',  // Ensure correct path
        driver: sqlite3.Database
    });
}

// Handle GET request to `/api/home`
export async function GET() {
    try {
        const db = await openDb();
        // Fetch only important data for the homepage (e.g., recent posts)
        const posts = await db.all(`SELECT id, title, text, likes FROM posts LIMIT 3`);

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
}
