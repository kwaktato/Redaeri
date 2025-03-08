import { User, UserDelete, UserReviewCount } from '@/types/user';
import { fetcher, requestURL } from './request';
import axios from 'axios';

export const getNaverUser = async (code: string, state: string) => {
  const { data } = await fetcher<{ token: string }>(`/naver/callback`, {
    method: 'POST',
    data: {
      code,
      state,
    },
  });
  return data;
};

export const getUser = async () => {
  const { data } = await fetcher<User>('/user/get');
  return data;
};

export const getTestToken = async () => {
  const data = await axios.get<{ token: string; loginIdx: number }>(
    `${requestURL}/user/test/token`
  );

  return data;
};

export const getUserReviewCount = async () => {
  const { data } = await fetcher<UserReviewCount>('/user/answer/count');
  return data;
};

export const deleteUser = async () => {
  return await fetcher<UserDelete>('/naver/unlink');
};
