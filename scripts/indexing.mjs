import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

//Fungsi pembantu untuk mengubah objek JSON menjadi teks deskriptif yang bersih.

function convertJsonToReadableText(obj, depth = 0) {
  let text = "";
  const indent = "  ".repeat(depth);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        text += `${indent}${key}:\n`;
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            text += convertJsonToReadableText(item, depth + 1);
          } else {
            text += `${indent} - ${item}\n`;
          }
        });
      } else if (typeof value === "object" && value !== null) {
        text += `${indent}${key}:\n${convertJsonToReadableText(value, depth + 1)}`;
      } else {
        text += `${indent} - ${key}: ${value}\n`;
      }
    }
  }
  return text;
}

async function runIndexing() {
  const rootDir = process.cwd();
  const knowledgePath = path.join(rootDir, "src", "knowledge");
  const outputPath = path.join(knowledgePath, "vector-store.json");

  console.log("\n=================================================");
  console.log(" 🚀🚀 START FASE INDEXING (PROSES POST-BUILD) ");
  console.log("=================================================");

  try {
    const files = ["bimbel-info.json", "kelas.json"];
    let allDocs = [];

    // --- FASE 1: LOADING & CHUNKING JSON---
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1200,
      chunkOverlap: 200,
      separators: ["\n\n", "\n", " ", ""],
    });

    for (const file of files) {
      const filePath = path.join(knowledgePath, file);
      const rawContent = await fs.readFile(filePath, "utf-8");

      let processedText = "";
      if (file.endsWith(".json")) {
        const jsonObject = JSON.parse(rawContent);
        processedText = convertJsonToReadableText(jsonObject);
      } else {
        processedText = rawContent;
      }

      const docsFromFile = await splitter.createDocuments(
        [processedText],
        [{ source: file }],
      );

      allDocs.push(...docsFromFile);
    }

    // =========================================================
    // 📊 SESI 1: VISUALISASI HASIL CHUNKING (ALL)
    // =========================================================
    console.log("\n=================================================");
    console.log(" 📊 SESI 1: VISUALISASI HASIL CHUNKING (ALL) ");
    console.log("=================================================");
    console.log(`Total Chunks Terbentuk: ${allDocs.length} Potongan`);

    allDocs.forEach((doc, index) => {
      console.log(`\n[CHUNK KE-${index + 1}]`);
      console.log(`📄 Source File : ${doc.metadata.source}`);
      console.log(`📝 Isi Potongan: "${doc.pageContent}"`);
      console.log("-------------------------------------------------");
    });

    // --- FASE 2: EMBEDDING VIA GEMINI ---
    console.log("\n🤖 Menghubungi Gemini API untuk proses embedding JSON");
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "gemini-embedding-001",
    });

    const vectorStoreInstance = await MemoryVectorStore.fromDocuments(
      allDocs,
      embeddings,
    );

    const storageData = vectorStoreInstance.memoryVectors;

    // Suntikkan ID unik ke setiap item vektor secara manual
    storageData.forEach((item) => {
      if (!item.id) {
        item.id = crypto.randomUUID();
      }
    });

    // =========================================================
    // 🔢 SESI 2: VISUALISASI HASIL EMBEDDING (HANYA CHUNK 1)
    // =========================================================
    console.log("\n=================================================");
    console.log(" 🔢 SESI 2: VISUALISASI HASIL EMBEDDING (CHUNK 1) ");
    console.log("=================================================");

    if (storageData.length > 0) {
      const chunkSatu = storageData[0];
      const totalEmbeddingLength = chunkSatu.embedding.length; // Biasanya 768
      const sisaAngka = totalEmbeddingLength - 100;

      // Hanya menampilkan 100 angka pertama dalam kurung siku
      console.log(`\n[${chunkSatu.embedding.slice(0, 100).join(", ")}]`);
      // Keterangan sisa angka di bawahnya
      console.log(
        `... (dan ${sisaAngka} angka lainnya dari total ${totalEmbeddingLength} angka embedding) ...`,
      );
      console.log("-------------------------------------------------");
    }

    // =========================================================
    // 🗄️ SESI 3: VISUALISASI DATA DI DALAM VECTOR STORE (5 ANGKA)
    // =========================================================
    console.log("\n=================================================");
    console.log(" 🗄️ SESI 3: VISUALISASI DATA DI DALAM VECTOR STORE ");
    console.log("=================================================");

    storageData.forEach((item, index) => {
      console.log(
        `\n[DATA VECTOR STORAGE KE-${index + 1} DARI ${storageData.length}]`,
      );
      console.log(`📄 Teks Asli (Content): "${item.content}"`);
      console.log(`🔢 ID Vektor          : ${item.id}`);
      console.log(
        `📍 Embedding (5 angka): [${item.embedding.slice(0, 5).join(", ")} ...]`,
      );
      console.log("-------------------------------------------------");
    });

    // --- FASE 3: SAVE / REPLACE FILE KE DISK ---
    await fs.writeFile(
      outputPath,
      JSON.stringify(storageData, null, 2),
      "utf-8",
    );

    console.log("\n=================================================");
    console.log(
      ` ✅ TOTAL DATA TERSIMPAN: ${storageData.length} PASANGAN TEKS-VEKTOR`,
    );
    console.log(
      ` 💾 SUCCESS: File 'vector-store.json' berhasil diperbarui secara utuh!`,
    );
    console.log("=================================================\n");
  } catch (err) {
    console.error("\n❌ EROR DI FASE INDEXING:", err.message);
    process.exit(1);
  }
}

runIndexing();
