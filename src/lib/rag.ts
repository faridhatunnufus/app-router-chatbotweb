import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs/promises";
import path from "path";

let vectorStoreInstance: MemoryVectorStore | null = null;

export async function getVectorStore() {
  if (vectorStoreInstance) return vectorStoreInstance;

  // 1. Tentukan alamat folder secara absolut
  const rootDir = process.cwd();
  const knowledgePath = path.join(rootDir, "src", "knowledge");

  console.log("--- DIAGNOSIS RAG ---");
  console.log("\n--- START FASE: LOADING & CHUNKING ---");

  try {
    const files = ["bimbel-info.json", "kelas.json"];
    let combinedContent = "";

    for (const file of files) {
      const filePath = path.join(knowledgePath, file);
      const content = await fs.readFile(filePath, "utf-8");
      combinedContent += content + "\n";
      console.log(`✅ File dibaca: ${file}`);
    }

    // --- PROSES CHUNKING ---
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // Ukuran per potongan
      chunkOverlap: 50,
    });

    let allDocs: any[] = []; // Array untuk menampung semua potongan dari tiap file

    for (const file of files) {
      const filePath = path.join(knowledgePath, file);
      const content = await fs.readFile(filePath, "utf-8");

      // KUNCI PERBAIKAN: Buat dokumen per file dengan menyisipkan metadata source
      const docsFromFile = await splitter.createDocuments(
        [content],
        [{ source: file }], // Memberikan metadata "source" berupa nama file
      );

      allDocs.push(...docsFromFile);
      console.log(`✅ File dibaca & diberi label metadata: ${file}`);
    }

    // --- LOG OUTPUT SEMUA CHUNKING ---
    console.log("\n===========================================");
    console.log("   HASIL FASE CHUNKING (DENGAN METADATA)   ");
    console.log("===========================================");
    console.log(`Total Chunks: ${allDocs.length}`);

    allDocs.forEach((doc, index) => {
      console.log(`\n[CHUNK KE-${index + 1}]`);
      console.log(`📄 Source: ${doc.metadata.source}`); // Sekarang source akan muncul
      console.log(doc.pageContent);
      console.log("-------------------------------------------");
    });

    console.log("--- PROSES CHUNKING SELESAI ---\n");

    // --- PROSES EMBEDDING ---
    console.log("--- START FASE: EMBEDDING ---");
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    const sampleRes = await embeddings.embedDocuments([allDocs[0].pageContent]);
    const vectorSample = sampleRes[0];

    console.log("\n===========================================");
    console.log("    HASIL FASE EMBEDDING   ");
    console.log("===========================================");
    console.log(`[CHUNK KE-1] Berhasil diubah menjadi Vektor.`);
    console.log(`Dimensi Vektor: ${vectorSample.length} angka`);
    console.log(`100 Angka Pertama:`, vectorSample.slice(0, 100));
    console.log("-------------------------------------------\n");
    // Buat perhitungan sisa angka menjadi dinamis
    console.log(`... (dan ${vectorSample.length - 100} angka lainnya) ...`);
    console.log("-------------------------------------------\n");

    // ... proses fromDocuments selesai ...
    vectorStoreInstance = await MemoryVectorStore.fromDocuments(
      allDocs,
      embeddings,
    );

    console.log("\n===========================================");
    console.log("          VECTOR STORE          ");
    console.log("===========================================");

    // Kita intip 2 sampel data di dalam storage
    const storageData = (vectorStoreInstance as any).memoryVectors;

    storageData.slice(0, 2).forEach((item: any, index: number) => {
      console.log(`\n[DATA STORAGE KE-${index + 1}]`);
      console.log(
        `📄 Teks Asli (Content): "${item.content.substring(0, 100)}..."`,
      );
      console.log(
        `📍 Koordinat Vektor (3 angka pertama): [${item.embedding.slice(0, 3)}...]`,
      );
      console.log(`🗂️ Metadata: ${JSON.stringify(item.metadata)}`);
      console.log("-------------------------------------------");
    });

    console.log(
      `\n✅ TOTAL DATA TERSIMPAN: ${storageData.length} PASANGAN TEKS-VEKTOR`,
    );

    console.log("🚀 SUCCESS: Vector Store siap digunakan!");
    return vectorStoreInstance;
  } catch (err: any) {
    console.error("❌ EROR DI RAG.TS:", err.message);
    throw err;
  }
}
