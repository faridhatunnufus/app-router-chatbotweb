import React from 'react';
import s from './ProgramBenefits.module.css';
import BenefitCard from '../BenefitCard/BenefitCard';
import { PiStudent } from "react-icons/pi";
import { IconType } from 'react-icons';

// Definisikan "cetakan" untuk satu item benefit
export interface BenefitType {
  icon: IconType;
  title: string;
  description: string;
}

// Definisikan props untuk komponen utama
interface ProgramBenefitsProps {
  benefits: BenefitType[]; // Komponen ini akan menerima sebuah array of Benefit
}

const ProgramBenefits = ({ benefits }: ProgramBenefitsProps) => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        {/* Sekarang kita me-render data dari props, bukan dari data statis */}
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} icon={benefit.icon} title={benefit.title}>
            {benefit.description}
          </BenefitCard>
        ))}
      </div>
    </section>
  );
};

export default ProgramBenefits;