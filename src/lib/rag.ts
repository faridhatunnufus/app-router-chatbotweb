import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import fs from "fs/promises";
import path from "path";

// Variabel global untuk menyimpan instance Vector Store di RAM server
let vectorStoreInstance: MemoryVectorStore | null = null;

/**
 * Fungsi untuk mengambil atau menginisialisasi Vector Store.
 * Saat runtime (npm run start / dev), fungsi ini hanya membaca file JSON hasil indexing.
 */
export async function getVectorStore() {
  // Jika database sudah pernah dimuat ke RAM, langsung kembalikan tanpa membaca file lagi
  if (vectorStoreInstance) return vectorStoreInstance;

  const rootDir = process.cwd();
  // Mengarah ke file database vektor yang dibuat oleh script post-build
  const vectorStorePath = path.join(
    rootDir,
    "src",
    "knowledge",
    "vector-store.json",
  );

  console.log("\n⚡ [RUNTIME] Memuat Knowledge Base dari Vector Store JSON...");

  try {
    // 1. Membaca file JSON hasil proses indexing
    const content = await fs.readFile(vectorStorePath, "utf-8");
    const memoryVectors = JSON.parse(content);

    // 2. Menyiapkan model embedding Gemini untuk kebutuhan pencarian (retrieval)
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    // 3. Membuat instance MemoryVectorStore baru dan menyuntikkan data vektor langsung ke dalamnya
    vectorStoreInstance = new MemoryVectorStore(embeddings);
    (vectorStoreInstance as any).memoryVectors = memoryVectors;

    console.log(
      `✅ [RUNTIME] Berhasil memuat ${memoryVectors.length} data pasangan teks-vektor.`,
    );
    console.log(
      "🚀 Chatbot siap ke fase Embed Pertanyaan User -> Retrieval -> Generation!\n",
    );

    return vectorStoreInstance;
  } catch (err: any) {
    console.error("\n❌ EROR SAAT RUNTIME LOAD VECTOR STORE:", err.message);
    console.error(
      "👉 Pastikan Anda sudah menjalankan 'npm run build' terlebih dahulu agar file 'vector-store.json' terbentuk.\n",
    );
    throw err;
  }
}
