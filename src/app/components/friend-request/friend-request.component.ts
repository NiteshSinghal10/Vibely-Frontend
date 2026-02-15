import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IFriendRequest } from './friend-request.types';
import { FriendRequestsService } from '../../services';
import { FriendRequestLoaderComponent } from '../friend-request-loader';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-friend-request',
  imports: [FriendRequestLoaderComponent],
  templateUrl: './friend-request.component.html'
})
export class FriendRequestComponent implements OnInit {
  private page = 1;
  private limit = 10;
  private hasMoreFriendRequests = true;
  private friendsObserver!: IntersectionObserver;

  loading = false;
  
  defaultProfilePicture = 'profile.svg';
  

  friendRequests: IFriendRequest[] = [];
  @ViewChild('friendRequestsElement', { static: false })
  friendRequestsElement!: ElementRef;
  @ViewChild('friendRequestsScrollableContainer', { static: false })
  friendRequestsScrollableContainer!: ElementRef;

  constructor(private friendRequestsService: FriendRequestsService) {}

  ngOnInit(): void {
    this.getFriendRequests();
  }

  ngAfterViewInit(): void {
    this.friendsObserver = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          this.hasMoreFriendRequests &&
          !this.loading
        ) {
          this.page = this.page + 1;
          this.getFriendRequests();
        }
      },
      {
        root: this.friendRequestsScrollableContainer.nativeElement,
        rootMargin: '10px'
      }
    );

    this.friendsObserver.observe(
      this.friendRequestsElement.nativeElement
    );
  }

  getFriendRequests() {
    this.loading = true;
    this.friendRequestsService.getFriendRequests(this.page, this.limit)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(res => {
      this.friendRequests = [...this.friendRequests, ...res.data.map(request => ({
        _id: request._id,
        name: `${request.from.firstName} ${request.from.lastName}`,
        profilePicture: request.from.picture,
      }))];


      if(res.data.length < 1 || res.data.length < this.limit) {
        this.hasMoreFriendRequests = false;
      }
    })
  }

  updateFriendRequestStatus(id: string, status: "ACCEPTED" | "REJECTED") {
    this.friendRequestsService.updateFriendRequest(id, status)
    .subscribe(res => {
      this.friendRequests = this.friendRequests.filter(request => request._id !== id);
    })
  }
}
