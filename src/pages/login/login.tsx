import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import WhiteLogo from '@/assets/images/blue-logo.svg?react';
import NaverLogo from '@/assets/images/naver-logo.svg?react';
import SlideImageOne from '@/assets/images/login-slide-1.png';
import SlideImageTwo from '@/assets/images/login-slide-2.png';
import SlideImageThree from '@/assets/images/login-slide-3.png';

import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router';

export default function Login() {
  const naverLoginBtnRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onClickNaverBtn = () => {
    if (!window.naver || !naverLoginBtnRef.current) return;
    navigate('/shop-information');
    (naverLoginBtnRef.current.children[0] as HTMLAnchorElement).click();
  };

  useEffect(() => {
    if (!window.naver) return;

    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: import.meta.env.VITE_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 50,
      },
    });

    if (!naverLogin) return;
    naverLogin.init();
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
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
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
        <p>
          리대리 서비스를 이용하려면 <strong>로그인</strong>이 필요해요!
        </p>
        <a
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=false&redirect_uri=${import.meta.env.VITE_NAVER_CALLBACK_URL}`}
        >
          네이버 로그인 테스트
        </a>
        <Button onClick={onClickNaverBtn}>
          <div id='naverIdLogin' className='hidden' ref={naverLoginBtnRef} />
          <NaverLogo />
          네이버로 로그인하기
        </Button>
        {/* <Button>
          <KakaoLogo />
          카카오로 로그인하기
        </Button> */}
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 48px;
`;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  padding: 27px 28px;
  .swiper-pagination-bullets {
    position: relative;
    margin-top: 13px;
  }
`;

const SwiperContent = styled(SwiperSlide)`
  width: 300px;
  background: ${({ theme }) => theme.colors['white']};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.section`
  padding: 0 35px;
  padding-top: 70px;
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
  margin-top: 20px;
  p {
    color: ${({ theme }) => theme.colors['gray-700']};
    font-size: 12px;
    margin-bottom: 12px;
  }
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
  padding: 15px 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 599;
  svg {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }
`;

// &:last-child {
//   margin-top: 10px;
//   background: #f7e600;
//   color: ${({ theme }) => theme.colors['black']};
// }
