 import React from 'react';
import Layout from '@/components/Layout/Layout';
import ProgramHero from '@/components/ProgramHero/ProgramHero';
import ProgramBenefits from '@/components/ProgramBenefits/ProgramBenefits';
import IdealForSection from '@/components/IdealForSection/IdealForSection';
import ClassDetailsSection from '@/components/ClassDetailsSection/ClassDetailsSection';
import CTASection from '@/components/CTASection/CTASection';
import { PiStudent } from "react-icons/pi";
import { GrSchedules } from "react-icons/gr";
import { FaBarsProgress } from "react-icons/fa6";
import { GoStack } from "react-icons/go";
import { MdOutlineLibraryBooks, MdGroup  } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { PiCashRegister } from "react-icons/pi";
// --- DATA KHUSUS UNTUK HALAMAN PROGRAM PRIVAT ---

const privatBenefits = [
  {
    icon: PiStudent, // placeholder
    title: "Kurikulum Personal",
    description: "Materi, kecepatan, dan gaya mengajar disesuaikan sepenuhnya dengan kemampuan dan target belajar unik setiap siswa.",
  },
  {
    icon: GrSchedules, // placeholder
    title: "Jadwal Fleksibel",
    description: "Atur jadwal belajar yang paling sesuai dengan kesibukan anak Anda, tanpa terikat jadwal kelas reguler yang kaku.",
  },
  {
    icon: FaBarsProgress, // placeholder
    title: "Perkembangan Terpantau",
    description: "Orang tua mendapatkan laporan perkembangan belajar anak secara rutin dan mendetail langsung dari tutor.",
  },
];

const privatDetails = [
  { icon: GoStack, title: "Jenjang", description: "Semua Jenjang (SD, SMP, dan SMA)" },
  { icon: MdOutlineLibraryBooks, title: "Mata Pelajaran", description: "Matematika, Fisika, Kimia, Bahasa, dll." },
  { icon: CiClock1, title: "Durasi Sesi", description: "90 atau 120 Menit (Dapat Disesuaikan)" },
  { icon: MdGroup, title: "Tipe Kelas", description: "1 Siswa per 1 Tutor (atau Grup Kecil)" },
  { icon: IoLocationOutline, title: "Lokasi Belajar", description: "Di Griya Sinau Syahir atau di Rumah Siswa" },
  { icon: PiCashRegister, title: "Pendaftaran", description: "Hubungi kami untuk penjadwalan." },
];
// --- --------------------------------------- ---

const ProgramPrivatPage = () => {
  return (
    <Layout>
      <ProgramHero
        tag="PROGRAM PRIVAT"
        title="Pembelajaran Eksklusif, Sesuai Kebutuhan Anak Anda"
        description="Dapatkan perhatian penuh dari tutor terbaik kami dengan kurikulum yang dirancang khusus untuk mengejar target akademis Anda."
        imageSrc="/privat.svg"
        imageAlt="Sesi belajar privat"
      />

      {/* Kirim data yang baru dibuat sebagai props */}
      <ProgramBenefits benefits={privatBenefits} />
      
      <IdealForSection />
      
      {/* Kirim data yang baru dibuat sebagai props */}
      <ClassDetailsSection details={privatDetails} />
      
      <CTASection />
    </Layout>
  );
};

export default ProgramPrivatPage;