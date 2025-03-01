import LoadingChat from '@/assets/images/loading.svg?react';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  first: string;
  second: string;
  details: string[];
}

const Loading = ({ first, second, details }: LoadingProps) => {
  const [currentDetail, setCurrentDetail] = useState(details[0]);
  const [index, setIndex] = useState(1);

  setInterval(() => {
    if (index >= details.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setCurrentDetail(details[index]);
  }, 3000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <LoadingWrapper>
        <LoadingChat />
        <Circle />
      </LoadingWrapper>
      <LabelWrapper>
        <Title>
          {first}
          <br />
          {second}
        </Title>
        <Detail>{currentDetail}</Detail>
      </LabelWrapper>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  background: ${({ theme }) => theme.colors['primary-500']};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const LoadingWrapper = styled.div`
  position: relative;
  width: 114.589px;
  height: 114.589px;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  border: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors['primary-500']};
  border-radius: 50%;
  top: 18%;
  left: 18%;
  animation: ${rotate} 2s linear infinite;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const Title = styled.label`
  font-family: 'GmarketSansMedium';
  font-size: 21px;
  line-height: 130%;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Detail = styled.label`
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors['primary-200']};
`;
