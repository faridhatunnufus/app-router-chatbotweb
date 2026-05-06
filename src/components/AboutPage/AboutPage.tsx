import React from "react";
import Image from "next/image";
import classNames from "classnames";
import s from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <main className={s.pageWrapper}>
      {/* JUDUL UTAMA HALAMAN DITAMBAHKAN DI SINI */}
      <h1 className={s.pageHeaderTitle}>Tentang Kami</h1>

      {/* Section lainnya tetap sama */}
      {/* SECTION 2: SEJARAH (Teks Kiri, Gambar Kanan) */}
      <section className={classNames(s.featureSection, s.reversed)}>
        <div className={s.imageColumn}>
          <div className={s.imageCard}>
            <Image
              src="/gambar1.jpg"
              alt="Sejarah Griya Sinau Syahir"
              layout="fill"
            />
          </div>
        </div>
        <div className={s.textColumn}>
          <p className={s.eyebrow}>Perjalanan Kami</p>
          <h2 className={s.sectionTitle}>Sejarah Griya Sinau Syahir</h2>
          <p className={s.contentText}>
            Bimbingan Belajar Griya Sinau Syahir didirikan pada tanggal 1
            Februari 2022. Lembaga ini lahir dari sebuah kepedulian dan semangat
            untuk menyediakan pendampingan belajar yang berkualitas bagi para
            siswa. Kami melihat adanya kebutuhan akan sebuah lingkungan belajar
            yang tidak hanya fokus pada pencapaian nilai, tetapi juga pada
            pemahaman konsep yang mendalam dan tulus.
          </p>
        </div>
      </section>

      {/* SECTION 3: VISI & MISI (Gambar Kiri, Teks Kanan) */}
      <section className={s.featureSection}>
        <div className={s.imageColumn}>
          <div className={s.imageCard}>
            <Image
              src="/gambar2.jpg"
              alt="Visi dan Misi Griya Sinau Syahir"
              layout="fill"
            />
          </div>
        </div>
        <div className={s.textColumn}>
          <p className={classNames(s.eyebrow, s.purpleText)}>Panduan Kami</p>
          <h2 className={s.sectionTitle}>Visi & Misi</h2>
          <h3 className={s.subheading}>Visi</h3>
          <p className={s.contentText}>
            Menjadi lembaga bimbingan belajar terpercaya yang turut andil secara
            aktif dalam mencerdaskan kehidupan bangsa melalui pendidikan yang
            berpusat pada siswa.
          </p>
          <h3 className={s.subheading}>Misi</h3>
          <p className={s.contentText}>
            Untuk mencapai visi tersebut, kami mengemban misi untuk "bergerak
            dengan hati" dalam setiap proses belajar-mengajar, serta berupaya
            "memulihkan" esensi dan semangat belajar yang otentik bagi setiap
            siswa.
          </p>
        </div>
      </section>

      {/* SECTION 4: TUJUAN (Teks Kiri, Gambar Kanan) */}
      <section className={classNames(s.featureSection, s.reversed)}>
        <div className={s.imageColumn}>
          <div className={s.imageCard}>
            <Image
              src="/gambar3.jpg"
              alt="Tujuan Griya Sinau Syahir"
              layout="fill"
            />
          </div>
        </div>
        <div className={s.textColumn}>
          <p className={s.eyebrow}>Fokus Kami</p>
          <h2 className={s.sectionTitle}>Tujuan Kami</h2>
          <p className={s.contentText}>
            Tujuan utama Griya Sinau Syahir adalah untuk membantu setiap siswa
            meningkatkan pemahaman materi dan meraih prestasi akademik yang
            lebih baik. Kami bertujuan untuk menjadi mitra strategis bagi orang
            tua dalam mendukung perkembangan pendidikan anak. Pada akhirnya,
            kami ingin menciptakan lingkungan belajar yang nyaman dan kondusif,
            di mana siswa dapat menemukan kembali kegembiraan dalam menimba
            ilmu.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
