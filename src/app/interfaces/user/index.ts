export interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
  dob?: {
    year: number;
    month: number;
    day: number;
  };
  gender?: string;
}