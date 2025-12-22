

export interface IMessage {
  _id: string;
  _sender: string;
  _receiver: string;
  createdAt: string; // ISO date string
  content: string;
}

export interface FriendMessages {
  date: string; // format: DD-MM-YYYY
  messages: IMessage[];
}

export interface IChatUser {
  value: string;
  name: string;
  imgSrc: string;
}