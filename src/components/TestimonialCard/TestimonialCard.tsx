// src/components/TestimonialCard/TestimonialCard.tsx

import React from "react";
import Image from "next/image";
import s from "./TestimonialCard.module.css"; // Akan kita buat selanjutnya
import classNames from "classnames";

// Menentukan tipe data untuk props komponen
export interface TestimonialCardProps {
  imageSrc: string;
  name: string;
  achievement: string;
  quote: string;
  variant: "orange" | "purple" | "green";
}

const TestimonialCard = ({
  imageSrc,
  name,
  achievement,
  quote,
  variant,
}: TestimonialCardProps) => {
  return (
    <div className={classNames(s.card, s[variant])}>
      {/* Bagian Info Nama & Prestasi */}
      <div className={s.infoBox}>
        <h4 className={s.name}>{name}</h4>
        <p className={s.achievement}>{achievement}</p>
      </div>

      {/* Bagian Gambar Siswa */}
      <div className={s.imageWrapper}>
        <Image
          src={imageSrc}
          alt={`Foto testimoni dari ${name}`}
          width={250}
          height={250}
          className={s.image}
        />
      </div>

      {/* Bagian Kutipan Testimoni */}
      <div className={s.quoteBox}>
        <p className={s.quoteText}>"{quote}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
