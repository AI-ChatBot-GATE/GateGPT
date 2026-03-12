const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

const solvePyq = async (req, res) => {
    const { question, imageUrl } = req.body;

    try {
        // Prepare prompt
        const prompt = question
            ? `You are an expert GATE Exam solver. Provide a detailed, step-by-step solution to the following question. Use LaTeX for math. Here is the question: ${question}`
            : 'Please solve the question in the image provided with step-by-step reasoning. Use LaTeX for math.';

        // In a real app with image support, you'd handle the image part here
        // For now, focusing on text-based solving or image prompt
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const solution = response.text();

        res.json({ solution });
    } catch (error) {
        console.error("Gemini Error (solvePyq):", error);
        res.status(500).json({ message: error.message });
    }
};

const getRevisionNotes = async (req, res) => {
    const { subject, topic } = req.body;

    try {
        const prompt = `Generate concise, high-yield revision notes for the GATE Exam topic: ${subject} - ${topic}. 
        Include:
        1. Key Concepts
        2. Important Formulas (using LaTeX)
        3. Common Pitfalls/Tips
        4. A 1-sentence summary.
        Format accurately for a student preparing for GATE.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const notes = response.text();

        res.json({ notes });
    } catch (error) {
        console.error("Gemini Error (getRevisionNotes):", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { solvePyq, getRevisionNotes };
