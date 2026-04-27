// components/Navbar/Navbar.tsx
"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import s from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

// (Interface tidak berubah)
interface SubMenuItem {
  label: string;
  href: string;
}
interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  submenu?: SubMenuItem[];
}

// (Data navLinks tidak berubah)
const navLinks: NavLink[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Program",
    href: "/#programkami",
    hasDropdown: true,
    submenu: [
      { label: "Program Pra Sekolah", href: "/program/prasekolah" },
      { label: "Program Sekolah Dasar", href: "/program/sd" },
      { label: "Program SMP/sederajat", href: "/program/smp" },
      { label: "Program SMA/sederajat", href: "/program/sma" },
      { label: "Program Privat", href: "/program/privat" },
    ],
  },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Testimoni", href: "/#testimonial" },
  { label: "Kontak", href: "/kontak" },
  { label: "Daftar", href: "/daftar" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 1. State baru untuk mengontrol dropdown di mobile
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const router = useRouter();

  const path = usePathname() || "";

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null); // Reset dropdown saat menu ditutup
  };

  // 2. Fungsi untuk toggle dropdown
  const handleDropdownToggle = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null); // Tutup jika sudah terbuka
    } else {
      setOpenDropdown(label); // Buka jika masih tertutup
    }
  };

  return (
    <nav className={s.navbarWrapper}>
      <div className={s.container}>
        {/* ... Bagian Logo dan Navigasi Desktop tetap sama ... */}
        <Link href="/" className={s.logo} onClick={closeMenu}>
          <Image
            src="/logo-illust.png"
            alt="Griya Sinau Syahir Logo"
            width={40}
            height={40}
          />
          <span className={s.logoText}>
            Griya <span className={s.highlightText}>Sinau</span> Syahir
          </span>
        </Link>
        <div className={s.desktopNav}>
          <ul className={s.navList}>
            {navLinks.map((link) => {
              const currentPath = path;
              const isActive =
                link.label === "Program"
                  ? currentPath.startsWith("/program")
                  : currentPath === link.href;
              return (
                <li key={link.label} className={s.navItem}>
                  <Link
                    href={link.href}
                    className={classNames(s.navLink, {
                      [s.activeLink]: isActive,
                    })}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <span className={s.dropdownArrow}></span>
                    )}
                  </Link>
                  {link.hasDropdown && (
                    <div className={s.dropdownMenu}>
                      <ul className={s.dropdownList}>
                        {link.submenu?.map((item) => (
                          <li key={item.label} className={s.dropdownItem}>
                            <Link href={item.href} className={s.dropdownLink}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className={s.hamburgerButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Buka atau tutup menu"
          aria-expanded={isMenuOpen}
        >
          <div
            className={classNames(s.hamburgerLine, s.line1, {
              [s.menuOpen]: isMenuOpen,
            })}
          ></div>
          <div
            className={classNames(s.hamburgerLine, s.line2, {
              [s.menuOpen]: isMenuOpen,
            })}
          ></div>
          <div
            className={classNames(s.hamburgerLine, s.line3, {
              [s.menuOpen]: isMenuOpen,
            })}
          ></div>
        </button>
      </div>

      {/* --- PERUBAHAN UTAMA DI SINI (MOBILE MENU) --- */}
      <div className={classNames(s.mobileMenu, { [s.menuOpen]: isMenuOpen })}>
        <ul className={s.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.label} className={s.mobileNavItem}>
              {link.hasDropdown ? (
                // Jika punya dropdown, buat menjadi tombol
                <button
                  className={s.mobileDropdownToggle}
                  onClick={() => handleDropdownToggle(link.label)}
                >
                  {link.label}
                  <span
                    className={classNames(s.mobileDropdownArrow, {
                      [s.arrowOpen]: openDropdown === link.label,
                    })}
                  ></span>
                </button>
              ) : (
                // Jika tidak, tetap menjadi link biasa
                <Link
                  href={link.href}
                  className={s.mobileLink}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )}

              {/* Tampilkan submenu jika dropdown-nya terbuka */}
              {link.hasDropdown && openDropdown === link.label && (
                <ul className={s.mobileSubmenu}>
                  {link.submenu?.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={s.mobileSubmenuLink}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;