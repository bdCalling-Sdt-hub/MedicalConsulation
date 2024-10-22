import { IFetchStatus } from "./main";

export interface IFAQ {
  _id: string;
  createdBy: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface IFAQs extends IFetchStatus {
  data: Array<IFAQ>;
}
