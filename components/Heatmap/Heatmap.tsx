import * as React from 'react';
import { Attributes, K } from '../../types';
import { getHeatMapData } from './utils/mapping';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Box } from '@chakra-ui/react';
import { getDisplayAttributes } from '../../utils/mapping';

type LocalProps = {
  attributes: Attributes;
  familyId: string;
  setAttribute: (a: Array<K | ''>) => void;
};

const Heatmap = (props: LocalProps) => {
  const heatMapData = getHeatMapData(props.attributes, props.familyId);

  const keys = getDisplayAttributes(props.attributes);

  return (
    <Box width="100%" height={`calc(100vh - 50px)`} marginTop="20px">
      <ResponsiveHeatMap
        data={heatMapData}
        keys={keys}
        indexBy="id"
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        forceSquare={true}
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
        labelTextColor={'transparent'}
        animate={true}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.25}
        onClick={(datum, event) =>
          props.setAttribute([String(datum.xKey) as K])
        }
      />
    </Box>
  );
};

const areEqual = (prevProps: LocalProps, nextProps: LocalProps) => {
  return prevProps.familyId === nextProps.familyId;
};

export default React.memo(Heatmap, areEqual);
