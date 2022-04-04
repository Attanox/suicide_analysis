import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Barchart from '../components/Barchart/Barchart';
import FamilyPicker from '../components/FamilyPicker/FamilyPicker';
import Heatmap from '../components/Heatmap/Heatmap';
import WaffleChart from '../components/Waffle/WaffleChart';
import styles from '../styles/Home.module.css';
import { Attributes, K } from '../types';
import { getFamilyIds, getAttributes, getTotal } from '../utils/mapping';

export async function getStaticProps() {
  return {
    props: {
      attributes: getAttributes(),
      familyIds: getFamilyIds(),
    },
  };
}

type LocalProps = {
  attributes: Attributes;
  familyIds: string[];
};

const Home: NextPage<LocalProps> = ({ attributes, familyIds }) => {
  const [familyId, setFamilyId] = useState(familyIds[0]);
  const [attribute, setAttribute] = useState<K | ''>('');

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
      <Box display="flex" alignItems={'center'}>
        <Heatmap
          attributes={attributes}
          setAttribute={setAttribute}
          familyId={familyId}
        />
        <WaffleChart
          total={getTotal(familyId)}
          attributes={attributes}
          familyId={familyId}
          attribute={attribute}
        />
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Barchart attributes={attributes} attribute={attribute} />
      </Box>
    </div>
  );
};

export default Home;
