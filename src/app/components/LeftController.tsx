import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './LeftController.scss';
import { CanvasStoreContext } from './CanvasStore';
import { CircleElement } from './ElementDefinition';

export const LeftController: FC = observer(() => {
  const store = useContext(CanvasStoreContext);

  const handleClick = useCallback(() => {
    store.pushElements(new CircleElement());
  }, []);

  return (
    <div className={styles.LeftController}>
      <button onClick={handleClick}>添加一个Circle</button>
    </div>
  );
});
