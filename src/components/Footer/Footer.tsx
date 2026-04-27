import React from 'react';
import s from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

// "Beranda" dihapus dari array ini karena sekarang menjadi judul kolom
const mainLinks = [
  { label: "Program", href: "/program" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Testimoni", href: "/#testimonials" },
  { label: "Daftar", href: "/daftar" },
  { label: "Kontak", href: "/kontak" },
];

const programLinks = [
  { label: "Pra Sekolah", href: "/program/prasekolah" },
  { label: "Sekolah Dasar", href: "/program/sd" },
  { label: "Sekolah Menengah Pertama", href: "/program/smp" },
  { label: "Sekolah Menengah Atas", href: "/program/sma" },
];

const Footer = () => {
  const Logo = () => (
    <Link href="/" className={s.logoContainer}>
      <Image
        src="/logo-illust.png"
        alt="Griya Sinau Syahir Logo"
        width={45}
        height={45}
      />
      <span className={s.logoText}>
        Griya <span className={s.highlightText}>Sinau</span> Syahir
      </span>
    </Link>
  );

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        {/* Kolom 1: Link Utama dengan Judul "Beranda" */}
        <div className={s.column}>
          <h4>
            <Link href="/">Beranda</Link>
          </h4>
          <ul className={s.linkList}>
            {mainLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 2: Link Program */}
        <div className={s.column}>
          <h4>
            <Link href="/#programkami">Program</Link>
          </h4>
          <ul className={s.linkList}>
            {programLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Logo dan Copyright */}
        <div className={s.columnRight}>
          <Logo />
          <p className={s.copyright}>
            &copy; Griya Sinau Syahir {new Date().getFullYear()}, All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;