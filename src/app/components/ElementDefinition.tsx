import * as React from 'react';
import { FC, MouseEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ElementDefinition.scss';
import { CanvasStoreContext } from './CanvasStore';
import { action, makeObservable, observable } from 'mobx';

const genId = (() => {
  let id = 0;
  return () => id++;
})();

class CirclePropsStore {
  id: number;
  @observable strokeWidth = 5;
  @observable radius: number = 50;
  @observable x: number = 0;
  @observable y: number = 0;

  @action setRadius = (v: number): void => {
    this.radius = v;
  };

  constructor() {
    this.id = genId();
    makeObservable(this);
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
    const { id, radius, setRadius } = this.store;

    const [inputRadius, setInputRadius] = useState<string>(radius.toFixed(2));
    const confirmRadius = useCallback(() => {
      setRadius(+inputRadius);
    }, [inputRadius]);

    return (
      <div>
        <div>
          <p>当前选中的元素：</p>
          <p>id: {id}</p>
          <p>元素种类: {this.elementName}</p>
        </div>
        <div>
          设置半径：
          <input value={inputRadius} onChange={(e) => setInputRadius(e.target.value)} style={{ width: '80px' }} />
          <button onClick={confirmRadius}>确认</button>
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
