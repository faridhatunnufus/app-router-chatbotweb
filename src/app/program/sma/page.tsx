import React from 'react';
import Layout from '@/components/Layout/Layout';
import ProgramHero from '@/components/ProgramHero/ProgramHero';
import ProgramBenefits, { BenefitType } from '@/components/ProgramBenefits/ProgramBenefits';
import ClassDetailsSection from '@/components/ClassDetailsSection/ClassDetailsSection';
import { PiStudent, PiExam } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import { MdDateRange, MdGroup, MdOutlineLibraryBooks, MdOutlineTaskAlt } from "react-icons/md";
import { CiClock1 } from 'react-icons/ci';
import { GoStack } from 'react-icons/go';
import { PiCashRegister } from 'react-icons/pi';

// --- DATA KHUSUS UNTUK HALAMAN SMA ---

const smaBenefits: BenefitType[] = [
  {
    icon: MdOutlineTaskAlt , // placeholder
    title: "Fokus Target UTBK-SNBT",
    description: "Drilling ribuan soal HOTS, strategi pengerjaan cepat dan tepat, serta update materi terbaru sesuai dengan format tes setiap tahunnya.",
  },
  {
    icon: SlChemistry, // placeholder
    title: "Bimbingan Pilih Jurusan",
    description: "Sesi konsultasi untuk membantu siswa menemukan jurusan dan Perguruan Tinggi Negeri (PTN) yang paling sesuai dengan minat dan bakat.",
  },
  {
    icon: PiExam, // placeholder
    title: "Simulasi Ujian Realistis",
    description: "Mengadakan Try Out berkala dengan sistem penilaian dan suasana yang dirancang semirip mungkin dengan UTBK sesungguhnya.",
  },
];

const smaDetails = [
    { icon: GoStack, title: "Jenjang", description: "16 - 18 Tahun (Kelas 10-12 SMA)" },
    { icon: CiClock1, title: "Durasi Sesi", description: "60 Menit / pertemuan" },
    { icon: MdDateRange, title: "Durasi Program", description: "Satu bulan" },
    { icon: MdGroup, title: "Tipe dan Kapasitas Kelas", description: "Kelas Reguler & Privat. Kapasitas 15-20 anak" },
    { icon: MdOutlineLibraryBooks, title: "Mata Pelajaran", description: "TPS, Literasi, Matematika, Saintek" },
    { icon: PiCashRegister, title: "Pendaftaran", description: "Pendaftaran paket intensif UTBK telah dibuka." },
];

const SmaPage = () => {
  return (
    <Layout>
      <ProgramHero
        tag="SEKOLAH MENENGAH ATAS"
        title="Raih Kampus Impianmu Bersama Kami"
        description="Program intensif SMA dirancang khusus untuk memaksimalkan potensi siswa dalam menghadapi UTBK-SNBT dan meraih kursi di PTN favorit."
        imageSrc="/sma.svg"
        imageAlt="Siswa SMA fokus belajar untuk ujian"
      />
      
      <ProgramBenefits benefits={smaBenefits} />
      <ClassDetailsSection details={smaDetails} />
    </Layout>
  );
};

export default SmaPage;