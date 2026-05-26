import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is missing" }), { status: 401 });
    }

    // Lấy key đầu tiên nếu có nhiều key
    const keys = apiKey.split(',').map(k => k.trim()).filter(Boolean);
    const activeKey = keys[0];

    const aiModel = createGoogleGenerativeAI({ apiKey: activeKey })('gemini-2.5-flash');

    const result = await generateText({
      model: aiModel,
      system: "Bạn là một biên dịch viên Tiếng Anh - Tiếng Việt chuyên nghiệp. Hãy dịch câu Tiếng Anh sau sang Tiếng Việt một cách tự nhiên và chính xác nhất. CHỈ trả về kết quả dịch, không giải thích gì thêm.",
      prompt: text,
    });

    return new Response(JSON.stringify({ translation: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Translate API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to translate text" }), { status: 500 });
  }
}
