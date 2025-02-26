export function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        return res.status(200).json({ message: "Hello, this is a simple JSON response!" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
