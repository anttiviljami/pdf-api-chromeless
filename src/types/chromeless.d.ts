export interface DeviceMetrics {
    width: number;
    height: number;
    deviceScaleFactor?: number;
    mobile?: boolean;
    scale?: number;
    screenOrientation?: ScreenOrientation;
}
interface ScreenOrientation {
    type: string;
    angle: number;
}
