import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

// Function to open the SQLite database
async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

// Handle POST requests to /api/login
export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const db = await openDb();

        // Find user by email
        const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 400 });
        }

        return NextResponse.json({ message: "Login successful", user: { id: user.id, email: user.email, username: user.username } }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}
