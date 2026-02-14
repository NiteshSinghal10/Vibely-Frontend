import { IUser } from "../user";

export interface IFriend {
  _id: string;
  _users: string[];
  status: string;
  _blockedBy?: string;
  _reportedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  isOnline?: boolean;
  friendDetail?: IUser;
  newMessage?: number;
  lastActivity: Date;
}