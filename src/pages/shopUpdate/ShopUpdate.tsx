import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import GreetingImg from '@/assets/images/greeting.svg?react';

const ShopUpdate = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <label>
        <span>가게 정보 변경</span>이<br />
        완료되었습니다!
      </label>

      <Greeting>
        <GreetingImg className='greeting-img' />
      </Greeting>

      <ButtonWrapper>
        <button
          onClick={() => {
            navigate('/review');
            window.scrollTo(0, 0);
          }}
        >
          리뷰에 답하러 가기
        </button>
        <button
          style={{ background: '#26282A' }}
          onClick={() => {
            navigate('/upload-answer');
            window.scrollTo(0, 0);
          }}
        >
          답변 스타일도 수정하기
        </button>
      </ButtonWrapper>
    </Container>
  );
};

export default ShopUpdate;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 28px 20px 28px;
  position: relative;

  label {
    font-family: 'GmarketSansBold';
    font-size: 28px;
    font-weight: 400;
    line-height: 126%;
    color: ${({ theme }) => theme.colors['gray-800']};
  }

  span {
    color: ${({ theme }) => theme.colors['primary-500']};
  }
`;

const Greeting = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  position: absolute;
  top: 20%;
  right: -5%;

  .greeting-img {
    width: 320px;
    height: 360px;
  }
`;

const ButtonWrapper = styled(StickyBottomContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 100%;
    background: ${({ theme }) => theme.colors['primary-500']};
    color: ${({ theme }) => theme.colors['white']};
    height: 47px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 599;
  }
`;
