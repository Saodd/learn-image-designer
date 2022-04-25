import * as React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { CircleElement, ElementInterface } from './ElementDefinition';

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

  @observable elements: ElementInterface[] = [];
  @action setElements = (v: ElementInterface[]): void => {
    this.elements = v;
  };
  @action pushElements = (v: ElementInterface): void => {
    this.elements.push(v);
  };

  @observable selectedElements: ElementInterface[] = [];
  @action setSelectedElements = (v: ElementInterface[]): void => {
    this.selectedElements = v;
  };
}

export const CanvasStoreContext = React.createContext<CanvasStore>(new CanvasStore());
