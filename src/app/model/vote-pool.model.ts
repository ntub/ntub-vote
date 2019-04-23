import { Candidate } from './candidate.model';

export class VotePool {
  id: number;
  name: string;
  voted: boolean;
}


export class VotePoolDetail {
  id: number;
  name: string;
  candidates: Candidate[];
}


export class SendVote {
  id: number;
  isAgree: boolean;
}
