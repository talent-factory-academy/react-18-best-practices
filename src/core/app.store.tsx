import { createContext } from 'react';

export type Theme = 'dark' | 'light';

interface AppState {
  theme: Theme
}

export const AppContext = createContext<AppState | null>(null);
