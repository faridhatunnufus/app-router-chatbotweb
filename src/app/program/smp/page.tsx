import React, { ReactNode } from "react";
import Layout from "@/components/Layout/Layout";
import ProgramHero from "@/components/ProgramHero/ProgramHero";
import ProgramBenefits, {
  BenefitType,
} from "@/components/ProgramBenefits/ProgramBenefits";
import ClassDetailsSection, {
  DetailProps,
} from "@/components/ClassDetailsSection/ClassDetailsSection";
import { BiMath } from "react-icons/bi";
import { MdGroups, MdSchool } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { PiCashRegister } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";

// --- DATA KHUSUS UNTUK HALAMAN SMP ---

const smpBenefits: BenefitType[] = [
  {
    icon: BiMath,
    title: "Penguatan Logika Matematika",
    description:
      "Pendalaman materi Aljabar, Geometri, dan Statistika dengan metode penyelesaian masalah yang sistematis dan mudah dipahami.",
  },
  {
    icon: GiMaterialsScience,
    title: "Fokus IPA Terpadu",
    description:
      "Bimbingan intensif untuk mata pelajaran Fisika dan Biologi, membantu siswa memahami konsep alam secara mendalam.",
  },
  {
    icon: FaBookReader,
    title: "Persiapan Ujian & SMA Favorit",
    description:
      "Pendampingan khusus menghadapi PAS, PAT, ANBK, hingga persiapan seleksi masuk SMA/SMK unggulan.",
  },
];

const smpDetails: DetailProps[] = [
  { icon: MdSchool, title: "Tingkat", description: "Kelas 7, 8, 9 SMP" },
  {
    icon: CiClock1,
    title: "Durasi Kelas",
    description: "90 Menit / pertemuan",
  },
  {
    icon: FaBookReader,
    title: "Fasilitas",
    description: "Modul Materi & Pembahasan Soal",
  },
  {
    icon: MdGroups,
    title: "Tipe dan Kapasitas Kelas",
    description: "Kelas Reguler & Privat. Kapasitas 15-20 anak",
  },
  {
    icon: IoLocationOutline,
    title: "Lokasi",
    description: "Griya Sinau Syahir",
  },
  {
    icon: PiCashRegister,
    title: "Pendaftaran",
    description: "Dibuka untuk Semester Ganjil & Genap.",
  },
];

const SmpPage = () => {
  return (
    <Layout>
      <ProgramHero
        tag="SMP"
        title="Bimbingan Belajar SMP: Siap Berprestasi dan Raih SMA Impian"
        description="Program bimbingan belajar SMP di Griya Sinau Syahir dirancang untuk membantu siswa menguasai konsep akademik secara mendalam dan membangun kepercayaan diri menghadapi ujian."
        imageSrc="/smp.svg" // Pastikan file gambar tersedia
        imageAlt="Siswa SMP sedang belajar"
      />

      {/* Kirim data sebagai props ke komponen */}
      <ProgramBenefits benefits={smpBenefits} />
      <ClassDetailsSection details={smpDetails} />
    </Layout>
  );
};

export default SmpPage;
