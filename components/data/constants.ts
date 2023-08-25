import { createContext } from "react";

export const BACKGROUND_COLOR = '#fafafa';
export const TEXT_COLOR = '#0a0a0a';

export const ACCENT_COLOR = '#6173fb';
export const ACCENT_COLOR_LIGHT = '#818ffc';
export const ACCENT_COLOR_DARK = '#5768e2';

export const ACCENT_TEXT_COLOR = '#fafafa';
export const ACTION_COLOR = '#ebebeb';
export const ACTION_COLOR_LIGHT = '#ffffff';
export const ACTION_COLOR_DARK = '#a5a5a5';

export const REM = 16;

export const BORDER_RADIUS = (REM / 16) * 10;

export const OVERLAY_COLOR = 'rgba(0,0,0,0.2)'


export const ScaleContext = createContext<number>(16);


// React Variables
export const ScreenSizeContext = createContext<{size: ScreenSizeTypes, sizeNumber: ScreenSizeNumbers} | undefined>(undefined);
export type ScreenSizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ScreenSizeNumbers = 1 | 2 | 3 | 4 | 5;
export const ScreenSizeToNumber: {[screenSize in ScreenSizeTypes]: ScreenSizeNumbers} = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5
}
export const ScreenNumberToSize: {[screenSizeNumber in ScreenSizeNumbers]: ScreenSizeTypes} = {
  1: 'xs',
  2: 'sm',
  3: 'md',
  4: 'lg',
  5: 'xl'
}


const tintColorDark = '#fff';

export const APP_COLORS =  {
  light: {
    text: TEXT_COLOR,
    background: BACKGROUND_COLOR,
    tint: ACCENT_COLOR,
    tabIconDefault: '#ccc',
    tabIconSelected: ACCENT_COLOR,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: ACCENT_COLOR,
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  },
};
