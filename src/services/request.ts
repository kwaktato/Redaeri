import axios, { AxiosRequestConfig } from 'axios';

export const requestURL = 'http://api.redaeri.kro.kr/api/v1';

// TODO: 테스트용
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6MjMsImV4cCI6MTc0MDgyNjY2NCwiaWF0IjoxNzQwNzQwMjY0fQ.OcliMHTt-PxzMUIdu2f0kBtHQV_XjHgFPLGNhbmVrXk';

axios.defaults.headers.common['Token'] = `${TOKEN}`;

export const fetcher = async <T>(
  queryKey: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const { data } = await axios<{ code: string; data: T }>({
    ...axiosConfig,
    url: `${requestURL}${queryKey}`,
  });

  return data;
};
