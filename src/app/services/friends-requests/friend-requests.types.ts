import { IUser } from "../../interfaces";

export interface IFriendRequest {
  _id: string;
  from: IUser;
  to: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
