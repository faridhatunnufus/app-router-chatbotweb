import React from 'react';
import Layout from '@/components/Layout/Layout';
import ProgramHero from '@/components/ProgramHero/ProgramHero';
import ProgramBenefits, { BenefitType } from '@/components/ProgramBenefits/ProgramBenefits';
import ClassDetailsSection, { DetailProps } from '@/components/ClassDetailsSection/ClassDetailsSection';
import { BiMath } from "react-icons/bi";
import { TbHorseToy } from "react-icons/tb";
import { RiSpeakAiFill } from "react-icons/ri";
import { MdDateRange, MdGroups } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { FaChildReaching } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { PiCashRegister } from "react-icons/pi";

// --- DATA KHUSUS UNTUK HALAMAN PRASEKOLAH ---

const praSekolahBenefits:BenefitType[] = [
  {
    icon: TbHorseToy,
    title: "Belajar Sambil Bermain",
    description: "Menggunakan metode permainan edukatif untuk menstimulasi motorik halus, sosialisasi, dan kreativitas anak sejak dini.",
  },
  {
    icon: BiMath,
    title: "Persiapan Masuk SD",
    description: "Pengenalan calistung (baca, tulis, hitung) dasar secara bertahap dan menyenangkan, membangun fondasi yang kuat.",
  },
  {
    icon: RiSpeakAiFill,
    title: "Membangun Kepercayaan Diri",
    description: "Mendorong anak untuk berani berekspresi, bertanya, dan mandiri dalam lingkungan belajar yang aman dan mendukung.",
  },
];

const praSekolahDetails: DetailProps[] = [
  { icon: FaChildReaching, title: "Usia", description: "4 - 6 Tahun" },
  { icon: CiClock1, title: "Durasi Kelas", description: "60 Menit / pertemuan" },
  { icon: MdDateRange, title: "Durasi Program", description: "Satu bulan" },
  { icon: MdGroups, title: "Kapasitas", description: "15-20 anak" },
  { icon: IoLocationOutline, title: "Lokasi", description: "Griya Sinau Syahir" },
  { icon: PiCashRegister, title: "Tipe Kelas", description: "Umum" },
  /* Tambahkan Kolom Harga, ganti ikon tipe kelas*/
];


const PraSekolahPage = () => {
  return (
    <Layout>
      <ProgramHero
        tag="PRASEKOLAH"
        title="Pendidikan Pra Sekolah Terbaik untuk si Kecil"
        description="Program prasekolah kami dirancang untuk menumbuhkan rasa ingin tahu, kreativitas, dan kecintaan belajar sejak dini."
        imageSrc="/prasekolah.svg"
        imageAlt="Anak-anak di prasekolah"
      />
      
      {/* Kirim data sebagai props ke komponen */}
      <ProgramBenefits benefits={praSekolahBenefits} />
      <ClassDetailsSection details={praSekolahDetails} />
    </Layout>
  );
};

export default PraSekolahPage;