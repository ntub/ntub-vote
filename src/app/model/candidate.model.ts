export class Candidate {
  id: number;
  image: string;
  stdNo: string;
  name: string;
  klass: string;
  politics: string;
  pool?: string;
}

export class CandidateResult {
  id: number;
  pool: string;
  voteCount: number;
  image: string;
  stdNo: string;
  name: string;
  klass: string;
  politics: string;
}
