import { Answer, GetText, History, PostAnswer } from '@/types/review';
import { fetcher } from './request';

// review history에서 모든 히스토리 가져오기
export const getHistory = async () => {
  return await fetcher<History[]>('/answer/log/get');
};

// review upload에서 사진을 텍스트로 변환하기
export const getImageText = async (file: File) => {
  const formData = new FormData();
  formData.append('reviewImgFile', file);

  return await fetcher<GetText>('/image/text/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};

// review에서 ai가 생성한 답변 받아오기
export const getReviewAnswer = async ({
  score,
  reviewText,
  includeText,
}: PostAnswer) => {
  return await fetcher<Answer>('/answer/generate', {
    method: 'POST',
    data: { score, reviewText, includeText },
  });
};

// review에서 답변 재생성하기
export const updateReviewAnswer = async (logIdx: number) => {
  return await fetcher<Answer>('/answer/generate/retry', {
    method: 'PATCH',
    data: { logIdx },
  });
};
