import * as React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Waffle } from '@nivo/waffle';

import { Attributes, K } from '../../types';
import { getWaffleData } from './utils/mapping';
import WaffleCell from './WaffleCell';

type LocalProps = {
  attributes: Attributes;
  familyId: string;
  total: number;
  attribute: Array<K | ''>;
};

const waffleProps = {
  width: 500,
  height: 500,
  // rows: 15,
  // columns: 15,
  // cellComponent: WaffleCell,
};

const SCHEME = [
  '#ffff99',
  '#8ECAE6',
  '#219EBC',
  '#023047',
  '#FFB703',
  '#FB8500',
];

const WaffleChart = ({
  total,
  attributes,
  familyId,
  attribute,
}: LocalProps) => {
  const waffleData = getWaffleData(attributes, familyId, attribute);

  console.log({ waffleData, total });
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
        Current attribute:{' '}
        <Text as="span" fontSize="lg" color="tomato">
          {attribute.join(', ')}
        </Text>
      </Text>
      <Box display="flex" flexWrap={'wrap'} justifyContent="flex-start">
        {waffleData.map((r, schemeIdx) => {
          return (
            <>
              {Array(r.value)
                .fill(0)
                .map((e, idx) => {
                  return (
                    <Box
                      key={`${e.id}-${idx}`}
                      width={10}
                      height={10}
                      margin={0.5}
                      backgroundColor={SCHEME[schemeIdx]}
                      title={`${r.id}: ${r.value}`}
                    />
                  );
                })}
            </>
          );
        })}
        {Array(total - waffleData[0].value)
          .fill(0)
          .map((e, idx) => {
            return (
              <Box
                key={`${e.id}-${idx}`}
                width={10}
                height={10}
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
