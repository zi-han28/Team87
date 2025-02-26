import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to process RAG query using posts as context
export async function queryRAGModel(userQuery, posts) {
    try {
        // Format posts into readable context for AI
        const postContent = posts
            .map(post => `User: ${post.user_username}\nPost: ${post.post_content}`)
            .join("\n\n");

        console.log("📤 Sending to OpenAI:", postContent); // Log for debugging

        const messages = [
            { role: "system", content: "Use these posts to answer the user's question." },
            { role: "user", content: `Context:\n${postContent}\n\nUser Question: ${userQuery}` }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages
        });

        console.log("🤖 OpenAI Response:", response); // Debug response

        return response.choices[0].message.content;
    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        return "Error retrieving response from OpenAI.";
    }
}
