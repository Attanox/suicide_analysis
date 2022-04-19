import { Box } from '@chakra-ui/react';
import React from 'react';
import type { ExtNode, Node } from 'relatives-tree/lib/types';

import averageTree from 'relatives-tree/samples/average-tree.json';

import dynamic from 'next/dynamic';

import styles from '../../styles/Tree.module.css';
import classNames from 'classnames';

const ReactFamilyTree = dynamic(import('react-family-tree'), { ssr: false });

type TFamilyNode = {
  node: ExtNode;
  style?: React.CSSProperties;
};

const FamilyNode = ({ node, style }: TFamilyNode) => {
  return (
    <div style={style} title={node.id}>
      {/* <div className={classNames(styles.inner, styles[node.gender])} /> */}
      {/* {node.hasSubTree && (
        <div
          className={classNames(styles.sub, styles[node.gender])}
          // onClick={() => onSubClick(node.id)}
        />
      )} */}
    </div>
  );
};

type LocalProps = {
  nodes: Node[];
};

const TreeChart = ({ nodes }: LocalProps) => {
  if (typeof window === 'undefined') return null;

  console.log({ nodes, averageTree });

  const WIDTH = 30;
  const HEIGHT = 40;

  return (
    <Box width="100%" height={`calc(100vh - 50px)`} marginTop="20px">
      <ReactFamilyTree
        nodes={nodes as Node[]}
        rootId={nodes[0].id}
        width={WIDTH}
        height={HEIGHT}
        renderNode={(node: ExtNode) => (
          <FamilyNode
            key={node.id}
            node={node}
            style={{
              width: WIDTH,
              height: HEIGHT,
              transform: `translate(${node.left * (WIDTH / 2)}px, ${
                node.top * (HEIGHT / 2)
              }px)`,
            }}
          />
        )}
      />
    </Box>
  );
};

export default TreeChart;
