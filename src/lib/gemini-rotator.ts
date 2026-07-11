import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEYS = [
  process.env.GOOGLE_API_KEY,
  process.env.GOOGLE_API_KEY_2,
  process.env.GOOGLE_API_KEY_3,
  process.env.GOOGLE_API_KEY_4,
  process.env.GOOGLE_API_KEY_5,
].filter(Boolean) as string[];

if (API_KEYS.length === 0) {
  throw new Error("Tidak ada GOOGLE_API_KEY yang ditemukan.");
}

// round robin pointer
let currentKeyIndex = 0;

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("REQUEST_TIMEOUT")), ms),
    ),
  ]);
}

function shouldRotate(error: any): boolean {
  const msg = (error?.message || "").toLowerCase();

  // timeout
  if (msg.includes("request_timeout")) return true;

  // quota/rate limit
  if (msg.includes("429")) return true;
  if (msg.includes("quota")) return true;
  if (msg.includes("rate")) return true;
  if (msg.includes("resource_exhausted")) return true;

  // server error
  if (msg.includes("500")) return true;
  if (msg.includes("502")) return true;
  if (msg.includes("503")) return true;
  if (msg.includes("504")) return true;
  if (msg.includes("internal")) return true;
  if (msg.includes("unavailable")) return true;

  return false;
}

export async function generateWithRotation(prompt: string, timeoutMs = 30000) {
  const totalKeys = API_KEYS.length;
  let lastError: any;

  for (let i = 0; i < totalKeys; i++) {
    const index = (currentKeyIndex + i) % totalKeys;
    const apiKey = API_KEYS[index];

    try {
      console.log(`🔑 Mencoba API KEY ${index + 1}/${totalKeys}`);

      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.2,
        },
      });

      const result = await timeout(model.generateContent(prompt), timeoutMs);

      const text = result.response.text();

      // request berikutnya mulai dari key selanjutnya
      currentKeyIndex = (index + 1) % totalKeys;

      console.log(`✅ API KEY ${index + 1} berhasil`);

      return text;
    } catch (error: any) {
      lastError = error;

      console.log(`❌ API KEY ${index + 1} gagal: ${error?.message || error}`);

      // kalau error bukan karena quota/server/timeout
      // jangan buang waktu mencoba key lain
      if (!shouldRotate(error)) {
        throw error;
      }
    }
  }

  throw lastError;
}
