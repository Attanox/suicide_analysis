import * as React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Waffle } from '@nivo/waffle';

import { Attributes, Datum, K, TNode } from '../../types';
import { getWaffleData } from './utils/mapping';
import WaffleCell from './WaffleCell';
import { getColor } from '../../utils/mapping';
import Quarters from '../Quarters';

type LocalProps = {
  attributes: Attributes;
  familyId: string;
  total: number;
  selectedAttributes: Array<K | ''>;
  subtree: TNode[];
};

const waffleProps = {
  width: 500,
  height: 500,
  // rows: 15,
  // columns: 15,
  // cellComponent: WaffleCell,
};

const getSortedAttributes = (
  selectedAttributes: Array<K | ''>,
  familyData: Datum[]
) => {
  let res = familyData;

  const compare = (a: Datum, b: Datum, s: K | '') => {
    if (s && Number(a[s]) < Number(b[s])) return -1;
    if (s && Number(a[s]) > Number(b[s])) return 1;
    return 0;
  };

  selectedAttributes.forEach((s) => {
    if (s) {
      res = res.sort((a, b) => compare(a, b, s));
    }
  });

  return res;
};

const WaffleChart = ({
  total,
  attributes,
  familyId,
  selectedAttributes,
  subtree,
}: LocalProps) => {
  const waffleData = getWaffleData(
    attributes,
    familyId,
    selectedAttributes,
    subtree
  );
  const subtreeIds = subtree.map((_) => _.id);

  const familyData = attributes.filter(
    (d) => d.kindred === familyId && subtreeIds.includes(d.personId)
  );

  const sortedAttributes = getSortedAttributes(selectedAttributes, familyData);

  return (
    <Box
      width="100%"
      height={`calc(100vh - 50px)`}
      marginTop="20px"
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="lg" style={{ marginBottom: '10px' }}>
        Current attributes:{' '}
        {selectedAttributes.map((s, idx) => {
          const wd = waffleData.find((w) => w.id === s);
          return (
            <React.Fragment key={s}>
              <Text
                letterSpacing={1}
                fontWeight={700}
                as="span"
                fontSize="lg"
                color={getColor(s)}
              >
                {s} {wd && `(${wd.value})`}
              </Text>
              {idx + 1 === selectedAttributes.length ? '' : ','}{' '}
            </React.Fragment>
          );
        })}
      </Text>
      <Box display="flex" flexWrap={'wrap'} justifyContent="flex-start">
        {Array(waffleData[0].value)
          .fill(0)
          .map((e, idx) => {
            return (
              <Box
                key={`${e.id}-${idx}`}
                width={7}
                height={7}
                margin={0.5}
                border="3px solid #1f1f1f"
                title={`${waffleData[0].id}: ${waffleData[0].value}/${total}`}
                position="relative"
              >
                <Quarters
                  nodeAttributes={sortedAttributes[idx]}
                  selectedAttributes={selectedAttributes}
                  arrowClass="waffle"
                />
              </Box>
            );
          })}
        {Array(total - waffleData[0].value)
          .fill(0)
          .map((e, idx) => {
            return (
              <Box
                key={`${e.id}-${idx}`}
                width={7}
                height={7}
                margin={0.5}
                backgroundColor="#cacaca"
              />
            );
          })}
      </Box>
      {/* <Waffle {...waffleProps} data={waffleData} total={total} /> */}
    </Box>
  );
};

export default WaffleChart;
