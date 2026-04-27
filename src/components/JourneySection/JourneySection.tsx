"use client";

import React from "react";
import s from "./JourneySection.module.css";
import InfoCard from "../InfoCard/InfoCard";
import classNames from "classnames";
import Link from "next/link"; // Pastikan Link sudah di-import
import { PiStudent } from "react-icons/pi"; // Menggunakan ikon dari react-icons
import { FaChildReaching, FaChildren } from "react-icons/fa6";
import { MdOutlineAddTask } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";

// --- DATA UNTUK TAB "REGULER" DENGAN HREF ---
const regulerData = [
  {
    href: "/program/prasekolah",
    icon: FaChildren,
    title: "Program Pra Sekolah",
    ageRange: "Untuk Usia 4-6 Tahun",
    description:
      "Mengenalkan dunia belajar yang ceria melalui permainan. Fokus pada calistung dasar dan pengembangan motorik untuk persiapan masuk SD.",
    variant: "green",
  },
  {
    href: "/program/sd",
    icon: FaChildReaching,
    title: "Program SD/Sederajat",
    ageRange: "Kelas 1 - 6",
    description:
      "Penguatan materi inti seperti Matematika, IPA, dan Bahasa Indonesia. Membantu pengerjaan PR dan membangun fondasi akademis yang kokoh.",
    variant: "orange",
  },
  {
    href: "/program/smp", // Anda bisa arahkan ini ke halaman SMP atau gabungan
    icon: PiStudent,
    title: "Program SMP/Sederajat",
    ageRange: "Kelas 7 - 9",
    description:
      "Membantu siswa menaklukkan setiap ulangan dan ujian melalui pemahaman konsep yang kuat dan latihan soal yang efektif untuk meraih nilai maksimal.",
    variant: "purple",
  },
  {
    href: "/program/sma", // Anda bisa arahkan ini ke halaman SMP atau gabungan
    icon: PiStudent,
    title: "Program SMA/Sederajat",
    ageRange: "Kelas 10 - 12",
    description:
      "Pendalaman materi intensif dan strategi jitu untuk menghadapi Ujian Sekolah, UTBK-SNBT, dan seleksi masuk Perguruan Tinggi Negeri favorit.",
    variant: "orange",
  },
];

// --- DATA UNTUK TAB "PRIVAT" DENGAN HREF ---
const privatData = [
  {
    href: "/program/privat",
    icon: GiPadlock,
    title: "Privat Intensif",
    ageRange: "Fokus Satu Mata Pelajaran",
    description:
      "Solusi bagi siswa yang membutuhkan perhatian khusus pada mata pelajaran sulit seperti Fisika, Kimia, atau Matematika tingkat lanjut.",
    variant: "green",
  },
  {
    href: "/program/privat",
    icon: MdOutlineAddTask,
    title: "Privat Persiapan Ujian",
    ageRange: "Target Lulus Ujian & Seleksi",
    description:
      "Program 'bootcamp' personal dengan jadwal fleksibel. Dilengkapi dengan ribuan latihan soal, try out berkala, dan evaluasi mendalam.",
    variant: "orange",
  },
  {
    href: "/program/privat",
    icon: IoIosHome,
    title: "Home Tutoring",
    ageRange: "Kenyamanan & Fleksibilitas",
    description:
      "Nikmati semua keunggulan program privat kami dari kenyamanan rumah Anda sendiri. Jadwal lebih fleksibel dan dipantau langsung oleh orang tua.",
    variant: "purple",
  },
];

const JourneySection = () => {
  const [activeTab, setActiveTab] = React.useState<"reguler" | "privat">(
    "reguler"
  );
  const displayedData = activeTab === "reguler" ? regulerData : privatData;

  return (
    <section id="programkami" className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.title}>Program Kami</h2>
        <div className={s.tabContainer}>
          <button
            onClick={() => setActiveTab("reguler")}
            className={classNames(s.tabButton, {
              [s.active]: activeTab === "reguler",
            })}
          >
            Umum
          </button>
          <button
            onClick={() => setActiveTab("privat")}
            className={classNames(s.tabButton, {
              [s.active]: activeTab === "privat",
            })}
          >
            Privat
          </button>
        </div>

        {/* --- PERUBAHAN UTAMA DI SINI --- */}
        <div className={s.cardsGrid}>
          {displayedData.map((card) => (
            // Setiap InfoCard dibungkus dengan komponen Link
            <Link href={card.href} key={card.title} className={s.cardLink}>
              <InfoCard
                icon={card.icon}
                title={card.title}
                ageRange={card.ageRange}
                description={card.description}
                variant={card.variant as any}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
