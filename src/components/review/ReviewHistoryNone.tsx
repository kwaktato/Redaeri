import ReviewNoneIcon from '@/assets/images/reviewHistory.svg?react';
import ArrowLeft from '@/assets/images/arrow-left.svg?react';
import { Link } from 'react-router';
import styled from 'styled-components';

const ReviewHistoryNone = () => {
  return (
    <Container>
      <Navbar>
        <NavLeft>{'<'}</NavLeft>
        <NavCenter>리뷰 히스토리</NavCenter>
      </Navbar>
      <Icon />
      <Label>
        아직 리대리를 이용한 적이 없으시네요.
        <br />
        지금 리뷰 대리 작성 서비스를 이용해 보세요!
      </Label>
      <Button to='/review'>확인</Button>
    </Container>
  );
};

export default ReviewHistoryNone;

const Container = styled.div`
  position: relative;
  padding: 0px 28px 48px 28px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
  position: absolute;
  left: 0px;
  path {
    stroke: ${({ theme }) => theme.colors['neutral-300']};
  }
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors['neutral-500']};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: 400;
  line-height: 133%;
`;

const Icon = styled(ReviewNoneIcon)`
  margin-top: 120px;
  width: 320px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors['neutral-500']};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const Button = styled(Link)`
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['neutral-600']};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-weight: 599;
`;
