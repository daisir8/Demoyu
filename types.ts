export enum ViewMode {
  CODE = 'CODE',
  WORD = 'WORD'
}

export type Language = 'en' | 'zh';

export interface Book {
  id: string;
  name: string;
  content: string;
  progressIndex: number; // Current character index
  type: 'txt' | 'pdf';
}

export interface Settings {
  language: Language;
  fontSize: number; // px
  fontColor: string; // hex
  windowOpacity: number; // 0.1 to 1
  windowScale: number; // 0.5 to 1.5
}

export interface DocumentState {
  currentBookId: string | null;
  isHidden: boolean; // Boss key state
  isSplitMode: boolean; // Feature 6: Split window mode
  webUrl: string; // Feature 7
  showWeb: boolean;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}