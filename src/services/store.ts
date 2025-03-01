import { fetcher } from './request';

export const createStore = async ({
  storeName,
  storeType,
}: {
  storeName: string;
  storeType: string;
}) => {
  return fetcher('/store/insert', {
    method: 'POST',
    data: {
      storeName,
      storeType,
    },
  });
};

export const updateStore = async ({
  storeName,
  storeType,
}: {
  storeName: string;
  storeType: string;
}) => {
  return fetcher('/store/update', {
    method: 'PATCH',
    data: { storeName, storeType },
  });
};
