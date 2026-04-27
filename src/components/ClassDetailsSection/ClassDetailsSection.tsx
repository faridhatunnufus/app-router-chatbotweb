import React from "react";
import s from "./ClassDetailsSection.module.css";
import DetailItemCard from "../DetailItemCard/DetailItemCard";
import Image from "next/image";
import { IconType } from "react-icons";

// Definisikan "cetakan" untuk satu item detail
export interface DetailProps {
  icon: IconType;
  title: string;
  description: string;
}

// Definisikan props untuk komponen utama
interface ClassDetailsProps {
  details: DetailProps[]; // Menerima array of Detail
}

const ClassDetailsSection = ({ details }: ClassDetailsProps) => {
  return (
    <section className={s.wrapper}>
      <div className={s.backgroundGraphics}>
        <div className={s.bgImage}>
          {/*           <Image src="/gambar-detail-anak.png" alt="" layout="fill" objectFit="cover" /> */}
        </div>
        <div className={s.greenCircle}></div>
        <div className={s.orangeCircle}></div>
      </div>

      <div className={s.container}>
        <h2 className={s.title}>Detail Kelas</h2>
        <div className={s.grid}>
          {/* Render data dari props */}
          {details.map((item) => (
            <DetailItemCard
              key={item.title}
              icon={item.icon}
              title={item.title}
            >
              <p>{item.description}</p>
            </DetailItemCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassDetailsSection;
