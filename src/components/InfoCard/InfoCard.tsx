import React from "react";
import s from "./InfoCard.module.css";
import Image from "next/image";
import classNames from "classnames";
import { IconType } from "react-icons";

type CardVariant = "green" | "orange" | "purple";

export interface InfoCardProps {
  icon: IconType;
  title: string;
  ageRange: string;
  description: string;
  variant: CardVariant;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const cardClasses = classNames(s.card, s[props.variant]);
  const ageClasses = classNames(s.ageRange, s[`age_${props.variant}`]);

  return (
    <div className={cardClasses}>
      <div className={s.imageWrapper}>
        <props.icon className={s.icon} />
      </div>
      <h3 className={s.title}>{props.title}</h3>
      <p className={ageClasses}>{props.ageRange}</p>
      <p className={s.description}>{props.description}</p>
    </div>
  );
};

export default InfoCard;