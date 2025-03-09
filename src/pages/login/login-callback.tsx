import Loading from '@/components/loading/Loading';
import { getNaverUser, getUser } from '@/services/user';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LoginCallback() {
  const navigate = useNavigate();

  const getUserNaver = async (code: string, state: string) => {
    try {
      const userNaver = await getNaverUser(code, state);

      // 토큰 처리
      localStorage.setItem('token', userNaver.token);

      // 가입 여부에 따른 화면 이동
      const user = await getUser();
      const nextPage =
        user.storeIdx === null
          ? '/shop-information'
          : user.personaIdx === null
            ? '/upload-answer'
            : '/review';
      navigate(nextPage);
      window.scrollTo(0, 0);
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
      getUserNaver(code, state);
    }
  }, []);

  return (
    <>
      <Loading first='로그인 중' second='' details={[]} />
    </>
  );
}
