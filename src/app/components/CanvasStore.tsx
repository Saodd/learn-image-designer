import * as React from 'react';
import { action, computed, makeObservable, observable } from 'mobx';
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

  selectedTimestamp: number = 0;
  @observable selectedElements: ElementInterface[] = [];
  @action setSelectedElements = (v: ElementInterface[]): void => {
    const now = Date.now();
    if (now - this.selectedTimestamp > 50) {
      this.selectedElements = v;
      this.selectedTimestamp = now;
    }
  };

  /**
   * 分别是起点xy坐标、终点xy坐标
   */
  @observable selecting: SelectingBox | null = null;
  @action setSelecting = (v: SelectingBox): void => {
    this.selecting = v;
  };
  @action setSelectingStart = (x: number, y: number): void => {
    this.selecting = [x, y, x, y];
  };
  @action setSelectingEnd = (x: number, y: number): void => {
    if (!this.selecting) return;
    this.selecting[2] = x;
    this.selecting[3] = y;
  };
  performSelect = (): void => {
    const elems = this.elements.filter((elem) => elem.checkSelect(this.selectingBox));
    if (elems.length) this.setSelectedElements(elems);
    this.setSelecting(null);
  };

  /**
   * 选择框的左上角xy坐标、宽和高
   */
  @computed get selectingBox(): SelectingBox | null {
    if (!this.selecting) return null;
    const [a, b, c, d] = this.selecting;
    const x = a > c ? c : a;
    const w = a > c ? a - c : c - a;
    const y = b > d ? d : b;
    const h = b > d ? b - d : d - b;
    return [x, y, w, h];
  }
}

export type SelectingBox = [number, number, number, number];

export const CanvasStoreContext = React.createContext<CanvasStore>(new CanvasStore());
