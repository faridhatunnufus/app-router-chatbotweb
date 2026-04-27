import React from 'react';
import s from './IdealForSection.module.css';
import Image from 'next/image';
import { FaCheck } from "react-icons/fa";

const idealForData = [
  "Membutuhkan bantuan intensif untuk mata pelajaran tertentu.",
  "Sedang mempersiapkan diri untuk ujian, tes masuk, atau olimpiade.",
  "Lebih nyaman dan fokus belajar dalam suasana yang tenang dan personal.",
  "Memiliki jadwal kegiatan padat sehingga sulit mengikuti kelas reguler.",
];

const IdealForSection = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.title}>Program Privat Ini Sangat Ideal Jika Anak Anda:</h2>
        <ul className={s.list}>
          {idealForData.map((item, index) => (
            <li key={index} className={s.listItem}>
              <div className={s.iconWrapper}>
                <FaCheck className={s.icon} />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IdealForSection;