export interface IShowChat {
  value: string;
  imgSrc: string;
  name: string;
  isOnline?: boolean;
  subHeading?: string;
  newMessages?: number;
  lastMessage?: Date;
  isSelected?: boolean;
}