import { IFetchStatus } from "./main";
import { ILastMessage } from "./message";
import { IParticipants } from "./participants";

export interface INewFeed extends IParticipants ,ILastMessage {
    _id: string;
    type: string;
    facedown: any;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
  
  }
  export interface INewFeeds extends IFetchStatus {
    data: Array<INewFeed>;
  }
  