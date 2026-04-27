import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import AboutPage from '@/components/AboutPage/AboutPage'; // Import komponen baru kita

const TentangKami = () => {
  return (
    <Layout>
      <Head>
        <title>Tentang Kami - Griya Sinau Syahir</title>
        <meta
          name="description"
          content="Pelajari sejarah, visi, misi, dan tujuan Griya Sinau Syahir dalam menciptakan lingkungan belajar yang modern dan mendidik dari hati."
        />
      </Head>
      <AboutPage />
    </Layout>
  );
};

export default TentangKami;