import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

let vectorStoreInstance: MemoryVectorStore | null = null;

export async function getVectorStore() {
  if (vectorStoreInstance) return vectorStoreInstance;

  // 1. Tentukan alamat folder secara absolut
  const rootDir = process.cwd();
  const knowledgePath = path.join(rootDir, "src", "knowledge");

  console.log("--- DIAGNOSIS RAG ---");
  console.log("\n--- START FASE: LOADING & CHUNKING ---");

  try {
    const files = ["umum.json", "kelas.json"];
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

    const docs = await splitter.createDocuments([combinedContent]);

    // --- LOG OUTPUT SEMUA CHUNKING (DATA NYATA) ---
    console.log("\n===========================================");
    console.log("   HASIL FASE CHUNKING (SEMUA POTONGAN)    ");
    console.log("===========================================");
    console.log(`Total Chunks: ${docs.length}`);

    docs.forEach((doc, index) => {
      console.log(`\n[CHUNK KE-${index + 1}]`);
      console.log(doc.pageContent);
      console.log("-------------------------------------------");
    });

    console.log("--- PROSES CHUNKING SELESAI ---\n");

    // --- PROSES EMBEDDING ---
    console.log("--- START FASE: EMBEDDING ---");
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    vectorStoreInstance = await MemoryVectorStore.fromDocuments(
      docs,
      embeddings,
    );

    console.log("🚀 SUCCESS: Vector Store siap digunakan!");
    return vectorStoreInstance;
  } catch (err: any) {
    console.error("❌ EROR DI RAG.TS:", err.message);
    throw err;
  }
}
