import { IShowChat } from "../../components";
import { IMessage } from "../../interfaces";

// Dummy Data
export const friends: IShowChat[] = [
  { value: '1', name: 'Anushi Goel', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: false, newMessages: 0, lastMessage: new Date('2025-12-12T18:11:11.889+00:00'), isSelected: true },
  { value: '2', name: 'Swapnil', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: true, newMessages: 10 },
  { value: '3', name: 'Anuj', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: false, newMessages: 0 },
  { value: '4', name: 'Ankesh', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: false, newMessages: 5, lastMessage: new Date('2025-09-08T10:11:11.889+00:00') },
  { value: '5', name: 'Bhuwan', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: true, newMessages: 0 },
  { value: '6', name: 'Badal Paji', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: false, newMessages: 80 },
  { value: '7', name: 'Shivansh', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: true, newMessages: 0, lastMessage: new Date('2025-11-18T18:11:11.889+00:00') },
  { value: '8', name: 'Harshit', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: false, newMessages: 2 },
  { value: '9', name: 'Arun', imgSrc: 'profile.svg', subHeading: 'Tap to start chatting', isOnline: true, newMessages: 0, lastMessage: new Date('2025-10-14T09:11:11.889+00:00') },
];

export const friendMessages: IMessage[] = [
  { _id: '1', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Hi', createdAt: '' },
  { _id: '2', chatId: 'A_B', _sender: 'b', _receiver: 'a', content: 'Hello', createdAt: '' },
  { _id: '3', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'How are you?', createdAt: '' },
  { _id: '4', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'What is your name?', createdAt: '' },
  { _id: '5', chatId: 'A_B', _sender: 'b', _receiver: 'a', content: 'I am fine what about you?', createdAt: '' },
  { _id: '6', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Fine', createdAt: '' },
  { _id: '7', chatId: 'A_B', _sender: 'b', _receiver: 'a', content: 'I am Nitesh and u?', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
  { _id: '8', chatId: 'A_B', _sender: 'a', _receiver: 'b', content: 'Anuj', createdAt: '' },
]