import React from "react";
import s from "./BenefitCard.module.css";
import Image from "next/image";
import { IconType } from "react-icons";

interface BenefitCardProps {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}
// 

const BenefitCard: React.FC<BenefitCardProps> = (props) => {
  return (
    <div className={s.card}>
      <div className={s.iconWrapper}>
        <props.icon className={s.icon} />
      </div>
      <h3 className={s.title}>{props.title}</h3>
      <p className={s.description}>{props.children}</p>
    </div>
  );
};

export default BenefitCard;