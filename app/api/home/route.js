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
export async function GET(req) {
    try {
        const db = await openDb();
        const posts = await new Promise((resolve, reject) => {
            db.all(`SELECT post_id, post_content, share_amount, view_amount, like_amount, user_username, post_savedindatabase 
                FROM Post ORDER BY post_id DESC LIMIT 5`, 
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

// Handle POST request to toggle like or save
export async function POST(req) {
    try {
        const { post_id, action, user_username } = await req.json();  // Get post_id & action (like/unlike or save/unsave)
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
       // console.log(`Current post_savedindatabase value for post_id ${post_id}:`, currentPost?.post_savedindatabase);

        if (action === 'like' || action === 'unlike') {
            // Handle like/unlike
            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE Post 
                     SET like_amount = like_amount ${action === 'like' ? '+ 1' : '- 1'} 
                     WHERE post_id = ? AND like_amount >= 0`,
                    [post_id],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            return NextResponse.json({ message: `Post ${action}d successfully!` });
        } else if (action === 'save' || action === 'unsave') {
            //console.log(`Updating post_savedindatabase for post_id: ${post_id}`);
            // Handle save/unsave
            //const newValue = action === 'save' ? 1 : 0;
            const currentValue = currentPost?.post_savedindatabase ?? 0; // Default to 0 if null
            console.log(`Current post_savedindatabase value for post_id ${post_id}:`, currentValue);

            const newValue = currentValue === 1 ? 0 : 1; // Toggle value

            console.log(`Updating post_savedindatabase to ${newValue} for post_id: ${post_id}`);

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
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
    }
    
}

// // Handle POST request to toggle like
// export async function POST(req) {
//     try {
//         const { post_id, action } = await req.json();  // Get post_id & action (like/unlike)
//         const db = await openDb();

//         // Increase or decrease like count based on action
//         await new Promise((resolve, reject) => {
//             db.run(
//                 `UPDATE Post SET like_amount = like_amount ${action === 'like' ? '+ 1' : '- 1'} WHERE post_id = ? AND like_amount > 0`,
//                 [post_id],
//                 function (err) {
//                     if (err) reject(err);
//                     else resolve();
//                 }
//             );
//         });

//         return NextResponse.json({ message: `Post ${action}d successfully!` });
//     } catch (error) {
//         console.error("Database error:", error);
//         return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
//     }
// }