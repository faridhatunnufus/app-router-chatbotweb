import React from "react";
import s from "./LocationSection.module.css";
import Image from "next/image";
// 1. Impor komponen Link dari next/js
import Link from "next/link";

const LocationSection = () => {
  return (
    <section id="lokasi" className={s.wrapper}>
      <div className={s.container}>
        {/* Kolom Kiri: GAMBAR (tidak ada perubahan) */}
        <div className={s.imageContainer}>
          <div className={s.purpleShape}></div>
{/*           <Image
            src="/gambar-lokasi-anak.png"
            alt="Fasilitas Griya Sinau Syahir"
            width={500}
            height={500}
            className={s.image}
          /> */}
        </div>

        {/* Kolom Kanan: KARTU PUTIH (DIBUNGKUS DENGAN LINK) */}
        {/* 2. Bungkus seluruh div.card dengan komponen Link */}
        <Link href="/kontak" className={s.cardLink}>
          <div className={s.card}>
            <div className={s.textContainer}>
              <p className={s.eyebrow}>Lokasi Strategis & Nyaman</p>
              <h2 className={s.title}>
                Lingkungan Belajar Modern dan Aman untuk Putra-Putri Anda
              </h2>
              <p className={s.description}>
                Griya Sinau Syahir berlokasi strategis di Desa Sawangan RT 04 RW
                03, Kec. Jeruklegi, Kab. Cilacap, yang mudah dijangkau. Kami
                merancang setiap sudut ruangan untuk menciptakan suasana belajar
                yang aman, nyaman, dan kondusif untuk mendukung prestasi anak
                Anda.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LocationSection;