import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import FamilyPicker from '../components/FamilyPicker/FamilyPicker';
import Heatmap from '../components/Heatmap/Heatmap';
import WaffleChart from '../components/Waffle/WaffleChart';
import styles from '../styles/Home.module.css';
import { Data } from '../types';
import { getFamilyIds, getMappedData } from '../utils/mapping';

export async function getStaticProps() {
  return {
    props: {
      mappedData: getMappedData(),
      familyIds: getFamilyIds(),
    },
  };
}

type LocalProps = {
  mappedData: Data;
  familyIds: string[];
};

const Home: NextPage<LocalProps> = ({ mappedData, familyIds }) => {
  const [familyId, setFamilyId] = useState(familyIds[0]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Suicides</title>
      </Head>
      <FamilyPicker
        familyIds={familyIds}
        setFamilyId={setFamilyId}
        familyId={familyId}
      />
      <Heatmap mappedData={mappedData} familyId={familyId} />
      <WaffleChart />
    </div>
  );
};

export default Home;
