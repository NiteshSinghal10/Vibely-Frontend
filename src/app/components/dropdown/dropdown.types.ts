export interface IOption {
  label: string;
  value: string;
}

export interface IDropdownConfig {
  textSize?: string; // For options text
  textColor?: string; // For options text
  maxHeight?: string; // For dropdown height
  maxWidth?: 'sm' | 'md' | 'lg' | string; // For dropdown width
}