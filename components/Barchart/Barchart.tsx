import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box } from '@chakra-ui/react';
import { getBarData } from './utils/mapping';
import { Attributes, K } from '../../types';
import { getColor } from '../../utils/mapping';

type LocalProps = {
  attributes: Attributes;
  selectedAttributes: Array<K | ''>;
};

const Barchart = ({ selectedAttributes, attributes }: LocalProps) => {
  const barData = getBarData(attributes, selectedAttributes);

  return (
    <Box width="100%" height={`calc(100vh - 50px)`} marginTop="20px">
      <ResponsiveBar
        data={barData}
        keys={['suicides', ...selectedAttributes]}
        indexBy="familyId"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#1f1f1f', ...selectedAttributes.map((s) => getColor(s))]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={'white'}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Status of all families"
        // barAriaLabel={function (e) {
        //   return (
        //     e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        //   );
        // }}
      />
    </Box>
  );
};

export default Barchart;
