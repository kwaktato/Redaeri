import { History } from '@/types/review';
import { fetcher } from './request';

export const getHistory = async () => {
  const result = await fetcher<History[]>('/answer/log/get');
  return result;
};
