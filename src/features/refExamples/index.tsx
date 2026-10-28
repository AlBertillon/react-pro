import { lazy } from 'react';
import type { RefExampleMeta } from './types';

export const clickTimerExample: RefExampleMeta = {
  name: 'ClickTimer',
  component: lazy(() => import('./ClickTimer')),
};

export const previousInputExample: RefExampleMeta = {
  name: 'PreviousInput',
  component: lazy(() => import('./PreviousInput')),
};

export const focusTrackerExample: RefExampleMeta = {
  name: 'FocusTracker',
  component: lazy(() => import('./FocusTracker')),
};

export const debouncedLoggerExample: RefExampleMeta = {
  name: 'DebouncedLogger',
  component: lazy(() => import('./DebouncedLogger')),
};

export const webSocketLoggerExample: RefExampleMeta = {
  name: 'WebSocketLogger',
  component: lazy(() => import('./WebSocketLogger')),
};

export const refExamples: RefExampleMeta[] = [
  clickTimerExample,
  previousInputExample,
  focusTrackerExample,
  debouncedLoggerExample,
  webSocketLoggerExample,
];