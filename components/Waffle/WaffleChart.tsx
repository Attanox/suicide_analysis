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
  attribute: K | '';
};

const waffleProps = {
  width: 500,
  height: 500,
  rows: 15,
  columns: 15,
  cellComponent: WaffleCell,
};

const WaffleChart = ({
  total,
  attributes,
  familyId,
  attribute,
}: LocalProps) => {
  const waffleData = getWaffleData(attributes, familyId, attribute);

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
          {attribute}
        </Text>
      </Text>
      <Waffle {...waffleProps} data={waffleData} total={total} />
    </Box>
  );
};

export default WaffleChart;
