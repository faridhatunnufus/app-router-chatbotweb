import { NextResponse } from "next/server";
import { getVectorStore } from "@/lib/rag";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const vectorStore = await getVectorStore();

    // --- FASE 5: RETRIEVAL ---
    const results = await vectorStore.similaritySearchWithScore(message, 2);
    const context = results.map(([doc]) => doc.pageContent).join("\n");

    // --- FASE 6: AUGMENTATION (Penggabungan) ---
    // Di sini kita tampilkan output nyata yang dikirim ke AI
    const prompt = `
  Anda adalah Customer Service resmi Griya Sinau Syahir yang ramah, profesional, dan solutif.
  
  TUGAS ANDA:
  Ubah DATA REFERENSI di bawah ini menjadi jawaban yang mengalir alami (Human-like). 
  JANGAN gunakan format daftar (list) atau simbol bintang (**) yang berlebihan seperti di data mentah.
  
  FORMAT JAWABAN:
  1. Mulailah dengan sapaan hangat.
  2. Berikan jawaban singkat dan padat di kalimat awal.
  3. Berikan penjelasan lebih detail dalam bentuk PARAGRAF yang nyaman dibaca, bisa poin jika perlu, dan jeda kalimat atau paragraf agar tidak terkesan berantakan.
  4. Akhiri dengan tawaran bantuan atau ajakan untuk bertanya lagi.

  ATURAN KETAT:
  1. Jawablah HANYA berdasarkan DATA REFERENSI yang diberikan.
  2. Jika informasi tidak ada di DATA REFERENSI, katakan: "Maaf, informasi tersebut belum tersedia."
  3. DILARANG KERAS berasumsi atau mengarang informasi berdasarkan nama lembaga (Contoh: Jangan berasumsi pendiri bernama Syahir hanya karena nama lembaganya Griya Sinau Syahir).
  
  DATA REFERENSI:
  ${context}

  PERTANYAAN PENGGUNA: 
  ${message}

  JAWABAN:
`;

    console.log("\n--- HASIL OUTPUT FASE AUGMENTATION ---");
    console.log(prompt);
    console.log("---------------------------------------\n");

    // --- FASE 7: GENERATION ---
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    // Pastikan nama model benar. Jika 'gemini-3.1-pro' tidak tersedia,
    // gunakan 'gemini-1.5-pro' yang merupakan versi paling stabil.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("--- HASIL FASE GENERATION: SUCCESS ---");
    return NextResponse.json({ answer: responseText });
  } catch (error: any) {
    // INI PENTING: Menampilkan eror asli dari Google di terminal
    console.error("\n--- ❌ ERROR DI FASE GENERATION ❌ ---");
    console.error("Pesan Eror:", error.message || error);
    console.log("---------------------------------------\n");

    return NextResponse.json(
      { answer: "Maaf, sistem AI sedang mengalami gangguan koneksi." },
      { status: 500 },
    );
  }
}
