import React, { useContext, useEffect } from 'react';
import Carousel from '../components/layout/carrosel/Carousel';
import styles from './Home.module.css';
import Card from '../components/layout/Cards/Card';
import { Context } from '../context/context';

const Home = () => {
  const { allEventos, fetchAllEventos } = useContext(Context);

  useEffect(() => {
    fetchAllEventos(); 
  }, []);

  return (
    <div className={styles.container}>
      <Carousel />
      <h1>EVENTOS</h1>
      <Card evento={allEventos} />
    </div>
  );
};

export default Home;
