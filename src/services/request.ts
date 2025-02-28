import axios, { AxiosRequestConfig } from 'axios';

export const requestURL = 'http://api.redaeri.kro.kr/api/v1';

// TODO: 테스트용
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6MTksImV4cCI6MTc0MDgyNTU5NywiaWF0IjoxNzQwNzM5MTk3fQ.oNuq4FDEhD52PG1WZ9TQ3vIdI3ASpkecKnuPyeWz9V8';

axios.defaults.headers.common['Token'] = `${TOKEN}`;

export const fetcher = async <T>(
  queryKey: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const { data } = await axios<T>({
    ...axiosConfig,
    url: `${requestURL}${queryKey}`,
  });

  return data;
};
