import * as React from 'react';
import { FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './LeftController.scss';

export const LeftController: FC = observer(() => {
  const handleClick = useCallback(() => {
    console.log('按钮1');
  }, []);

  return (
    <div className={styles.LeftController}>
      <button onClick={handleClick}>按钮</button>
    </div>
  );
});
