import { fetcher } from './request';

export const createStore = async ({
  shopName,
  storeType,
}: {
  shopName: string;
  storeType: string;
}) => {
  return fetcher('/store/insert', {
    method: 'POST',
    data: {
      shopName,
      storeType,
    },
  });
};
