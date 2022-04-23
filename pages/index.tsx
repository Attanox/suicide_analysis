import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import Barchart from '../components/Barchart/Barchart';
import FamilyPicker from '../components/FamilyPicker/FamilyPicker';
import Heatmap from '../components/Heatmap/Heatmap';
import TreeChart from '../components/Tree/Tree';
import WaffleChart from '../components/Waffle/WaffleChart';
import styles from '../styles/Home.module.css';
import {
  getFamilyIds,
  getAttributes,
  getTotal,
  getTreeStructure,
} from '../utils/mapping';

import type { NextPage } from 'next';
import type { Attributes, K, Structure, TNode } from '../types';
import AttributePicker from '../components/AttributePicker/AttributePicker';

export async function getStaticProps() {
  const familyIds = getFamilyIds();

  return {
    props: {
      attributes: getAttributes(),
      familyIds,
      treeStructure: getTreeStructure(familyIds[2]),
    },
  };
}

type LocalProps = {
  attributes: Attributes;
  familyIds: string[];
  treeStructure: TNode[];
};

const MAX_SELECTED = 5;

const Home: NextPage<LocalProps> = ({
  attributes,
  familyIds,
  treeStructure,
}) => {
  const [familyId, setFamilyId] = useState(familyIds[2]);
  const [selectedAttributes, setSelectedAttributes] = useState<Array<K | ''>>(
    []
  );

  const onChangeFamily = (id: string) => {
    setFamilyId(id);
  };

  const onChangeAttribute = (newAttr: Array<K | ''>) => {
    const limited = newAttr.slice(0, MAX_SELECTED);
    setSelectedAttributes(limited);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Suicides</title>
      </Head>
      <FamilyPicker
        familyIds={familyIds}
        setFamilyId={onChangeFamily}
        familyId={familyId}
      />
      <Box display="block" height="1em" width="100%" />
      <Box
        display="flex"
        height={`calc(100vh - 50px)`}
        justifyContent="space-between"
        alignItems="center"
      >
        <TreeChart
          selectedAttributes={selectedAttributes}
          initialNodes={treeStructure}
          familyId={familyId}
        />
        <Box display="inline-block" width="50px" />
        <AttributePicker
          attributes={attributes}
          setAttribute={onChangeAttribute}
          selectedAttributes={selectedAttributes}
        />
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Heatmap
          attributes={attributes}
          setAttribute={onChangeAttribute}
          familyId={familyId}
        />
        <WaffleChart
          total={getTotal(familyId)}
          attributes={attributes}
          familyId={familyId}
          selectedAttributes={selectedAttributes}
        />
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Barchart
          attributes={attributes}
          selectedAttributes={selectedAttributes}
        />
      </Box>
    </div>
  );
};

export default Home;
