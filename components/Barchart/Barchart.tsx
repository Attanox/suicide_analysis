import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box } from '@chakra-ui/react';
import { getBarData } from './utils/mapping';
import { Attributes, K } from '../../types';

type LocalProps = {
  attributes: Attributes;
  attribute: Array<K | ''>;
};

const Barchart = ({ attribute, attributes }: LocalProps) => {
  const barData = getBarData(attributes, attribute);

  return (
    <Box width="100%" height={`calc(100vh - 50px)`} marginTop="20px">
      <ResponsiveBar
        data={barData}
        keys={['suicides', ...attribute]}
        indexBy="familyId"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'suicides',
            },
            id: 'dots',
          },
          {
            match: {
              id: attribute,
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'country',
        //   legendPosition: 'middle',
        //   legendOffset: 32,
        // }}
        // axisLeft={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'food',
        //   legendPosition: 'middle',
        //   legendOffset: -40,
        // }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
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
