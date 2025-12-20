

export interface IMessage {
  _id: string;
  chatId: string;
  _sender: string;
  _receiver: string;
  content: string;
  createdAt: Date | string;
}

export interface IChatUser {
  value: string;
  name: string;
  imgSrc: string;
}