import { NextResponse } from "next/server";
import { getVectorStore } from "@/lib/rag";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const vectorStore = await getVectorStore();

    // 1. RETRIEVAL: Similarity Search [cite: 161, 176]
    // Mencari 3 chunk paling relevan berdasarkan Cosine Similarity [cite: 185]
    const results = await vectorStore.similaritySearchWithScore(message, 3);

    // 2. DECISION NODE: Cek Relevansi [cite: 163]
    // Jika skor terlalu tinggi (jarak jauh), berarti data tidak ditemukan
    const isFound = results.length > 0 && results[0][1] < 0.6;

    if (!isFound) {
      return NextResponse.json({
        answer:
          "Maaf, informasi tersebut belum tersedia di database Griya Sinau Syahir. Silakan tanyakan hal lain terkait program atau biaya les.",
      });
    }

    // 3. GENERATION: Susun Prompt & Tanya Gemini [cite: 162, 186]
    const context = results.map(([doc]) => doc.pageContent).join("\n");
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Kamu adalah asisten virtual ramah dari Griya Sinau Syahir.
      Gunakan konteks di bawah ini untuk menjawab pertanyaan secara akurat.
      
      KONTEKS DATA:
      ${context}

      PERTANYAAN: ${message}
      
      Aturan Jawaban:
      - Jika ada di data, jawab dengan detail dan sopan.
      - Jika tidak ada di data, katakan tidak tahu dan arahkan ke kontak WhatsApp.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { answer: "Aduh, sepertinya ada gangguan teknis. Coba lagi ya!" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { getVectorStore } from "@/lib/rag";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
//   const { message } = await req.json();
//   const vectorStore = await getVectorStore();

//   // Similarity Search [cite: 161, 208]
//   // Menghitung kedekatan vektor menggunakan Cosine Similarity:
//   // similarity = (A . B) / (||A|| ||B||)
//   const searchResults = await vectorStore.similaritySearchWithScore(message, 3);

//   // Decision Node: "Chunk Relevan Ditemukan?"
//   const isFound = searchResults.length > 0 && searchResults[0][1] < 0.6;

//   if (!isFound) {
//     return NextResponse.json({
//       answer: "Maaf, informasi tersebut tidak tersedia pada data Griya Sinau Syahir."
//     });
//   }

//   // Susun Prompt & Kirim ke Gemini API [cite: 186]
//   const context = searchResults.map(([doc]) => doc.pageContent).join("\n");
//   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
//   const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro" });
//   const prompt = `Gunakan data ini untuk menjawab pertanyaan: \n${context}\n\nPertanyaan: ${message}`;
//   const result = await model.generateContent(prompt);

//   return NextResponse.json({ answer: result.response.text() });
// }
