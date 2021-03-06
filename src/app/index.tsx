import * as React from 'react';
import styles from './index.scss';
import { Canvas } from './components/Canvas';
import { LeftController } from './components/LeftController';
import { RightController } from './components/RightController';

export function App(): JSX.Element {
  return (
    <div id={'app'} className={styles.App}>
      <Canvas />
      <LeftController />
      <RightController />
    </div>
  );
}
