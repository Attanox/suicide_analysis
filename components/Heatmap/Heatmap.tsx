import * as React from 'react';
import { Data } from '../../types';
import { getHeatMapData } from './utils/mapping';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Box } from '@chakra-ui/react';

type LocalProps = {
  mappedData: Data;
  familyId: string;
};

const CustomCell = ({
  value,
  x,
  y,
  width,
  height,
  color,
  opacity,
  borderWidth,
  borderColor,
  textColor,
}: any) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      transform={`rotate(${value < 50 ? 180 : 0})`}
      fill={color}
      fillOpacity={opacity}
      strokeWidth={borderWidth}
      stroke={borderColor}
      d={`
                M0 -${Math.round(height / 2)}
                L${Math.round(width / 2)} ${Math.round(height / 2)}
                L-${Math.round(width / 2)} ${Math.round(height / 2)}
                L0 -${Math.round(height / 2)}
            `}
    />
    <text
      dominantBaseline="central"
      textAnchor="middle"
      style={{ fill: textColor }}
      dy={value < 50 ? -6 : 6}
    >
      {value}
    </text>
  </g>
);

const Heatmap = (props: LocalProps) => {
  const heatMapData = getHeatMapData(props.mappedData, props.familyId);

  const firstObj: any = { ...props.mappedData[0] };
  delete firstObj['id'];
  delete firstObj['kindred'];
  delete firstObj['suicide'];
  const keys = Object.keys(firstObj);

  console.log({ heatMapData });

  return (
    <Box height={1000} marginTop="20px">
      <ResponsiveHeatMap
        data={heatMapData}
        keys={keys}
        indexBy="id"
        // colors="GnBu"
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        // forceSquare={true}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: '',
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'person',
          legendPosition: 'middle',
          legendOffset: -72,
        }}
        cellOpacity={1}
        cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        labelTextColor={'white'}
        animate={true}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.25}
      />
    </Box>
  );
};

export default Heatmap;
