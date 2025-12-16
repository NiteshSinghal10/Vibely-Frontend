import { IUser } from "../../interfaces";

export interface IFriendRequest {
  _id: string;
  from: string;
  to: IUser;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
