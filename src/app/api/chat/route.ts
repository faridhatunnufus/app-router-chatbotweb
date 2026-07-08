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
    console.log(
      `🔢 Sample Vektor (100 angka pertama): [${queryVector
        .slice(0, 100)
        .map((n) => n.toFixed(6))
        .join(", ")}, ...]`,
    );
    console.log("-------------------------------------------\n");

    // --- FASE 4: RETRIEVAL ---
    console.log("\n===========================================");
    console.log("      FASE RETRIEVAL (SEARCHING...)     ");
    console.log("===========================================");

    // Mengambil 4 dokumen teratas (k diubah menjadi 4 agar data pendaftaran utuh)
    const results = await vectorStore.similaritySearchVectorWithScore(
      queryVector,
      3,
    );

    console.log(`\nFound ${results.length} relevant chunks:`);
    results.forEach(([doc, score], index) => {
      console.log(`\n[RANK ${index + 1}]`);
      console.log(`📄 Content: "${doc.pageContent.substring(0, 100)}..."`);
      console.log(`🎯 Similarity Score: ${score.toFixed(4)}`);
      console.log("-------------------------------------------");
    });

    const THRESHOLD_SCORE = 0.4; // Batas bawah aman

    const isDataEmpty = results.length === 0;
    const isOutOfContext = !isDataEmpty && results[0][1] < THRESHOLD_SCORE;

    if (isDataEmpty || isOutOfContext) {
      console.log("⚠️ KONDISI: Terdeteksi luar konteks atau data kosong.");
      return NextResponse.json({
        answer:
          "Maaf, informasi yang Anda tanyakan berada di luar lingkup bimbingan belajar Griya Sinau Syahir. Silakan ajukan pertanyaan seputar info bimbel.",
      });
    }

    const context = results.map(([doc]) => doc.pageContent).join("\n\n");
    console.log("✅ Context Berhasil Disusun untuk AI.");

    // =========================================================
    // 📚 LOG TERMINAL - FASE 5: AUGMENTATION (Penggabungan)
    // =========================================================
    console.log("\n===========================================");
    console.log("           FASE 5: AUGMENTATION            ");
    console.log("===========================================");
    console.log("📚 DATA REFERENSI (CONTEXT) YANG DIKIRIM KE AI:");
    console.log("-------------------------------------------");
    console.log(context);
    console.log("-------------------------------------------");
    console.log(`❓ PERTANYAAN PENGGUNA:\n${message}`);
    console.log("-------------------------------------------\n");

    const prompt = `
  Anda adalah Customer Service resmi Griya Sinau Syahir yang ramah, profesional, dan solutif.

  TUGAS ANDA:
  Ubah DATA REFERENSI di bawah ini menjadi jawaban yang rapi dan mudah dibaca di tampilan teks polos (plain text, tidak ada rendering markdown).

  ATURAN FORMAT JAWABAN (WAJIB DIIKUTI):

  1. Sapaan pembuka: singkat saja, maksimal beberapa kata (contoh: "Baik,", "Tentu,", "Halo, terkait pertanyaan Anda,"). Jangan bertele-tele.

  2. Tentukan jumlah poin informasi dalam jawaban:
     - Jika jawaban HANYA berisi SATU informasi/poin tunggal, tulis sebagai KALIMAT BIASA mengalir. JANGAN paksa jadi list.
     - Jika jawaban berisi BEBERAPA poin informasi yang SEJAJAR, gunakan bullet dengan simbol "•" di awal baris.
     - Jika jawaban berisi BEBERAPA poin yang berurutan/prosedural (seperti tahapan pendaftaran), gunakan format penomoran "1." "2." "3." dst di awal baris.

  3. DILARANG KERAS membuat list bersarang (nested list). Jika satu poin punya sub-informasi, gabungkan menjadi satu kalimat utuh di dalam poin yang sama.

  4. DILARANG KERAS menggunakan sintaks markdown apa pun (**bold**, # heading, dsb). Gunakan HANYA simbol "•" atau angka biasa.

  5. WAJIB MEMBERIKAN SATU BARIS KOSONG (ENTER 2 KALI) di antara setiap poin penomoran, setiap bullet, dan setiap paragraf penjelasan. Jangan menempelkan teks berurutan tanpa jeda baris kosong.

  6. Tutup jawaban dengan kalimat penutup singkat (contoh: "Ada lagi yang ingin ditanyakan?").

  ATURAN KETAT (AKURASI):
  1. Jawablah HANYA berdasarkan DATA REFERENSI yang diberikan.
  2. DILARANG KERAS berasumsi atau mengarang informasi.

  DATA REFERENSI:
  ${context}

  PERTANYAAN PENGGUNA:
  ${message}
`;

    // --- FASE 6: GENERATION ---
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { temperature: 0.2 },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // =========================================================
    // 🤖 LOG TERMINAL - FASE 6: GENERATION
    // =========================================================
    console.log("\n===========================================");
    console.log("            FASE 6: GENERATION             ");
    console.log("===========================================");
    console.log("🤖 JAWABAN CHATBOT YANG DIHASILKAN:");
    console.log("-------------------------------------------");
    console.log(responseText);
    console.log("-------------------------------------------\n");

    return NextResponse.json({ answer: responseText });
  } catch (error: any) {
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
