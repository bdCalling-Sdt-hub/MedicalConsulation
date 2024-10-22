import {IFetchStatus} from './main';

export interface ILastMessage {
  lastMessage: {
    _id: string;
    sender: {
      _id: string;
      fullName: string;
    };
    path: string;
    image: string;
    text: string;
    audio: string;
    createdAt: Date;
  };
}

export interface ICreateMessage {
  chatId: string;
  image?: File | string;
  text?: string;
  audio?: File | string;
  path?: string;
}

export interface IMessage {
  chatId: string;
  sender: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  text: string;
  audio: string;
  image: string;
  path: string;
  messageType: string;
  friendsType: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IMessages extends IFetchStatus {
  data: Array<IMessage>;
}
