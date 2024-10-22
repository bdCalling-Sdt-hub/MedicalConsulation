import {IFetchStatus} from './main';

export interface ITermsAndPolicy {
  _id: string;
  createdBy: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface ITermsAndPolicies extends IFetchStatus {
  data: Array<ITermsAndPolicy>;
}

export interface IInputPagination {
  id?: string;
  page?: string;
  limit?: string;
}
