import React from 'react';
import s from './CTASection.module.css';
import Button from '../Button/Button';

const CTASection = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.title}>Siap Memberikan yang Terbaik untuk Pendidikan Anak Anda?</h2>
        <p className={s.description}>
          Mari diskusikan kebutuhan belajar anak Anda bersama kami. Jadwalkan sesi konsultasi gratis sekarang untuk merancang program privat yang paling efektif.
        </p>
        <div className={s.buttonWrapper}>
          <Button href="/kontak" variant="primary">
            Jadwalkan Konsultasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;