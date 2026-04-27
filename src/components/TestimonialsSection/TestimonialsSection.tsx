// src/components/TestimonialsSection/TestimonialsSection.tsx
"use client";

import React, { useRef } from "react";
import Slider from "react-slick"; // <-- Import Slider dari react-slick
import s from "./TestimonialsSection.module.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import type { TestimonialCardProps } from "../TestimonialCard/TestimonialCard";

// 1. Impor CSS yang dibutuhkan oleh react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialsData: TestimonialCardProps[] = [
  // (Data tetap sama seperti sebelumnya, pastikan Anda punya minimal 3 data atau lebih)
  {
    imageSrc: "/gambar4.jpg",
    name: "Putriani Nabila",
    achievement: "Diterima di SMA N 1 Jeruklegi",
    quote:
      "Happy banget belajar di sini, temennya seru dan supportif, pengajarnya juga keren-keren banget karena bikin aku ngerti sama materinya.",
    variant: "purple",
  },
  {
    imageSrc: "/gambar5.jpg",
    name: "Nabila Amalia Wahyuni",
    achievement: "Diterima di SMA Swasta Unggulan",
    quote:
      "Bimbel sangat membantu saya saat mempersiapkan  materi yang tidak dipahami saya bisa ditanyakan kepada pengajar.",
    variant: "green",
  },
  {
    imageSrc: "/gambar11.jpg",
    name: "Pangestu Zahid",
    achievement: "DIterima di SMA N 1 Cilacap",
    quote:
      "Seru banget! Pengajarnya asyik sering becanda juga, jadi materinya tetap bisa masuk. ada materinya, dan latihan soal per materi, jadi asyiknya pun dapet banget.",
    variant: "orange",
  },
  {
    imageSrc: "/gambar10.jpg", // Sebaiknya gunakan gambar & data unik
    name: "Rizky Pratama",
    achievement: "Lulus dengan Nilai A",
    quote:
      "Awalnya ragu, tapi setelah beberapa sesi, saya merasa jauh lebih siap menghadapi ujian. Konsep yang rumit jadi terasa sederhana berkat cara penyampaian yang interaktif. Sangat membantu!",
    variant: "purple",
  },
  {
    imageSrc: "/gambar8.jpg", // Sebaiknya gunakan gambar & data unik
    name: "Siti Aisyah",
    achievement: "Juara Olimpiade tingkat Kabupaten",
    quote:
      "Lingkungan belajarnya kompetitif tapi tetap sehat. Try out rutin dan pembahasan soalnya sangat detail. Ini yang membuat saya bisa mengukur kemampuan dan terus berkembang.",
    variant: "green",
  },
];

const TestimonialsSection = () => {
  const sliderRef = useRef<Slider>(null);
  // 2. Konfigurasi untuk slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // <-- Menampilkan 3 kartu sekaligus
    slidesToScroll: 3, // <-- Bergeser 3 kartu sekaligus
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Untuk tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600, // Untuk mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCardClick = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <section id="testimonials" className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.title}>
          Yuk simak apa kata mereka tentang Griya Sinau Syahir!
        </h2>

        {/* 3. Gunakan komponen Slider */}
        <div className={s.sliderContainer}>
          <Slider ref={sliderRef} {...settings}>
            {testimonialsData.map((testimonial) => (
              // Setiap kartu perlu dibungkus div untuk padding
              <div
                key={testimonial.name}
                className={s.cardPadding}
                onClick={handleCardClick}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
