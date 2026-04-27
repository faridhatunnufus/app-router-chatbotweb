import React from 'react';
import s from './ContactPage.module.css';
import { CiMail } from "react-icons/ci";
import { PiWhatsappLogoLight, PiClockLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";

// Data untuk detail kontak
const contactDetails = [
  {
    icon: PiClockLight,
    title: "Jam Operasional",
    text: "Senin - Jumat: 09:30 - 17.00 WIB",
    href: null,
  },
  {
    icon: PiWhatsappLogoLight,
    title: "WhatsApp",
    text: "0858-6814-7285",
    href: "https://wa.me/6285868147285?text=Halo,%20saya%20tertarik%20dengan%20program%20di%20Griya%20Sinau%20Syahir.",
  },
  {
    icon: CiMail,
    title: "Email",
    text: "kutbusyahrir@gmail.com",
    href: "mailto:kutbusyahrir@gmail.com",
  },
  {
    icon: IoLocationOutline,
    title: "Lokasi",
    text: "Desa Sawangan RT 04 RW 03, Kec. Jeruklegi, Kab. Cilacap, Jawa Tengah",
    href: "#map", // Link ini akan scroll ke peta di halaman yang sama
  },
];

const ContactPage = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        {/* Kolom Kiri: Informasi */}
        <div className={s.infoPanel}>
          <h1 className={s.title}>Hubungi Kami</h1>
          <p className={s.subtitle}>
            Kami siap menjawab pertanyaan Anda pada jam kerja. Jangan ragu untuk menghubungi kami melalui salah satu cara di bawah ini.
          </p>
          <div className={s.contactList}>
            {contactDetails.map((item) => (
              <a href={item.href || '#'} key={item.title} className={s.contactItem} target={item.href && !item.href.startsWith('#') ? '_blank' : '_self'} rel="noopener noreferrer">
                <div className={s.iconWrapper}>
                  <item.icon className={s.icon} />
                </div>
                <div className={s.textWrapper}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Peta */}
        <div className={s.mapPanel} id="map">
          {/* GANTI SRC DI BAWAH DENGAN LINK EMBED GOOGLE MAPS ANDA */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.927056348191!2d108.98967750994979!3d-7.593195475000892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65711eae416e5f%3A0xf23a31a1e0b6f34c!2sBIMBEL%20GSS%20Griya%20Sinau%20Syahir!5e1!3m2!1sid!2sid!4v1751851811149!5m2!1sid!2sid"
            className={s.mapEmbed}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;