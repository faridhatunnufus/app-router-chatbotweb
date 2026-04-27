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
  console.log("Mencari folder di:", knowledgePath);

  try {
    // 2. Cek apakah folder knowledge ada
    const dirContent = await fs.readdir(knowledgePath);
    console.log("Isi folder ditemukan:", dirContent);

    const files = ["umum.json", "kelas.json"];
    let combinedContent = "";

    for (const file of files) {
      const filePath = path.join(knowledgePath, file);
      const content = await fs.readFile(filePath, "utf-8");
      combinedContent += content + "\n";
      console.log(`Berhasil membaca: ${file}`);
    }

    // 3. Proses Embedding & Vector Store
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 100,
    });
    const docs = await splitter.createDocuments([combinedContent]);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-004",
    });

    vectorStoreInstance = await MemoryVectorStore.fromDocuments(
      docs,
      embeddings,
    );
    console.log("SUCCESS: Vector Store siap!");
    console.log("----------------------");
    return vectorStoreInstance;
  } catch (err: any) {
    console.error("--- ERROR DIAGNOSIS ---");
    console.error("Pesan Eror:", err.message);
    console.error(
      "Coba cek: Apakah nama folder 'knowledge' sudah huruf kecil semua?",
    );
    console.error("------------------------");
    throw err;
  }

  /*   // 1. Load data dari folder knowledge
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const files = ["umum.json", "kelas.json"];
  let combinedContent = "";

  for (const file of files) {
    try {
      const filePath = path.join(knowledgeDir, file);
      // Log ini akan muncul di terminal VS Code kamu untuk memastikan lokasinya
      console.log("LOG: Membaca file dari ->", filePath);
      
      const content = await fs.readFile(filePath, "utf-8");
      combinedContent += content + "\n";
    } catch (err) {
      console.error(`ERROR: Gagal akses ${file}. Pastikan folder 'knowledge' ada di root project.`);
      throw err; // Lempar error agar ditangkap API Route
    }
  } */

  /* for (const file of files) {
    const content = await fs.readFile(path.join(knowledgeDir, file), "utf-8");
    combinedContent += content + "\n";
  } */

  // 2. Chunking (Metode Recursive)
  /*   const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,
    chunkOverlap: 100,
  });
  const docs = await splitter.createDocuments([combinedContent]);

  // 3. Embedding via Google Embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    modelName: "embedding-001",
  });

  // 4. Simpan ke RAM (MemoryVectorStore)
  vectorStoreInstance = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return vectorStoreInstance; */
}
