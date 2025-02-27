import OpenAI from "openai";
import sqlite3 from "sqlite3";

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to open SQLite database
function openDb() {
    return new sqlite3.Database(process.cwd() + "/database.db", (err) => {
        if (err) {
            console.error("❌ Database connection error:", err);
        }
    });
}

// Function to search for relevant posts
async function searchPosts(query) {
    return new Promise((resolve, reject) => {
        const db = openDb();
        db.all(
            "SELECT post_id, post_content, user_username FROM Post WHERE post_content LIKE ? ORDER BY post_id DESC LIMIT 1",
            [`%${query}%`],
            (err, rows) => {
                if (err) {
                    console.error("❌ SQLite Error:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

// Function to fetch OpenAI response
async function fetchChatGPTResponse(userQuery, post = null) {
    try {
        let messages = [{ role: "user", content: userQuery }];

        // If a matching post is found, include it as context
        if (post) {
            const postContext = `User: ${post.user_username}\nPost: ${post.post_content}`;
            messages.unshift({ role: "system", content: `Use this post to help answer the question:\n${postContext}` });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        return "I couldn't process your request due to an API error.";
    }
}

// API Route for RAG Search
export async function POST(req, res) {
    try {
        const { query } = await req.json();

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Query is required" });
        }

        console.log("🔍 Searching for:", query);

        // Search for a matching post
        const posts = await searchPosts(query);
        const matchedPost = posts.length > 0 ? posts[0] : null;

        // Get OpenAI response (with or without post context)
        const aiResponse = await fetchChatGPTResponse(query, matchedPost);

        return res.status(200).json({ answer: aiResponse, matchedPost });

    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
