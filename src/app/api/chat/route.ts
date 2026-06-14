import { NextResponse } from "next/server";
import { getVectorStore } from "@/lib/rag";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const vectorStore = await getVectorStore();

    console.log("\n===========================================");
    console.log("   FASE EMBEDDING PERTANYAAN Visitor      ");
    console.log("===========================================");
    console.log(`💬 Mengubah pertanyaan menjadi vektor: "${message}"`);

    const queryEmbeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    const queryVector = await queryEmbeddings.embedQuery(message);

    console.log(`✅ Pertanyaan berhasil diubah menjadi Vektor.`);
    console.log(`Dimensi Vektor Pertanyaan: ${queryVector.length} angka`);
    console.log("-------------------------------------------\n");

    // --- FASE 4: RETRIEVAL ---
    console.log("\n===========================================");
    console.log("      FASE RETRIEVAL (SEARCHING...)     ");
    console.log("===========================================");

    // Mencari 2 dokumen paling mirip beserta skornya
    const results = await vectorStore.similaritySearchVectorWithScore(
      queryVector,
      2,
    );

    console.log(`\nFound ${results.length} relevant chunks:`);
    results.forEach(([doc, score], index) => {
      console.log(`\n[RANK ${index + 1}]`);
      console.log(`📄 Content: "${doc.pageContent.substring(0, 100)}..."`);
      console.log(`🎯 Similarity Score: ${score.toFixed(4)}`);
      console.log("-------------------------------------------");
    });

    // =========================================================
    // 🔀 PERCABANGAN KONDISI: OUT OF CONTEXT DETECTION
    // =========================================================
    // Catatan: Pada MemoryVectorStore, semakin besar skor berarti jarak semakin jauh (tidak mirip).
    // Batas threshold 0.70 dapat disesuaikan kembali berdasarkan hasil uji coba akurasi Anda.
    const THRESHOLD_SCORE = 0.45;
    const isOutOfContext =
      results.length === 0 || results[0][1] > THRESHOLD_SCORE;

    if (isOutOfContext) {
      console.log(
        "⚠️ KONDISI: Pertanyaan di luar konteks (Out of Context) terdeteksi.",
      );
      return NextResponse.json({
        answer:
          "Maaf, informasi yang Anda tanyakan berada di luar lingkup bimbingan belajar Griya Sinau Syahir. Silakan ajukan pertanyaan seputar info bimbel seperti program kelas, fasilitas, biaya, atau alur pendaftaran kami.",
      });
    }

    const context = results.map(([doc]) => doc.pageContent).join("\n");
    console.log("✅ Context Berhasil Disusun untuk AI.");

    // --- FASE 5: AUGMENTATION (Penggabungan) ---
    const prompt = `
  Anda adalah Customer Service resmi Griya Sinau Syahir yang ramah, profesional, dan solutif.
  
  TUGAS ANDA:
  Ubah DATA REFERENSI di bawah ini menjadi jawaban yang mengalir alami (Human-like). 
  JANGAN gunakan format daftar (list) atau simbol bintang (**) yang berlebihan seperti di data mentah.
  
  FORMAT JAWABAN:
  1. Mulailah dengan sapaan hangat.
  2. Berikan jawaban singkat dan padat di kalimat awal.
  3. Berikan penjelasan lebih detail dalam bentuk PARAGRAF yang nyaman dibaca.
  4. Akhiri dengan tawaran bantuan atau ajakan untuk bertanya lagi.

  ATURAN KETAT:
  1. Jawablah HANYA berdasarkan DATA REFERENSI yang diberikan.
  2. DILARANG KERAS berasumsi atau mengarang informasi berdasarkan nama lembaga.

  DATA REFERENSI:
  ${context}

  PERTANYAAN PENGGUNA: 
  ${message}

  JAWABAN:
`;

    // --- FASE 6: GENERATION ---
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("--- HASIL FASE GENERATION: SUCCESS ---");
    return NextResponse.json({ answer: responseText });
  } catch (error: any) {
    // =========================================================
    // ❌ KONDISI: PENANGANAN API ERROR / INTERNAL SERVER ERROR
    // =========================================================
    console.error("\n--- ❌ ERROR DI FASE GENERATION ❌ ---");
    console.error("Pesan Eror:", error.message || error);
    console.log("---------------------------------------\n");

    return NextResponse.json(
      {
        answer:
          "Mohon maaf, sistem kami sedang mengalami kendala teknis dalam memproses data. Silakan coba kirimkan kembali pertanyaan Anda dalam beberapa saat.",
      },
      { status: 500 },
    );
  }
}
