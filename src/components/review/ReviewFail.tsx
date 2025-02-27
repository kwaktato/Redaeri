import Warning from '@/assets/images/warning.svg?react';
import { Link } from 'react-router';
import styled from 'styled-components';

// 5.4 답변 작성 실패 시
const ReviewFail = () => {
  return (
    <Container>
      <Wrapper>
        <Warning />
        <Label>
          리대리가 답변 작성을 어려워하고 있어요.
          <br />
          잠시 후 다시 시도해 주세요.
        </Label>
      </Wrapper>
      <Button to='/review'>확인</Button>
    </Container>
  );
};

export default ReviewFail;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors['neutral-600']};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  line-height: 136%;
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
  font-weight: 700;
  line-height: 30px;
`;
