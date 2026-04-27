import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import RegistrationProcedure from '@/components/RegistrationProcedure/RegistrationProcedure'; // <-- Import komponen baru

const DaftarPage = () => {
  return (
    <Layout>
      <Head>
        <title>Cara Mendaftar - Griya Sinau Syahir</title>
        <meta
          name="description"
          content="Ikuti tata cara pendaftaran mudah untuk bergabung dengan program bimbingan belajar di Griya Sinau Syahir."
        />
      </Head>
      <RegistrationProcedure /> {/* <-- Gunakan komponen baru */}
    </Layout>
  );
};

export default DaftarPage;