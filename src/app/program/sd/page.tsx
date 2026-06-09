import React from 'react';
import Layout from '@/components/Layout/Layout';
import ProgramHero from '@/components/ProgramHero/ProgramHero';
import ProgramBenefits from '@/components/ProgramBenefits/ProgramBenefits';
import ClassDetailsSection from '@/components/ClassDetailsSection/ClassDetailsSection';
import { GiAtom } from "react-icons/gi";
import { MdDateRange, MdGroup, MdOutlineLibraryBooks, MdOutlineTaskAlt } from "react-icons/md";
import { BiHappyAlt } from "react-icons/bi";
import { CiClock1 } from 'react-icons/ci';
import { GoStack } from 'react-icons/go';
import { PiCashRegister } from 'react-icons/pi';

// --- DATA KHUSUS UNTUK HALAMAN SD ---

const sdBenefits = [
  {
    icon: GiAtom, // placeholder
    title: "Fondasi Akademik Kuat",
    description: "Penguasaan konsep dasar Matematika, IPA, dan Bahasa yang mendalam untuk pemahaman jangka panjang, bukan sekadar hafalan.",
  },
  {
    icon: MdOutlineTaskAlt, // placeholder
    title: "Bantuan PR & Ulangan",
    description: "Pendampingan intensif untuk menyelesaikan pekerjaan rumah, tugas, dan persiapan matang menghadapi ulangan harian maupun ujian semester.",
  },
  {
    icon: BiHappyAlt, // placeholder
    title: "Meningkatkan Motivasi Belajar",
    description: "Menciptakan suasana belajar yang positif dan interaktif agar siswa tidak hanya mengejar nilai, tapi juga menyukai proses belajar itu sendiri.",
  },
];

const sdDetails = [
  { icon: GoStack, title: "Jenjang", description: "7 - 13 Tahun (Kelas 1-6 SD)" },
  { icon: CiClock1, title: "Durasi Sesi", description: "60 Menit / pertemuan" },
  { icon: MdDateRange, title: "Durasi Program", description: "Satu bulan" },
  { icon: MdGroup, title: "Tipe dan Kapasitas Kelas", description: "Kelas Reguler & Privat. Kapasitas 15-20 anak" },
  { icon: MdOutlineLibraryBooks, title: "Mata Pelajaran", description: "Matematika, IPA, B. Indonesia, B. Inggris" },
  { icon: PiCashRegister, title: "Pendaftaran", description: "Hubungi kami untuk jadwal kelas yang tersedia." },
];

const SekolahDasarPage = () => {
  return (
    <Layout>
      <ProgramHero
        tag="SEKOLAH DASAR"
        title="Bimbingan Belajar SD yang Menyenangkan"
        description="Membantu siswa-siswi SD memahami materi pelajaran dengan metode yang interaktif dan mudah dipahami, membangun fondasi akademik yang kuat."
        imageSrc="/hero1.svg"
        imageAlt="Anak-anak Sekolah Dasar belajar"
      />
      <ProgramBenefits benefits={sdBenefits} />
      <ClassDetailsSection details={sdDetails} />
    </Layout>
  );
};

export default SekolahDasarPage;