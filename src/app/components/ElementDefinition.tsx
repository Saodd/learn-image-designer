import * as React from 'react';
import { FC, MouseEvent, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ElementDefinition.scss';
import { CanvasStoreContext } from './CanvasStore';

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
  readonly elementName = 'CircleElement';
  private readonly store: CirclePropsStore;

  constructor() {
    this.store = new CirclePropsStore();
  }

  get id(): number {
    return this.store.id;
  }

  render: FC = observer(() => {
    const { x, y, radius, strokeWidth } = this.store;
    const { setSelectedElements } = useContext(CanvasStoreContext);

    const handleClick = useCallback((e: MouseEvent) => {
      setSelectedElements([this]);
    }, []);
    return (
      <g
        stroke="green"
        strokeWidth={strokeWidth}
        fill="none"
        style={{ transform: `translate(${x}px, ${y}px)` }}
        onClick={handleClick}
        className={styles.CircleElementRender}
      >
        <circle r={radius} cx={radius + strokeWidth} cy={radius + strokeWidth} />
      </g>
    );
  });

  renderConfig: FC = observer(() => {
    const { id } = this.store;

    return (
      <div>
        <div>
          <p>当前选中的元素：</p>
          <p>id: {id}</p>
          <p>元素种类: {this.elementName}</p>
        </div>
      </div>
    );
  });
}

export interface ElementInterface {
  id: number;
  render: FC;
  renderConfig: FC;
}
