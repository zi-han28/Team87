import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from "path";

function openDb() {
    const dbPath = path.join(process.cwd(), 'database.db');
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("Database connection error:", err);
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}


// Handle GET request to `/api/home`
export async function GET(req) {
    try {
        const db = await openDb();
        const posts = await new Promise((resolve, reject) => {
            db.all(`SELECT post_id, post_content, share_amount, view_amount, like_amount, user_username, post_savedindatabase 
                FROM Post ORDER BY post_id 
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

// Handle POST request to toggle like or save
export async function POST(req) {
    const { post_id, action, user_username, comment_text } = await req.json();  // Get post_id & action (like/unlike or save/unsave)
    try {
        
        const db = await openDb();

        console.log(`Received action: ${action} for post_id: ${post_id}`);
        // Fetch the current value before updating
        const currentPost = await new Promise((resolve, reject) => {
            db.get(`SELECT post_savedindatabase FROM Post WHERE post_id = ?`, [post_id], (err, row) => {
                if (err) {
                    console.error("Error fetching post_savedindatabase:", err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
       
        if (action === "like") {
            // Insert a new like into the Likes table
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO Likes (user_username, post_id) VALUES (?, ?)`,
                    [user_username, post_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Increment the like_amount in the Post table
            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE Post SET like_amount = like_amount + 1 WHERE post_id = ?`,
                    [post_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            return NextResponse.json({ message: "Post liked successfully!" });
        } else if (action === "unlike") {
            // Remove the like from the Likes table
            await new Promise((resolve, reject) => {
                db.run(
                    `DELETE FROM Likes WHERE user_username = ? AND post_id = ?`,
                    [user_username, post_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Decrement the like_amount in the Post table
            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE Post SET like_amount = like_amount - 1 WHERE post_id = ?`,
                    [post_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            return NextResponse.json({ message: "Post unliked successfully!" });
        } else if (action === 'save' || action === 'unsave') {
            const currentValue = currentPost?.post_savedindatabase ?? 0; // Default to 0 if null
            console.log(`Current post_savedindatabase value for post_id ${post_id}:`, currentValue);

            const newValue = currentValue === 1 ? 0 : 1; // Toggle value

            console.log(`Updating post_savedindatabase to ${newValue} for post_id: ${post_id}`);
            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE Post 
                     SET post_savedindatabase = ? 
                     WHERE post_id = ?`,
                    [newValue, post_id],
                    function (err) {
                        if (err) {
                            console.error("Database update error:", err);
                            reject(err);
                        } else {
                            console.log(`Post ${post_id} saved status updated to ${action === 'save' ? 1 : 0}`);
                            resolve();
                        }
                    }
                );
            });

            const updatedPost = await new Promise((resolve, reject) => {
                db.get(`SELECT post_savedindatabase FROM Post WHERE post_id = ?`, [post_id], (err, row) => {
                    if (err) {
                        console.error("Error fetching updated post_savedindatabase:", err);
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });

            console.log(`Updated post_savedindatabase value for post_id ${post_id}:`, updatedPost?.post_savedindatabase);

            return NextResponse.json({ message: `Post ${action}d successfully!` });
        
        } else if (action === 'addComment') {
            // Add a new comment
            if (!comment_text) {
                return NextResponse.json({ error: "comment_text is required" }, { status: 400 });
            }

            // Insert the new comment and return the created comment object
    const newComment = await new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO comments (post_id, user_username, comment_text) VALUES (?, ?, ?)`,
            [post_id, user_username, comment_text],
            function (err) {
                if (err) reject(err);
                else {
                    // Fetch the newly created comment using `this.lastID`
                    db.get(
                        `SELECT * FROM comments WHERE comment_id = ?`,
                        [this.lastID],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                }
            }
        );
    });

    return NextResponse.json(newComment); // Return the newly created comment
        } else if (action === 'fetchComments') {
            // Fetch all comments for a specific post
            const comments = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC`,
                    [post_id],
                    function (err, rows) {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            return NextResponse.json(comments);

        }
        
        else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    
}