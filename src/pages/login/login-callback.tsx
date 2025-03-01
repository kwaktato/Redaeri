import { getNaverUser } from '@/services/user';
import { useEffect } from 'react';

export default function LoginCallback() {
  const getUser = async (code: string, state: string) => {
    try {
      //   await getNaverUser(code, state);
      const user = await getNaverUser(code, state);
      // console.log(user);
      return user;
    } catch {
      // TODO: 에러 추가
      alert('에러 발생');
      // console.error(err);
    }
  };

  useEffect(() => {
    const naverHash = new URLSearchParams(window.location.search);
    const code = naverHash.get('code');
    const state = naverHash.get('state');

    if (code && state) {
      getUser(code, state);
    }
  }, []);

  return <div>로그인 중...</div>;
}
