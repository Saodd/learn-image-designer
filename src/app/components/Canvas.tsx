import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Canvas.scss';
import { CanvasStore, CanvasStoreContext } from './CanvasStore';

export const Canvas: FC = observer(() => {
  const { canvasHeight, canvasWidth, elements, setSelectedElements } = useContext(CanvasStoreContext);

  const handleClick = useCallback(() => {
    setSelectedElements([]);
    return false;
  }, []);

  return (
    <div className={styles.Canvas} style={{ width: canvasWidth, height: canvasHeight }}>
      <svg style={{ width: canvasWidth, height: canvasHeight }}>
        <rect onClick={handleClick} width={canvasWidth} height={canvasHeight} z={100} fill="transparent" />
        {elements.map((elem) => (
          <elem.render />
        ))}
      </svg>
    </div>
  );
});
