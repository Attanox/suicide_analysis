import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { useCallback, useState } from 'react';
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
      treeStructure: getTreeStructure(familyIds[0]),
    },
  };
}

type LocalProps = {
  attributes: Attributes;
  familyIds: string[];
  treeStructure: TNode[];
};

const MAX_SELECTED = 4;

const Home: NextPage<LocalProps> = ({
  attributes,
  familyIds,
  treeStructure,
}) => {
  const [familyId, setFamilyId] = useState(familyIds[0]);
  const [selectedAttributes, setSelectedAttributes] = useState<Array<K | ''>>(
    []
  );
  const [subtree, setSubtree] = useState<TNode[]>([]);

  const onChangeFamily = (id: string) => {
    setFamilyId(id);
    setSelectedAttributes([]);
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
      <Box
        className={styles.containerChild}
        display="flex"
        height={`calc(100vh)`}
        alignItems="center"
        paddingTop="60px"
      >
        <TreeChart
          selectedAttributes={selectedAttributes}
          initialNodes={treeStructure}
          familyId={familyId}
          setSubtree={setSubtree}
        />
        <AttributePicker
          attributes={attributes}
          setAttribute={onChangeAttribute}
          selectedAttributes={selectedAttributes}
        />
      </Box>
      <Box
        className={styles.containerChild}
        display="flex"
        alignItems={'center'}
        height={`calc(100vh)`}
        paddingTop="60px"
      >
        <Heatmap
          attributes={attributes}
          setAttribute={onChangeAttribute}
          familyId={familyId}
          subtree={subtree}
        />
        <WaffleChart
          total={getTotal(familyId)}
          attributes={attributes}
          familyId={familyId}
          selectedAttributes={selectedAttributes}
          subtree={subtree}
        />
      </Box>
      <Box
        className={styles.containerChild}
        display="flex"
        alignItems={'center'}
        height={`calc(100vh)`}
      >
        <Barchart
          attributes={attributes}
          selectedAttributes={selectedAttributes}
        />
      </Box>
    </div>
  );
};

export default Home;
