import type { ComponentType, LazyExoticComponent } from 'react';

export interface RefExampleMeta {
  name: string;
  component: LazyExoticComponent<ComponentType>;
}