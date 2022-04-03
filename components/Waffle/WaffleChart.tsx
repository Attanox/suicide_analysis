import { Box } from '@chakra-ui/react';
import { Waffle } from '@nivo/waffle';
import * as React from 'react';

const total = 200;
const data = [
  {
    id: 'men',
    label: 'men',
    value: 64,
    color: '#468df3',
  },
  {
    id: 'women',
    label: 'women',
    value: 72,
    color: '#a053f0',
  },
];
const commonProps = {
  width: 900,
  height: 500,
  total,
  data,
  rows: 24,
  columns: 18,
};

const WaffleChart = () => {
  return (
    <Box height={1000}>
      <Waffle {...commonProps} />
    </Box>
  );
};

export default WaffleChart;
