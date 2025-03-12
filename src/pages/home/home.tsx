import styled from 'styled-components';
import LogoIcon from '@/assets/images/logo.svg?react';
import Intro from '@/assets/images/Intro.gif';
import { useNavigate } from 'react-router';
import { getUser } from '@/services/user';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';

export default function Home() {
  const navigate = useNavigate();

  const onClickStartBtn = async () => {
    if (localStorage.getItem('token')) {
      const user = await getUser();
      const nextPage =
        user.storeIdx === null
          ? '/shop-information'
          : user.personaIdx === null
            ? '/upload-answer'
            : '/review';
      navigate(nextPage);
    } else {
      navigate('/login');
    }

    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Title>
        <h1>사장님의</h1>
        <h1>리뷰 답변 도우미,</h1>
        <div>
          <Logo />
          <h1>리대리</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Greeting src={Intro} />
        </div>
      </Title>

      <ActionContainer>
        <p>
          요식업 사장님들의 말투와 브랜드 아이덴티티를
          <br />
          반영한 맞춤형 리뷰 답변 자동 생성 서비스
        </p>
        <Link onClick={onClickStartBtn}>시작하기</Link>
      </ActionContainer>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors['primary-500']};
  padding: 40px 0 20px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;

const Greeting = styled.img`
  position: absolute;
  top: 25%;
  height: 360px;
  margin-right: -28px;
`;

const Logo = styled(LogoIcon)`
  width: 56px;
  height: 100%;
`;

const Title = styled.div`
  padding: 0 28px;
  color: ${({ theme }) => theme.colors['primary-200']};
  font-family: 'GmarketSansLight';
  font-size: 12px;
  div {
    display: flex;
    color: ${({ theme }) => theme.colors['white']};
    font-size: 28px;
    align-items: center;
    font-family: 'GmarketSansMedium';
  }
`;

const ActionContainer = styled(StickyBottomContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  text-align: center;
  background: ${({ theme }) => theme.colors['primary-500']};
  gap: 8px;
  padding-left: 28px;
  padding-right: 28px;

  color: ${({ theme }) => theme.colors['primary-100']};
  a {
    margin-top: 16px;
  }
  p {
    line-height: 170%;
  }
`;

const Link = styled.button`
  background: ${({ theme }) => theme.colors['black']};
  color: ${({ theme }) => theme.colors['white']};
  width: 100%;
  display: block;
  text-align: center;
  font-size: 16px;
  font-weight: 599;
  border-radius: 12px;
  padding: 14px 0;
`;
