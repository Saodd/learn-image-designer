import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ElementDefinition.scss';

export const ElementDefinition: FC = observer(() => {
  return <div className={styles.ElementDefinition}></div>;
});

const genId = (() => {
  let id = 0;
  return () => id++;
})();

class CirclePropsStore {
  id: number;
  strokeWidth = 5;
  radius: number = 50;
  x: number = 0;
  y: number = 0;

  constructor() {
    this.id = genId();
  }
}

export class CircleElement implements ElementInterface {
  private readonly store: CirclePropsStore;

  constructor() {
    this.store = new CirclePropsStore();
  }

  get id(): number {
    return this.store.id;
  }

  render: FC = observer(() => {
    const { x, y, radius, strokeWidth, id } = this.store;
    return (
      <g stroke="green" strokeWidth={strokeWidth} fill="none" style={{ transform: `translate(${x}px, ${y}px)` }}>
        <circle r={radius} cx={radius + strokeWidth} cy={radius + strokeWidth} />
      </g>
    );
  });
}

export interface ElementInterface {
  id: number;
  render: FC;
}
