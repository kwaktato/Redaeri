import WarningIcon from '@/assets/images/warning.svg?react';
import styled from 'styled-components';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import { useEffect } from 'react';

interface ReviewFailProps {
  toReview: () => void;
}

// 5.4 답변 작성 실패 시
const ReviewFail = ({ toReview }: ReviewFailProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <Warning />
        <Label>
          리대리 답변 생성이 중단되었어요.
          <br />
          잠시 후 다시 시도해 주세요.
        </Label>
      </Container>
      <StickyBottomContainer
        style={{ width: '100%', paddingLeft: '28px', paddingRight: '28px' }}
      >
        <Button onClick={toReview}>확인</Button>
      </StickyBottomContainer>
    </>
  );
};

export default ReviewFail;

const Container = styled.div`
  padding: 0px 28px 48px 28px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Warning = styled(WarningIcon)`
  width: 48px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors['neutral-600']};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  line-height: 136%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 599;
`;
