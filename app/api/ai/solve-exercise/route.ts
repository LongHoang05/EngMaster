import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { checkRateLimit } from '@/lib/rateLimit';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = checkRateLimit(ip, 15, 60000); 
    
    if (!rateLimitResult.success) {
      return new Response(JSON.stringify({ error: "Too many requests. Vui lòng chậm lại." }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      });
    }

    const { transcript, exerciseFormat } = await req.json();

    if (!transcript || !exerciseFormat) {
      return new Response(JSON.stringify({ error: "Transcript and exerciseFormat are required" }), { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is missing" }), { status: 401 });
    }

    const keys = apiKey.split(',').map(k => k.trim()).filter(Boolean);
    const activeKey = keys[0];

    const aiModel = createGoogleGenerativeAI({ apiKey: activeKey })('gemini-2.5-flash');

    // Thay thế các chỗ trống (ví dụ: ____1____, -----2-----, (3)) thành [BLANK_X] để AI không bị nhầm lẫn với số câu hỏi.
    const blankRegex = /([-_]{2,}|\(|\[)\s*(\d+)\s*([-_]{2,}|\)|\])/g;
    const processedExercise = exerciseFormat.replace(blankRegex, '[BLANK_$2]');

    const prompt = `Bạn là một trợ lý giải bài tập Tiếng Anh siêu việt.
Nhiệm vụ của bạn là dựa vào nội dung văn bản (Transcript) sau đây để tìm ra CÁC TỪ CẦN ĐIỀN vào các chỗ trống (blanks) trong Đề bài (Exercise). 
CHÚ Ý: Đề bài đã được xử lý để các ô trống hiện lên dưới dạng [BLANK_X], trong đó X là ID của ô trống.

=== YÊU CẦU CỰC KỲ QUAN TRỌNG ===
1. Đầu tiên, liệt kê TẤT CẢ các đáp án cần điền theo đúng thứ tự xuất hiện của các chỗ trống. Dùng định dạng:
[DANH SÁCH ĐÁP ÁN]
BLANK_1: từ_cần_điền_1
BLANK_2: từ_cần_điền_2

LƯU Ý CỐT LÕI CHO DANH SÁCH:
- CHỈ in ra DUY NHẤT các từ/cụm từ nằm ngay tại vị trí ô trống.
- ĐÂY LÀ LỖI RẤT NẶNG NẾU BẠN VI PHẠM: TUYỆT ĐỐI KHÔNG in ra cả câu hỏi hay cả đoạn văn.
- VÍ DỤ SAI: BLANK_1: Shouldn't we contact the supplier we used last year?
- VÍ DỤ ĐÚNG: BLANK_1: Shouldn't
- VÍ DỤ SAI: BLANK_2: From January 1st to March 13th.
- VÍ DỤ ĐÚNG: BLANK_2: March
- KHÔNG tự ý đánh số lại từ 1, 2, 3. Phải dùng đúng định dạng BLANK_X (Ví dụ: BLANK_106).

2. Sau đó, trả về nguyên văn toàn bộ đề bài nhưng đã điền từ vào chỗ trống [BLANK_X]. Bôi đậm (dùng **từ điền**) các từ được điền.

=== TRANSCRIPT ===
${transcript}

=== ĐỀ BÀI (EXERCISE) ===
${processedExercise}
`;

    let result = null;
    let lastError = null;

    for (let i = 0; i < keys.length; i++) {
      try {
        const aiModel = createGoogleGenerativeAI({ apiKey: keys[i] })('gemini-2.5-flash');
        result = await generateText({
          model: aiModel,
          system: "Bạn là một trợ lý AI thông minh chuyên giải bài tập Listening TOEIC bằng cách dựa vào nội dung đoạn hội thoại.",
          prompt: prompt,
        });
        break; // Thành công thì thoát
      } catch (error: any) {
        console.warn(`[solve-exercise] API Key index ${i} failed:`, error.message);
        lastError = error;
        
        // Nếu lỗi do hết Quota hoặc High Demand, thử tiếp Key khác (nếu có)
        const msg = error.message.toLowerCase();
        const isQuotaError = msg.includes("quota") || msg.includes("high demand") || msg.includes("429") || msg.includes("rate limit");
        
        if (isQuotaError && i < keys.length - 1) {
          console.log(`Hết quota ở Key ${i}, tự động chuyển sang API Key tiếp theo...`);
          continue;
        }
        break; // Lỗi khác thì văng ra luôn
      }
    }

    if (!result) {
      throw lastError || new Error("Failed to generate text");
    }

    return new Response(JSON.stringify({ solvedExercise: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Solve Exercise API Error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to solve exercise", 
      details: error.message || error.toString() 
    }), { status: 500 });
  }
}
