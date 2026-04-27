import React from "react";
import s from "./HeroSection.module.css";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        {/* Kolom Kiri: Teks */}
        <div className={s.textContainer}>
          <h1 className={s.heading}>
            <span className={s.mainHeading}>Enjoy Your Learning With Us!</span>
            <span className={s.subHeading}>
              Belajar Lebih Mudah
              <br></br>Hasil Lebih Nyata
            </span>
          </h1>
          <p className={s.description}>
            Bimbel Griya Sinau Syahir berkomitmen untuk menjadi bagian dalam
            mencerdaskan anak bangsa, bergerak dengan hati, dan pulihkan
            pendidikan
          </p>
        </div>

        {/* Kolom Kanan: Gambar */}
        <div className={s.imageContainer}>
          {/* Decorative shapes (background) */}
          <div className={s.shapePurple}></div>
          <div className={s.shapeGreen}></div>

          {/* Main Image */}
          <div className={s.mainImageWrapper}>
            {/*             <HeroIllust className={s.heroIllust} /> */}
            <Image
              src="/hero2.svg"
              alt=""
              width={550}
              height={450}
              className={s.mainImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
