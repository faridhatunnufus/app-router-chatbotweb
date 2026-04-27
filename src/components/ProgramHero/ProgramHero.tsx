import React from "react";
import s from "./ProgramHero.module.css";
import Image from "next/image";

interface ProgramHeroProps {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const ProgramHero = ({
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
}: ProgramHeroProps) => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <div className={s.textContainer}>
          <span className={s.tag}>{tag}</span>
          <h1 className={s.title}>{title}</h1>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.imageContainer}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            className={s.mainImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;