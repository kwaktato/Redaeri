import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router';

import WhiteLogo from '@/assets/images/blue-logo.svg?react';
import NaverLogo from '@/assets/images/naver-logo.svg?react';
import SlideImageOne from '@/assets/images/login-slide-1.png';
import SlideImageTwo from '@/assets/images/login-slide-2.png';
import SlideImageThree from '@/assets/images/login-slide-3.png';
// import KakaoLogo from '@/assets/images/kakao-logo.svg?react';
import { getNaverUser, getTestToken } from '@/services/user';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Login() {
  const naverLoginLinkRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  const onClickNaverBtn = async () => {
    // if (!naverLoginLinkRef.current) return;
    // naverLoginLinkRef.current.click();
    const { data } = await getTestToken();
    document.cookie = `token=${data.token}`;
    navigate('/shop-information');
  };

  // const onClickKakaoBtn = () => {
  //   document.cookie = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDAsImV4cCI6MTc0MTcwOTE5MiwiaWF0IjoxNzQwODQ1MTkyfQ.0BD8XXVou_oPhXX9-pbNglpMzcJBRj5lro8YUx1OXvg`;
  //   navigate('/shop-information');
  //   window.scrollTo(0, 0);
  // };

  const getUser = async (code: string, state: string) => {
    try {
      const user = await getNaverUser(code, state);
      document.cookie = `token=${user.token}`;
      navigate('/shop-information');
    } catch {
      alert('에러 발생');
    }
  };

  useEffect(() => {
    const naverHash = new URLSearchParams(window.location.search);
    const code = naverHash.get('code');
    const state = naverHash.get('state');

    if (code && state) {
      getUser(code, state);
    }

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
        modules={[Pagination, Autoplay]}
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
        <p>
          리대리 서비스를 이용하려면 <strong>로그인</strong>이 필요해요!
        </p>
        <NaverLoginLink
          className='hidden'
          ref={naverLoginLinkRef}
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&state=false&redirect_uri=${import.meta.env.VITE_NAVER_CALLBACK_URL}`}
        >
          네이버 로그인 테스트
        </NaverLoginLink>
        <Button onClick={onClickNaverBtn}>
          <NaverLogo />
          네이버로 로그인하기
        </Button>
        {/* <Button onClick={onClickKakaoBtn}>
          <KakaoLogo />
          테스트용 로그인하기
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

const NaverLoginLink = styled.a`
  display: none;
`;
