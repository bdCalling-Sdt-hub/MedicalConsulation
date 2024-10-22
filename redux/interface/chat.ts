import { IFetchStatus } from "./main";
import { ILastMessage } from "./message";
import { IParticipants } from "./participants";

export interface ICreateChat {
  participants?: Array<string>;
  type: 'public' | 'friend' | 'group' | 'facedown';
  facedown?: string;
}

export interface Chat extends IParticipants, ILastMessage {
    _id: string;
    type: 'private';
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }
  
  export interface IChats extends IFetchStatus {
    data: Array<Chat>;
  }
  

