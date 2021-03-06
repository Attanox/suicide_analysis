import * as React from 'react';
import { Attributes, K, TNode } from '../../types';
import { getHeatMapData, getSumData } from './utils/mapping';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Box } from '@chakra-ui/react';
import { getColor, getDisplayAttributes } from '../../utils/mapping';

import styles from '../../styles/Heatmap.module.css';

type LocalProps = {
  attributes: Attributes;
  familyId: string;
  setAttribute: (a: Array<K | ''>) => void;
  subtree: TNode[];
};

const getCellColor = (value: number, key: string) => {
  return value ? getColor(key) : '#cacaca';
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
  data,
  onClick,
  onHover,
  onLeave,
  ...rest
}: any) => {
  if (data.value === null) return null;

  return (
    <g transform={`translate(${x - 10}, ${y - 10})`}>
      <rect
        width={width}
        height={height}
        x={0}
        y={0}
        fill={getCellColor(data.value, data.xKey)}
        strokeWidth={borderWidth}
        stroke={borderColor}
        opacity={opacity}
        onClick={(event) => onClick(data, event)}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
    </g>
  );
};

const Heatmap = (props: LocalProps) => {
  const heatMapData = getHeatMapData(
    props.attributes,
    props.familyId,
    props.subtree
  );

  // const sumData = getSumData(props.attributes, props.familyId, props.subtree);

  const keys = getDisplayAttributes(props.attributes);

  return (
    <Box
      className={styles.container}
      id="responsiveHeatmapWrapper"
      width="100%"
      height={`calc(100vh - 50px)`}
      marginTop="20px"
    >
      <ResponsiveHeatMap
        data={heatMapData}
        keys={keys}
        indexBy="id"
        margin={{ top: 170, right: 90, bottom: 60, left: 90 }}
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
          legendOffset: -142,
        }}
        cellOpacity={1}
        cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        enableLabels={false}
        animate={false}
        cellShape={CustomCell}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.25}
        onClick={(data, event) => {
          props.setAttribute([data.xKey as K]);
        }}
        tooltip={({ xKey, yKey, value }) => (
          <strong style={{ color: getCellColor(value, xKey as string) }}>
            {xKey} / {yKey}: {value}
          </strong>
        )}
      />
    </Box>
  );
};

const subtreesEqual = (prevSubtree: TNode[], nextSubtree: TNode[]) => {
  if (prevSubtree === nextSubtree) return true;
  if (prevSubtree.length !== nextSubtree.length) return false;

  for (let i = 0; i < prevSubtree.length; ++i) {
    if (prevSubtree[i].id !== nextSubtree[i].id) return false;
  }
  return true;
};

const areEqual = (prevProps: LocalProps, nextProps: LocalProps) => {
  return (
    prevProps.familyId === nextProps.familyId &&
    subtreesEqual(prevProps.subtree, nextProps.subtree)
  );
};

export default React.memo(Heatmap, areEqual);
