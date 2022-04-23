import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import averageTree from 'relatives-tree/samples/average-tree.json';

import dynamic from 'next/dynamic';

import styles from '../../styles/Tree.module.css';
import classNames from 'classnames';
import { getTreeStructure } from '../../utils/mapping';
import { K, TExtNode, TNode } from '../../types';

const ReactFamilyTree = dynamic(import('react-family-tree'), { ssr: false });

type TFamilyNode = {
  node: TExtNode;
  isRoot: boolean;
  style?: React.CSSProperties;
  onSubClick: (id: string) => void;

  selectedAttributes: Array<K | ''>;
};

const FamilyNode = ({
  node,
  style,
  isRoot,
  onSubClick,
  selectedAttributes,
}: TFamilyNode) => {
  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
        className={classNames(
          styles.inner,
          styles[node.gender],
          isRoot && styles.isRoot
        )}
        onClick={() => onSubClick(node.id)}
        style={
          node.attributes
            ? {
                border: '3px solid #333',
                borderRadius: '0px',
              }
            : {}
        }
      >
        {selectedAttributes.map((s) => {
          if (node.attributes && node.attributes[s as K]) {
            return <span>{s}</span>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

type LocalProps = {
  initialNodes: TNode[];
  familyId: string;
  selectedAttributes: Array<K | ''>;
};

const WIDTH = 70;
const HEIGHT = 70;

const getRootId = (nodes: TNode[]) => {
  const res = nodes.find((n) => n.displayId.split('_')[0] !== '');

  return res?.id || '';
};

const TreeChart = ({
  initialNodes,
  familyId,
  selectedAttributes,
}: LocalProps) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [rootId, setRootId] = useState(getRootId(initialNodes));
  const [originalRootId, setOriginalRootId] = useState(getRootId(initialNodes));

  useEffect(() => {
    const newTree = getTreeStructure(familyId);
    const newRootId = getRootId(newTree);
    setNodes(newTree);
    setRootId(newRootId);
    setOriginalRootId(newRootId);
  }, [familyId]);

  const onResetClick = () => {
    setRootId(originalRootId);
  };

  if (typeof window === 'undefined') return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'calc(100% - 220px)',
      }}
    >
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
              onSubClick={setRootId}
              selectedAttributes={selectedAttributes}
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

      {rootId !== originalRootId && (
        <div className={styles.reset} onClick={onResetClick}>
          Reset
        </div>
      )}
    </div>
  );
};

export default TreeChart;
