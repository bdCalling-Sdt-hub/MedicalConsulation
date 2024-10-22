import {IFetchStatus} from './main';

export interface IFriend {
  _id: string;
  avatar: string;
  fullName: string;
}
export interface IFriends extends IFetchStatus {
  data: Array<IFriend>;
}

export interface IFriendReceivedRequest extends IFriend {
  email: string;
  totalFriends: number;
}

export interface IFriendReceivedRequests extends IFetchStatus {
  data: Array<IFriendReceivedRequest>;
}
