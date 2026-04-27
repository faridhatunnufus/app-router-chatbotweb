import React from "react";
import s from "./DetailItemCard.module.css";
import Image from "next/image";
import { IconType } from "react-icons";

interface DetailItemCardProps {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}

const DetailItemCard:React.FC<DetailItemCardProps> = (props) => {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <div className={s.iconWrapper}>
          <props.icon className={s.icon} />
        </div>
        <h4 className={s.title}>{props.title}</h4>
      </div>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};

export default DetailItemCard;