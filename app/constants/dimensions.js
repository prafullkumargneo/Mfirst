import {Dimensions, PixelRatio} from 'react-native';

const WINDOW = Dimensions.get('window');

export const WIDTH = WINDOW.width;
export const HEIGHT = WINDOW.height;
export const SMALL_DEVICE_H = WINDOW.height < 610;
export const SMALL_DEVICE_W = WINDOW.width < 340;
export const VERY_SMALL_DEVICE_H = WINDOW.height < 540;
export const VERY_SMALL_DEVICE_W = WINDOW.width < 320;
export const SMALL_SCREEN_RATIO = WINDOW.height / WINDOW.width < 1.7;
