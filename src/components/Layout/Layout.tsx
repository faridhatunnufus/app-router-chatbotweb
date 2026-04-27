import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import s from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={s.mainContent}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;