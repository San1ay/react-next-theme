import { ReactNode } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: (newTheme: string) => void;
  color: string ;
  setColor: (newColor: string) => void;
  colors: string[];
}

export interface ThemeProviderType {
  children: ReactNode;
  colorScheme?: boolean;
  colors?: string[];
  disableTransition?: boolean;
}
