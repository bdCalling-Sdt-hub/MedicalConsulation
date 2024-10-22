export interface IParticipant {
  _id?: string;
  fullName?: string;
  avatar?: string;
}

export interface IParticipants {
  participants: Array<IParticipant>;
}
