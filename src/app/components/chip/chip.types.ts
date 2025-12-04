export interface IChipConfig {
  textColor?: string;
  textSize?: string;
  maxWidth: string;
  crossIcon: {
    show: boolean;
    width?: string;
    height?: string;
  }
}

export interface IChip {
  label: string;
  value: string;
  bgColor: string;
}