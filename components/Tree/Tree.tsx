import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import averageTree from 'relatives-tree/samples/average-tree.json';

import dynamic from 'next/dynamic';

import styles from '../../styles/Tree.module.css';
import classNames from 'classnames';
import { getTreeStructure } from '../../utils/mapping';
import { TExtNode, TNode } from '../../types';

const ReactFamilyTree = dynamic(import('react-family-tree'), { ssr: false });

type TFamilyNode = {
  node: TExtNode;
  isRoot: boolean;
  style?: React.CSSProperties;
};

const FamilyNode = ({ node, style, isRoot }: TFamilyNode) => {
  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
        className={classNames(
          styles.inner,
          styles[node.gender],
          isRoot && styles.isRoot
        )}
      />
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
  initialNodes: TNode[];
  familyId: string;
};

const WIDTH = 30;
const HEIGHT = 40;

const getRootId = (nodes: TNode[]) => {
  const res = nodes.find((n) => n.displayId.split('_')[0] !== '');

  return res?.id || '';
};

const TreeChart = ({ initialNodes, familyId }: LocalProps) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [rootId, setRootId] = useState(getRootId(initialNodes));

  useEffect(() => {
    const newTree = getTreeStructure(familyId);
    setNodes(newTree);
    setRootId(getRootId(newTree));
  }, [familyId]);

  if (typeof window === 'undefined') return null;

  console.log({ nodes });

  return (
    <ReactFamilyTree
      nodes={nodes}
      rootId={rootId}
      width={WIDTH}
      height={HEIGHT}
      className={styles.tree}
      renderNode={(node) => {
        return (
          <FamilyNode
            key={node.id}
            node={node as TExtNode}
            isRoot={node.id === rootId}
            style={{
              width: WIDTH,
              height: HEIGHT,
              transform: `translate(${node.left * (WIDTH / 2)}px, ${
                node.top * (HEIGHT / 2)
              }px)`,
            }}
          />
        );
      }}
    />
  );
};

export default TreeChart;
