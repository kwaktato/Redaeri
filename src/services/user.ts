import { fetcher } from './request';

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
  const { data } = await fetcher('/user/get');
  return data;
};
