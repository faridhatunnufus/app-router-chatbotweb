import React from 'react';
import s from './RegistrationProcedure.module.css'; // Akan kita buat selanjutnya
import Link from 'next/link';

const RegistrationProcedure = () => {
  return (
    <main id="daftar" className={s.pageWrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Tata Cara Pendaftaran</h1>
        <p className={s.subtitle}>
          Ikuti langkah-langkah mudah di bawah ini untuk mendaftarkan putra-putri Anda di Griya Sinau Syahir.
        </p>

        <div className={s.procedureList}>
          <div className={s.procedureItem}>
            <div className={s.stepNumber}>1</div>
            <div className={s.stepContent}>
              <h3>Isi Formulir Online</h3>
              <p>
                Langkah pertama adalah mengisi formulir pendaftaran secara lengkap dan akurat melalui tombol yang tersedia di bawah ini. Pastikan semua data sudah benar sebelum mengirim.
              </p>
            </div>
          </div>

          <div className={s.procedureItem}>
            <div className={s.stepNumber}>2</div>
            <div className={s.stepContent}>
              <h3>Konfirmasi & Pembayaran</h3>
              <p>
                Setelah formulir kami terima, tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi data dan memberikan instruksi mengenai biaya pendaftaran dan SPP bulan pertama.
              </p>
            </div>
          </div>

          <div className={s.procedureItem}>
            <div className={s.stepNumber}>3</div>
            <div className={s.stepContent}>
              <h3>Selamat Bergabung!</h3>
              <p>
                Setelah pembayaran terkonfirmasi, putra-putri Anda resmi menjadi siswa Griya Sinau Syahir. Jadwal les dan informasi selanjutnya akan dikirimkan melalui grup WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <div className={s.ctaSection}>
          <p>Sudah siap untuk mendaftar?</p>
          <a
            href="https://forms.gle/HWu5MzDiGtnLk4wXA" // GANTI DENGAN LINK GOOGLE FORM ANDA
            target="_blank"
            rel="noopener noreferrer"
            className={s.ctaButton}
          >
            Mulai Pendaftaran Sekarang
          </a>
        </div>
      </div>
    </main>
  );
};

export default RegistrationProcedure;