import promptfoo from "promptfoo";
import fs from "fs";
import path from "path";
import testDataset from "./src/knowledge/evaluasi/dataset-uji.json" with { type: "json" };

async function main() {
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

    const sessionDetails = batchResults.results.map((res) => ({
      question: res.vars.question,
      context: res.vars.context,
      response: res.response?.output || "No Response",
      success: res.success,
      latencyMs: res.latencyMs,
    }));

    accumulatedResults = [...accumulatedResults, ...sessionDetails];

    // Simpan data akumulasi ke file temporary di folder results
    fs.writeFileSync(
      tempFilePath,
      JSON.stringify(accumulatedResults, null, 2),
      "utf-8",
    );
    console.log(
      `💾 Session ${sessionNumber} saved and accumulated to temporary file.`,
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  // Simpan laporan akhir (final) ke folder results
  fs.writeFileSync(
    finalFilePath,
    JSON.stringify(accumulatedResults, null, 2),
    "utf-8",
  );

  // Hapus file temporary yang ada di dalam folder results agar bersih
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }

  console.log("\n=======================================================");
  console.log(
    `✅ All sessions completed! Final results saved to: ${finalFilePath}`,
  );
  console.log("=======================================================");
}

main().catch(console.error);