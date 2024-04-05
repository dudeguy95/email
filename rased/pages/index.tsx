import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Content from '../components/Content';
import Stake from '../components/Stake';
import Invite from '../components/Invite';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rased Miner</title>
        <link href="/fav.png" rel="icon" />
        <meta property="og:title" content="Rased Miner" />
        <meta property="og:description" content="The BLAST reward pool with the highest daily return and lowest fee - refer friends and earn more together!" />
        <meta property="og:image" content="/rasedmeta.jpg" />
      </Head>
      <Navbar />
      <Content />
      <Stake />
      <Invite />
      <Footer />
    </div>
  );
};

export default Home;
