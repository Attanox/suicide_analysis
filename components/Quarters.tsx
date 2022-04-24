import classNames from 'classnames';
import React, { Fragment } from 'react';

import styles from '../styles/Arrows.module.css';
import { Datum, K } from '../types';
import { getColor } from '../utils/mapping';

const getQuarter = (idx: number, color: string, arrowClass: string) => {
  const quarterMap: { [key: number]: () => JSX.Element } = {
    0: () => (
      <div
        className={classNames(styles.arrowUp, styles[`${arrowClass}Up`])}
        style={{ borderBottomColor: color }}
      />
    ),
    1: () => (
      <div
        className={classNames(styles.arrowDown, styles[`${arrowClass}Down`])}
        style={{ borderTopColor: color }}
      />
    ),
    2: () => (
      <div
        className={classNames(styles.arrowRight, styles[`${arrowClass}Right`])}
        style={{ borderLeftColor: color }}
      />
    ),
    3: () => (
      <div
        className={classNames(styles.arrowLeft, styles[`${arrowClass}Left`])}
        style={{ borderRightColor: color }}
      />
    ),
  };

  return quarterMap[idx] || null;
};

type LocalProps = {
  selectedAttributes: Array<K | ''>;
  arrowClass: string;
  nodeAttributes: Datum | undefined;
};

const Quarters = ({
  selectedAttributes,
  arrowClass,
  nodeAttributes,
}: LocalProps) => {
  return (
    <Fragment>
      {selectedAttributes.map((s, idx) => {
        if (nodeAttributes && nodeAttributes[s as K]) {
          const Quarter = getQuarter(idx, getColor(s), arrowClass);
          return <Quarter key={`${s}-${nodeAttributes.id}`} />;
        }
        return null;
      })}
    </Fragment>
  );
};

export default Quarters;
