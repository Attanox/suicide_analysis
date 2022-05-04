import { Box, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import averageTree from 'relatives-tree/samples/average-tree.json';

import dynamic from 'next/dynamic';

import styles from '../../styles/Tree.module.css';
import classNames from 'classnames';
import {
  getColor,
  getSubtreeStructure,
  getTreeStructure,
} from '../../utils/mapping';
import { K, TExtNode, TNode } from '../../types';
import Quarters from '../Quarters';

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
      <Tooltip label={`${node.displayId}`} hasArrow>
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
                  position: 'relative',
                }
              : { position: 'relative' }
          }
        >
          <Quarters
            selectedAttributes={selectedAttributes}
            nodeAttributes={node.attributes}
            arrowClass="tree"
          />
        </div>
      </Tooltip>
    </div>
  );
};

type LocalProps = {
  initialNodes: TNode[];
  familyId: string;
  selectedAttributes: Array<K | ''>;
  setSubtree: (s: TNode[]) => void;
};

const WIDTH = 50;
const HEIGHT = 50;

const getRootId = (nodes: TNode[]) => {
  const res = nodes.find((n) => n.displayId.split('_')[0] !== '');

  return res?.id || '';
};

const TreeChart = ({
  initialNodes,
  familyId,
  selectedAttributes,
  setSubtree,
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
    setSubtree(newTree);
  }, [familyId, setSubtree]);

  const onResetClick = () => {
    setRootId(originalRootId);
    const subtree = getSubtreeStructure(nodes, originalRootId);
    setSubtree(subtree);
  };

  const onSetRoot = (newRootId: string) => {
    setRootId(newRootId);
    const subtree = getSubtreeStructure(nodes, newRootId);
    setSubtree(subtree);
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
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
              onSubClick={onSetRoot}
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
    </>
  );
};

export default TreeChart;
