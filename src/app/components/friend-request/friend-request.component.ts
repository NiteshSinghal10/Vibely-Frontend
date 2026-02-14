import { Component } from '@angular/core';
import { IFriendRequest } from './friend-request.types';

@Component({
  selector: 'app-friend-request',
  imports: [],
  templateUrl: './friend-request.component.html'
})
export class FriendRequestComponent {
  defaultProfilePicture = 'profile.svg';

  friendRequests: IFriendRequest[] = [
    {
      _id: '1',
      name: 'John Doe',
      profilePicture: '',
    },
    {
      _id: '2',
      name: 'Jane Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '3',
      name: 'Jim Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '4',
      name: 'Jill Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '5',
      name: 'Jack Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '6',
      name: 'Jill Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '7',
      name: 'Jack Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '8',
      name: 'Jill Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '9',
      name: 'Jack Doe',
      profilePicture: 'profile.svg',
    },
    {
      _id: '10',
      name: 'Jill Doe kdfjsdl flskdjf lsdkfj lsdkfjsldkf jsdlfkjd flksjdflskd flskd fjsldkfjsd flds fjlsdkf dslfk dslkjf ',
      profilePicture: 'profile.svg',
    },
  ];
}
