import OpenAI from "openai";
import sqlite3 from "sqlite3";

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to open SQLite database
async function openDb() {
    return new sqlite3.Database(process.cwd() + '/database.db', (err) => {
        if (err) {
            console.error("Database connection error:", err);
        } else {
            console.log("Connected to SQLite database");
        }
    });
}

// Named export for `POST` request (REQUIRED for Next.js API)
export async function POST(req) {
    return new Promise((resolve) => {
        try {
            req.json().then(async ({ query }) => {
                if (!query || query.trim() === "") {
                    return resolve(new Response(JSON.stringify({ error: "Query is required" }), { status: 400 }));
                }

                const db = await openDb();
                console.log("Searching for:", query);

                // Fetch matching posts
                db.all(
                    "SELECT post_id, post_content, user_username FROM Post WHERE post_content LIKE ? ORDER BY post_id DESC LIMIT 5",
                    [`%${query}%`],
                    async (err, posts) => {
                        if (err) {
                            console.error("SQLite Error:", err);
                            return resolve(new Response(JSON.stringify({ error: "Database error" }), { status: 500 })); 
                        }

                        console.log("Matched Posts:", posts);

                        let messages = [{ role: "user", content: query }];

                        if (posts.length > 0) {
                            // Format post content for AI
                            const postContent = posts
                                .map(post => `User: ${post.user_username}\nPost: ${post.post_content}`)
                                .join("\n\n");

                            console.log("Sending to OpenAI with post context:", postContent);

                            messages.unshift({ role: "system", content: `Use these posts as context:\n${postContent}` });
                        } else {
                            console.log("No relevant posts found. Asking OpenAI without context.");
                        }

                        try {
                            const response = await openai.chat.completions.create({
                                model: "gpt-4o-mini",
                                messages
                            });

                            console.log("OpenAI Response:", response);

                            return resolve(new Response(JSON.stringify({ 
                                answer: response.choices[0].message.content, 
                                posts 
                            }), {
                                status: 200,
                                headers: { "Content-Type": "application/json" }
                            }));

                        } catch (aiError) {
                            console.error("OpenAI API Error:", aiError);
                            return resolve(new Response(JSON.stringify({ error: "AI Processing Error" }), { status: 500 }));
                        }
                    }
                );
            });

        } catch (error) {
            console.error("RAG API Error:", error);
            return resolve(new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 }));
        }
    });
}
