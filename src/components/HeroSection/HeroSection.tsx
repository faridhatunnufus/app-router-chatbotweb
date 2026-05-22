import React from "react";
import s from "./HeroSection.module.css";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"], // Sesuaikan ketebalan yang dibutuhkan
  display: "swap",
});
const HeroSection = () => {
  return (
    <section className={`${s.wrapper} ${poppins.className}`}>
      <div className={s.container}>
        {/* Kolom Kiri: Teks */}
        <div className={s.textContainer}>
          <h1 className={s.heading}>
            <span className={s.mainHeading}>
              Enjoy Your Learning With <span className={s.textPurple}>Us!</span>
            </span>
          </h1>
          <h3 className={s.subHeading}>
            <span>
              Belajar <span className={s.textOrange}>Lebih</span> Mudah
              <br />
              <span className={s.textPurple}>Hasil</span> Lebih Nyata
            </span>
          </h3>
          {/*           <p className={s.description}>
            Bimbel Griya Sinau Syahir berkomitmen untuk menjadi bagian dalam
            mencerdaskan anak bangsa, bergerak dengan hati, dan pulihkan
            pendidikan
          </p> */}
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
