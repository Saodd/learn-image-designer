import * as React from 'react';
import { FC, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './Canvas.scss';
import { CanvasStore, CanvasStoreContext } from './CanvasStore';

export const Canvas: FC = observer(() => {
  const { canvasHeight, canvasWidth } = useContext(CanvasStoreContext);

  return <div className={styles.Canvas} style={{ width: canvasWidth, height: canvasHeight }}></div>;
});
