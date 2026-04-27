import React from "react";
import s from "./MissionSection.module.css";
import Image from "next/image";
import Link from "next/link";

const MissionSection = () => {
  return (
    <section id="tentang-kami" className={s.wrapper}>
      <div className={s.container}>
        {/* Kolom Kiri: Kartu Putih berisi Teks */}
        <Link href="/tentang-kami" className={s.cardLink}>
          <div className={s.card}>
            <div className={s.textContainer}>
              <p className={s.eyebrow}>Misi & Filosofi Kami</p>
              <h2 className={s.title}>Pendidikan Yang Bergerak Dari Hati</h2>
              <p className={s.description}>
                Di Griya Sinau Syahir, kami percaya bahwa pendidikan sejati
                adalah sebuah panggilan. Sesuai dengan komitmen kami untuk
                menjadi bagian dalam mencerdaskan anak bangsa, kami bergerak
                dengan hati. Kami tidak hanya fokus pada pencapaian akademis,
                tetapi juga pada prosesnya. Bagi kami, setiap anak adalah
                individu unik dengan potensi luar biasa. Pendekatan kami
                bersifat personal untuk membangun kepercayaan diri dan
                menumbuhkan rasa ingin tahu yang tulus. Misi kami adalah untuk
                memulihkan esensi pendidikan—menjadikannya sebuah petualangan
                yang menyenangkan dan penuh penemuan, bukan beban. Kami hadir
                untuk membimbing, mendukung, dan merayakan setiap langkah
                kemajuan putra-putri Anda.
              </p>
            </div>
          </div>
        </Link>
        {/* Kolom Kanan: Gambar */}
        <div className={s.imageContainer}>
          {/* Lapisan bentuk hijau di belakang gambar */}
          <div className={s.greenShape}></div>
{/*           <Image
            src="/hero2.svg" 
            alt="Anak dan orang tua"
            width={500}
            height={500}
            className={s.image}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
