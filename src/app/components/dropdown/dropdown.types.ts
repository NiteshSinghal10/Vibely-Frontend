export interface IOption {
  label: string;
  value: string;
  imgSrc?: string;
  selected?: boolean;
  textColor?: string;
  imgWidth?: string;
  imgHeight?: string;
}

export interface IDropdownConfig {
  textSize?: string; // For options text
  textColor?: string; // For options text
  maxHeight?: string; // For dropdown height
  width?: 'sm' | 'md' | 'lg' | string; // For dropdown width
  searchBar?: boolean; // To show searchbar or not
  optionPrefix?: boolean; // To add prefix image in every option
  searchPlaceHolder?: string; // Search Bar place holder
  searchNotFound?: string;
  multiSelect?: boolean;
}