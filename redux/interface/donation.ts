import { IFetchStatus } from "./main";

export interface IDonation {
  details: {
    title: string;
    image: string;
    content: string;
  };
  rulesAndRegulations: {
    content: string;
  };
  termsAndConditions: {
    content: string;
  };
  _id: string;
  createdBy: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface IDonationsStatus extends IFetchStatus {
  data: Array<IDonation>;
}