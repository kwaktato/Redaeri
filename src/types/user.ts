export interface TestUser {
  token: string;
  loginIdx: number;
}

export interface User {
  storeType: string;
  allAnswer: string;
  personaSelect: string;
  storeIdx: number;
  userIdx: number;
  personaIdx: number;
  storeName: string | null;
  lengthSelect: string;
  emotionSelect: string;
  userId: string;
}

export interface UserReviewCount {
  answerCount: number;
}

export interface UserDelete {
  result: string;
  access_token: string;
}
