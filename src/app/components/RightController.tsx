import * as React from 'react';
import { FC, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './RightController.scss';
import { CanvasStoreContext } from './CanvasStore';

export const RightController: FC = observer(() => {
  const { selectedElements } = useContext(CanvasStoreContext);

  if (!selectedElements.length) return null;
  if (selectedElements.length === 1) {
    const Comp = selectedElements[0].renderConfig;
    return (
      <div className={styles.RightController}>
        <Comp />
      </div>
    );
  }

  return null;
});
