import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, vocabContext, topicName } = await req.json();

    const systemPrompt = `Bạn là một gia sư Tiếng Anh thân thiện tên là "AI English Tutor". Nhiệm vụ của bạn là giúp người dùng luyện tập Tiếng Anh thông qua các tình huống nhập vai (role-play).
Người hiện đang học chủ đề từ vựng: "${topicName || 'Chung'}".
Danh sách từ vựng trong chủ đề này (hãy khéo léo khuyến khích người dùng sử dụng chúng):
${vocabContext || 'Không có từ vựng cụ thể nào.'}

Quy tắc giao tiếp:
1. GIAO TIẾP BÌNH THƯỜNG BẰNG TIẾNG VIỆT: Khi đang giải thích, chào hỏi, gợi ý kịch bản, hay nhận xét, hãy luôn dùng Tiếng Việt thân thiện.
2. SỬA LỖI NGỮ PHÁP (QUAN TRỌNG): Trược khi phản hồi tình huống, hãy quét tin nhắn tiếng Anh vừa rồi của người dùng. Nếu có lỗi ngữ pháp hoặc dùng từ không tự nhiên, BẮT BUỘC phải chỉ ra lỗi bằng Tiếng Việt (Ví dụ: "💡 Gợi ý: Bạn nên nói là '...' thay vì '...' để tự nhiên hơn nhé!"). Sau đó mới tiếp tục đóng vai.
3. CHỈ DÙNG TIẾNG ANH KHI ĐÓNG VAI (ROLE-PLAY): Khi người dùng bắt đầu tình huống nhập vai, bạn hãy hóa thân vào nhân vật và CHỈ dùng Tiếng Anh để tương tác lại.
4. NGẮN GỌN & TỰ NHIÊN: Giữ các câu thoại ngắn (1-3 câu) giống như chat thật. Không dài dòng.
5. KHEN NGỢI: Nếu người dùng dùng đúng từ vựng trong danh sách, hãy khen ngợi họ một cách tự nhiên.
6. GỢI Ý: Nếu người dùng không biết bắt đầu từ đâu, hãy gợi ý bằng Tiếng Việt một tình huống giao tiếp phù hợp với chủ đề từ vựng hiện tại.`;

    // Cấu hình danh sách các mô hình
    const aiConfigs: { provider: string, modelName: string, apiKey: string }[] = [];

    // Hàm phụ trợ để tự tách chuỗi (nếu có dấu phẩy) thành nhiều cấu hình con
    const addConfigs = (provider: string, modelName: string, keysString: string | undefined) => {
      if (!keysString) return;
      const keys = keysString.split(',').map(k => k.trim()).filter(Boolean);
      keys.forEach(apiKey => {
        aiConfigs.push({ provider, modelName, apiKey });
      });
    };

    // Chỉ dùng Google Generative AI (Gemini)
    addConfigs('google', 'gemini-2.5-flash', process.env.GOOGLE_GENERATIVE_AI_API_KEY);

    if (aiConfigs.length === 0) {
      return new Response("Hệ thống chưa được cấu hình GOOGLE_GENERATIVE_AI_API_KEY trong file .env.local", { status: 401 });
    }

    // Chọn ngẫu nhiên 1 model (quay vòng API Key của Google nếu có nhiều key)
    const randomConfig = aiConfigs[Math.floor(Math.random() * aiConfigs.length)];
    
    const aiModel = createGoogleGenerativeAI({ apiKey: randomConfig.apiKey })(randomConfig.modelName);

    // Gửi tín hiệu đến model
    const result = streamText({
      model: aiModel,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat" }), { status: 500 });
  }
}
