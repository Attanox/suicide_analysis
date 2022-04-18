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
import type { Attributes, K, Structure } from '../types';
import type { Node } from 'relatives-tree/lib/types';
import AttributePicker from '../components/AttributePicker/AttributePicker';

export async function getStaticProps() {
  const familyIds = getFamilyIds();

  return {
    props: {
      attributes: getAttributes(),
      familyIds,
      treeStructure: await getTreeStructure(familyIds[1]),
    },
  };
}

type LocalProps = {
  attributes: Attributes;
  familyIds: string[];
  treeStructure: Node[];
};

const Home: NextPage<LocalProps> = ({
  attributes,
  familyIds,
  treeStructure,
}) => {
  const [familyId, setFamilyId] = useState(familyIds[0]);
  const [attribute, setAttribute] = useState<Array<K | ''>>(['']);

  console.log({ treeStructure });

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
      <Box display="flex">
        <TreeChart nodes={treeStructure} />
        <AttributePicker
          attributes={Object.keys(attributes[0]) as K[]}
          setAttribute={setAttribute}
        />
      </Box>
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
