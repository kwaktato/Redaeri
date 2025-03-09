import LoadingChat from '@/assets/images/loading.svg?react';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  first: string;
  second: string;
  details: string[];
}

const Loading = ({ first, second, details }: LoadingProps) => {
  const [currentDetail, setCurrentDetail] = useState(details[0]);
  const [dots, setDots] = useState('');

  const indexRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current >= details.length - 1) {
        indexRef.current = 0;
      } else {
        indexRef.current = indexRef.current + 1;
      }
      setCurrentDetail(details[indexRef.current]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 1000);

    return () => clearInterval(dotInterval);
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
        <Detail>
          {currentDetail}
          {dots}
        </Detail>
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
