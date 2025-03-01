import axios, { AxiosRequestConfig } from 'axios';

export const requestURL = 'https://api.redaeri.kro.kr/api/v1';

function extractUserToken(cookieStr: string) {
  const userRegex = /token=([^;]*)/;
  const match = cookieStr.match(userRegex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
const userToken = extractUserToken(document.cookie);

axios.defaults.headers.common['Token'] = `${userToken}`;

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
