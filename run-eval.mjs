import promptfoo from 'promptfoo';
import dotenv from 'dotenv';
import fs from 'fs';

// Memuat variabel dari .env
dotenv.config();

async function main() {
  console.log('🚀 Memulai Evaluasi Riset...');
  
  const results = await promptfoo.evaluate({
    providers: [
      {
        id: 'google:gemini-2.5-flash',
        config: {
          apiKey: process.env.GOOGLE_API_KEY,
          temperature: 0.2,
        },
      },
    ],
    prompts: [
      'Anda adalah CS Griya Sinau Syahir. Gunakan data: {{context}} untuk menjawab: {{question}} api key: ${env.GOOGLE_API_KEY}',
    ],
    // Test cases
    tests: [
      {
        vars: {
          question: 'Siapa pendiri bimbel ini?',
          context: 'Griya Sinau Syahir didirikan oleh Ibu Tati Mei Lina Setyowati, S.Pd.',
        },
        assert: [
          { type: 'icontains', value: 'Tati Mei Lina Setyowati' },
        ],
      },
      {
        vars: {
          question: 'Berapa biaya bulanan kelas umum?',
          context: 'Biaya bulanan kelas umum adalah Rp 100.000.',
        },
        assert: [
          { type: 'icontains', value: '100.000' },
        ],
      },
      {
        vars: {
          question: 'Di mana lokasi bimbelnya?',
          context: 'Lokasi di Desa Sawangan, Kec. Jeruklegi, Cilacap.',
        },
        assert: [
          { type: 'icontains', value: 'Jeruklegi' },
        ],
      },
    ],
  });

  console.log('✅ Evaluasi Selesai!');

// Menampilkan hasil pada terminal dalam format tabel
const summary = results.results.map((r, index) => {
    const questionText = r.vars?.question || r.testCase?.vars?.question || 'N/A';
    
    return {
      No: index + 1,
      Question: questionText,
      Success: r.success ? '✅ PASS' : '❌ FAIL',
      Output: r.response?.output?.replace(/\n/g, ' ').substring(0, 60) + '...'
    };
  });

  console.table(summary);

  const reportName = `hasil-riset-${new Date().getTime()}.json`;
  fs.writeFileSync(reportName, JSON.stringify(results, null, 2));
  console.log(`\n📄 Data detail disimpan ke: ${reportName}`);
}

main().catch(console.error);