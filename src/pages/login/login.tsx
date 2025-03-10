import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import WhiteLogo from '@/assets/images/blue-logo.svg?react';
import NaverLogo from '@/assets/images/naver-logo.svg?react';
import SlideImageOne from '@/assets/images/login-slide-1.png';
import SlideImageTwo from '@/assets/images/login-slide-2.png';
import SlideImageThree from '@/assets/images/login-slide-3.png';
// import KakaoLogo from '@/assets/images/kakao-logo.svg?react';
import Warning from '@/assets/images/warning.svg?react';

import 'swiper/css';
import { getTestToken } from '@/services/user';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();

  const naverLoginLinkRef = useRef<HTMLAnchorElement>(null);
  const onClickNaverBtn = async () => {
    if (!naverLoginLinkRef.current) return;
    naverLoginLinkRef.current.click();
    //   const { data } = await getTestToken();
    //   localStorage.setItem('token', data.token);
    //   // document.cookie = `token=${data.token}`;
    //   navigate('/shop-information');
  };

  const onClickTestBtn = async () => {
    const { data } = await getTestToken();
    localStorage.setItem('token', data.token);
    navigate('/shop-information');
  };

  // const getUser = async (code: string, state: string) => {
  //   try {
  //     const user = await getNaverUser(code, state);
  //     document.cookie = `token=${user.token}`;
  //     navigate('/shop-information');
  //   } catch {
  //     alert('에러 발생');
  //   }
  // };

  // useEffect(() => {
  //   const naverHash = new URLSearchParams(window.location.search);
  //   const code = naverHash.get('code');
  //   const state = naverHash.get('state');

  //   if (code && state) {
  //     getUser(code, state);
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Title>
        <h1>사장님의</h1>
        <div>
          <h1>리뷰 답변 도우미,</h1>
          <h1>
            <strong>리대리</strong>
          </h1>
          <WhiteLogo />
        </div>
      </Title>

      <SwiperContainer
        spaceBetween={16}
        slidesPerView={1}
        pagination={true}
        height={200}
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperContent>
          <img src={SlideImageOne} alt='login-slide-1' />
        </SwiperContent>
        <SwiperContent>
          <img src={SlideImageTwo} alt='login-slide-2' />
        </SwiperContent>
        <SwiperContent>
          <img src={SlideImageThree} alt='login-slide-3' />
        </SwiperContent>
      </SwiperContainer>

      <LoginContainer>
        {/* <p>
          리대리 서비스를 이용하려면 <strong>로그인</strong>이 필요해요!
        </p> */}
        <NaverLoginLink
          className='hidden'
          ref={naverLoginLinkRef}
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_NAVER_CLIENT_ID}&state=false&redirect_uri=${import.meta.env.VITE_APP_NAVER_CALLBACK_URI}`}
        >
          네이버 로그인 테스트
        </NaverLoginLink>
        <Button onClick={onClickNaverBtn}>
          <NaverLogo />
          네이버로 로그인하기
        </Button>
        <Button onClick={onClickTestBtn}>
          테스트용 로그인하기
          <div>
            <Warning />
            설정한 말투와 가게 정보가 저장되지 않아요!
          </div>
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  padding: 28px;
  .swiper-pagination-bullets {
    position: relative;
  }
`;

const SwiperContent = styled(SwiperSlide)`
  width: auto;
  background: transparent;
  border-radius: 12px;
  img {
    border-radius: 20px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: auto;
  }
`;

const Title = styled.section`
  padding: 0 35px;
  padding-top: 20px;
  color: ${({ theme }) => theme.colors['primary-500']};
  font-size: 19px;
  h1 {
    font-weight: 400;
  }
  div {
    display: flex;
    position: relative;
    svg {
      align-self: flex-start;
      width: 32px;
      height: 32px;
      top: -24px;
      margin-left: -3px;
      position: relative;
    }
  }
`;

const LoginContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 35px;
  align-self: end;
  text-align: center;
  margin-top: 32px;
  position: sticky;
  bottom: 18px;
  z-index: 100;
  background: ${({ theme }) => theme.colors['gray-100']};

  .hidden {
    visibility: hidden;
    position: absolute;
    pointer-events: none;
    user-select: none;
  }
`;

const Button = styled.button`
  background: #03c75a;
  color: ${({ theme }) => theme.colors['white']};
  height: 47px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 599;
  svg {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }

  &:last-child {
    flex-direction: column;
    margin-top: 10px;
    background: ${({ theme }) => theme.colors['gray-400']};
    color: ${({ theme }) => theme.colors['neutral-600']};
    gap: 1px;

    div {
      font-size: 11px;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors['neutral-400']};
    }

    svg {
      width: 8px;
      height: 8px;
      margin-right: 4px;
    }
  }
`;

const NaverLoginLink = styled.a`
  display: none;
`;
