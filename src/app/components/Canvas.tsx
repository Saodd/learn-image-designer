import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Canvas.scss';
import { CanvasStore, CanvasStoreContext } from './CanvasStore';

export const Canvas: FC = observer(() => {
  const {
    canvasHeight,
    canvasWidth,
    elements,
    setSelectedElements,
    setSelectingStart,
    setSelectingEnd,
    performSelect,
  } = useContext(CanvasStoreContext);
  const ref = useRef<HTMLDivElement>();

  const handleClick = useCallback(() => {
    setSelectedElements([]);
  }, []);

  return (
    <div className={styles.CanvasContainer}>
      <div
        className={styles.Canvas}
        style={{ width: canvasWidth, height: canvasHeight }}
        ref={ref}
        onMouseDown={(e) => setSelectingStart(e.clientX - ref.current.offsetLeft, e.clientY - ref.current.offsetTop)}
        onMouseUp={(e) => performSelect()}
        onMouseLeave={(e) => performSelect()}
        onMouseMove={(e) => setSelectingEnd(e.clientX - ref.current.offsetLeft, e.clientY - ref.current.offsetTop)}
      >
        <svg style={{ width: canvasWidth, height: canvasHeight }}>
          <rect onClick={handleClick} width={canvasWidth} height={canvasHeight} z={100} fill="transparent" />
          <SelectingModule />
          {elements.map((elem) => (
            <elem.render />
          ))}
        </svg>
      </div>
    </div>
  );
});

const SelectingModule: FC = observer(() => {
  const { selectingBox } = useContext(CanvasStoreContext);
  if (!selectingBox) return null;
  const [x, y, w, h] = selectingBox;

  return (
    <g strokeWidth={1} stroke="#666" fill="rgba(0,0,0,.4)">
      <rect x={x} y={y} width={w} height={h}></rect>
    </g>
  );
});
