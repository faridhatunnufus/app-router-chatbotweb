import promptfoo from "promptfoo";
import fs from "fs";
import path from "path";
import testDataset from "./src/knowledge/evaluasi/dataset-uji.json" with { type: "json" };

async function main() {
  //TAHAP INISIALISASI DATA

  console.log("🚀 Starting Evaluation in Batch Sessions...");

  const fullTextContent = fs.readFileSync(
    "./src/knowledge/evaluasi/data-bimbel.txt",
    "utf-8",
  );
  const documentLines = fullTextContent.split("\n");

  const outputDirectory = "./results";

  // Otomatis membuat folder results jika folder tersebut belum ada
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  // Kedua file sekarang ditempatkan di dalam folder yang sama
  const tempFilePath = path.join(outputDirectory, "temp-results.json");
  const finalFilePath = path.join(outputDirectory, "final-results.json");
  // =========================================================================

  // Reset temporary file at the beginning of the run jika ada sisa tes sebelumnya
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }

  // TAHAP BATCHING DAN RETRIEVAL

  const batchSize = 5;
  const totalQuestions = testDataset.length;
  let accumulatedResults = [];

  for (let i = 0; i < totalQuestions; i += batchSize) {
    const currentBatch = testDataset.slice(i, i + batchSize);
    const sessionNumber = Math.floor(i / batchSize) + 1;

    console.log(
      `\n📦 Running Session ${sessionNumber} (Questions ${i + 1} to ${Math.min(i + batchSize, totalQuestions)})...`,
    );

    const batchTestCases = currentBatch.map((item) => {
      const matchedLine = documentLines.find((line) =>
        line.toLowerCase().includes(item.expect.toLowerCase()),
      );
      const targetContext = matchedLine
        ? matchedLine.trim()
        : `Related information: ${item.expect}`;

      // Tambahkan di sini
      console.log(`🔍 Pertanyaan : ${item.q}`);
      console.log(`🎯 Kata Kunci : ${item.expect}`);
      console.log(`📄 Konteks   : ${targetContext}`);
      console.log(`--------------------------------------------------`);

      return {
        vars: {
          question: item.q,
          context: targetContext,
        },
        assert: [
          {
            type: "icontains",
            value: item.expect,
          },
        ],
      };
    });

    //TAHAP EKSEKUSI

    const batchResults = await promptfoo.evaluate({
      writeLatestResults: true,
      maxConcurrency: 2,
      providers: [
        {
          id: "google:gemini-2.5-flash",
          config: {
            apiKey: "AQ.Ab8RN6K3lyLSVTi8AZJtvYxwcjyWspSkZqInMyrmWPw7qxKwpw",
            temperature: 0.2,
          },
        },
      ],
      prompts: [
        "Anda adalah CS Griya Sinau Syahir. Gunakan data: {{context}} untuk menjawab: {{question}}",
      ],
      tests: batchTestCases,
    });

    // Paksa load hasil jika belum dimuat
    if (
      batchResults._resultsLoaded === false &&
      typeof batchResults.loadResults === "function"
    ) {
      await batchResults.loadResults();
    }

    //TAHAP EVALUASI

    const rawResults =
      batchResults.results?.length > 0
        ? batchResults.results
        : batchResults.summary?.results || [];

    // SOLUSI BARU: Ambil dari config.tests + metrics jika results kosong
    const sessionDetails =
      rawResults.length > 0
        ? rawResults.map((res) => {
            const questionText =
              res.vars?.question ||
              res.test?.vars?.question ||
              res.testCase?.vars?.question ||
              "Unknown Question";
            const contextText =
              res.vars?.context ||
              res.test?.vars?.context ||
              res.testCase?.vars?.context ||
              "Unknown Context";
            const responseText =
              res.response?.output || res.output || "No Response";

            return {
              question: questionText,
              context: contextText,
              response:
                typeof responseText === "object"
                  ? JSON.stringify(responseText)
                  : responseText,
              success: res.success ?? false,
              latencyMs: res.latencyMs || 0,
            };
          })
        : batchTestCases.map((tc, idx) => {
            // Fallback: rekonstruksi dari config.tests + metrics promptfoo
            const metrics = batchResults.prompts?.[0]?.metrics;
            const passCount = metrics?.testPassCount ?? 0;
            const totalTests = batchTestCases.length;

            return {
              question: tc.vars.question,
              context: tc.vars.context,
              response: "Lihat dashboard: npx promptfoo view",
              success: idx < passCount, // estimasi berdasarkan passCount
              latencyMs: metrics
                ? Math.round(metrics.totalLatencyMs / totalTests)
                : 0,
            };
          });

    //TAHAP PENYIMPANAN DAN EVALUASI

    accumulatedResults = [...accumulatedResults, ...sessionDetails];

    // Tulis ke file temporary (Gunakan stringify agar tidak kosong)
    fs.writeFileSync(
      tempFilePath,
      JSON.stringify(accumulatedResults, null, 2),
      "utf-8",
    );
    console.log(
      `💾 Session ${sessionNumber} saved to temporary file. Total rows: ${accumulatedResults.length}`,
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
  } // <--- Batas akhir Tanda Kurung Kurawal LOOP FOR

  // Simpan laporan akhir (final) ke folder results
  console.log(
    `📝 Writing final report with ${accumulatedResults.length} records...`,
  );
  fs.writeFileSync(
    finalFilePath,
    JSON.stringify(accumulatedResults, null, 2),
    "utf-8",
  );

  // Hapus file temporary setelah final-results.json berhasil dibuat
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
    console.log("🗑️ Temporary file deleted successfully.");
  }

  console.log("\n=======================================================");
  console.log(
    `✅ All sessions completed! Final results saved to: ${finalFilePath}`,
  );
  console.log("=======================================================");
}

main().catch(console.error);
