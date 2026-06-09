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

    // 1. Panggil model embedding yang sama dengan yang digunakan pada file JSON
    const queryEmbeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    // 2. Lakukan embedding terhadap teks pertanyaan visitor
    const queryVector = await queryEmbeddings.embedQuery(message);

    console.log(`✅ Pertanyaan berhasil diubah menjadi Vektor.`);
    console.log(`Dimensi Vektor Pertanyaan: ${queryVector.length} angka`);
    console.log(`100 Angka Pertama Vektor:`, queryVector.slice(0, 100));
    console.log("-------------------------------------------\n");
    console.log(`... (dan ${queryVector.length - 100} angka lainnya) ...`);
    console.log("-------------------------------------------\n");

    // --- FASE 4: RETRIEVAL ---
    console.log("\n===========================================");
    console.log("      FASE 4: RETRIEVAL (SEARCHING...)     ");
    console.log("===========================================");
    console.log(`🔍 Pertanyaan User: "${message}"`);

    // Mencari 2 dokumen paling mirip beserta skornya
    const results = await vectorStore.similaritySearchWithScore(message, 2);

    console.log(`\nFound ${results.length} relevant chunks:`);

    results.forEach(([doc, score], index) => {
      console.log(`\n[RANK ${index + 1}]`);
      console.log(`📄 Content: "${doc.pageContent.substring(0, 150)}..."`);
      console.log(`🎯 Similarity Score: ${score.toFixed(4)}`);
      // Catatan: Semakin mendekati 0 biasanya semakin mirip (tergantung algoritma jarak/distance)
      console.log(`🗂️ Source: ${doc.metadata.source || "Unknown"}`);
      console.log("-------------------------------------------");
    });
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
  3. Berikan penjelasan lebih detail dalam bentuk PARAGRAF yang nyaman dibaca, bisa poin jika perlu, 
  dan jeda kalimat atau paragraf agar tidak terkesan berantakan.
  4. Akhiri dengan tawaran bantuan atau ajakan untuk bertanya lagi.

  ATURAN KETAT:
  1. Jawablah HANYA berdasarkan DATA REFERENSI yang diberikan.
  2. DILARANG KERAS berasumsi atau mengarang informasi berdasarkan nama lembaga.
  3. Tidak boleh ada tanda bintang atau karakter lain yang membuat jawaban menjadi ambigu.

  DATA REFERENSI:
  ${context}

  PERTANYAAN PENGGUNA: 
  ${message}

  JAWABAN:
  Ditampilkan di Chatbot
`;

    console.log("\n--- HASIL OUTPUT FASE AUGMENTATION ---");
    console.log(prompt);
    console.log("---------------------------------------\n");

    // --- FASE 6: GENERATION ---
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
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
      {
        answer:
          "Maaf, bisa ulangi pertanyaan Anda? Atau ada hal lain yang perlu didiskusikan?",
      },
      { status: 500 },
    );
  }
}
