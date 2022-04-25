import * as React from 'react';
import { action, makeObservable, observable } from 'mobx';

export class CanvasStore {
  constructor() {
    makeObservable(this);
  }

  @observable canvasWidth: number = 800;
  @action setCanvasWidth = (v: number): void => {
    this.canvasWidth = v;
  };
  @observable canvasHeight: number = 800;
  @action setCanvasHeight = (v: number): void => {
    this.canvasHeight = v;
  };
}

export const CanvasStoreContext = React.createContext<CanvasStore>(new CanvasStore());
