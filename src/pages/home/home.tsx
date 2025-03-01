import { Link as RouterLink } from 'react-router';
import styled from 'styled-components';

import Logo from '@/assets/images/logo.svg?react';
// import GreetingImg from '@/assets/images/greeting.png';

export default function Home() {
  return (
    <Container>
      <Title>
        <h1>사장님의</h1>
        <h1>리뷰 답변 도우미,</h1>
        <div>
          <Logo />
          <h1>리대리</h1>
        </div>
        {/* <MainImg src={GreetingImg} alt='greeting' /> */}
      </Title>

      <ActionContainer>
        <p>요식업 사장님들의 말투와 브랜드 아이덴티티를</p>
        <p>반영한 맞춤형 리뷰 답변 자동 생성 서비스</p>
        <Link to='/login'>시작하기</Link>
      </ActionContainer>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors['primary-500']};
  height: 100vh;
  padding: 90px 28px 48px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

// const MainImg = styled.img`
//   position: absolute;
//   right: -60px;
// `;

const Title = styled.div`
  color: ${({ theme }) => theme.colors['primary-200']};
  font-family: 'GmarketSansLight';
  font-size: 16px;
  div {
    display: flex;
    color: ${({ theme }) => theme.colors['white']};
    font-size: 26px;
    align-items: center;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors['primary-100']};
  a {
    margin-top: 16px;
  }
`;

const Link = styled(RouterLink)`
  background: ${({ theme }) => theme.colors['black']};
  color: ${({ theme }) => theme.colors['white']};
  width: 100%;
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: 599;
  border-radius: 12px;
  padding: 14px 0;
`;
