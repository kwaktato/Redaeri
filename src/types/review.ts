export const reviewTypeMapping: { [key: string]: string } = {
  false: '부정',
  true: '긍정',
  ask: '문의',
  neutral: '중립',
};

export interface GetText {
  reviewText: string;
}

export interface PostAnswer {
  score: number;
  reviewText: string;
  includeText: string;
}

export interface Answer {
  logIdx: number;
  score: number;
  generateAnswer: string;
  baseAnswer: string;
  reviewType: string;
  reviewText: string;
}

export interface History {
  rownum: number;
  logIdx: number;
  score: number;
  generateAnswer: string;
  baseAnswer: string;
  reviewType: string;
  reviewText: string;
  insertDate: string;
  insertTime: string;
}
