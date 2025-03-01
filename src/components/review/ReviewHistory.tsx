import styled from 'styled-components';
import ArrowLeft from '@/assets/images/arrow-left.svg?react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewHistoryNone from './ReviewHistoryNone';

interface History {
  rownum: number;
  logIdx: number;
  score: number;
  generateAnswer: string;
  reviewType: string;
  reviewText: string;
  insertDate: string;
  insertTime: string;
}

// 5.5 리뷰 히스토리
/* eslint-disable no-console */
const ReviewHistory = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<History[]>([]);

  const baseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDIsImV4cCI6MTc0MTcwNzIwMywiaWF0IjoxNzQwODQzMjAzfQ.JWHbxheQDgu4U1BhJWALFw7ANgp6iWVxtrtbREW6bCg';
    try {
      const result = await axios.get(`${baseURL}/api/v1/answer/log/get`, {
        headers: {
          'Content-Type': 'applicatoin/json',
          Token: token,
        },
      });
      console.log(result.data);
      setDatas(result.data.data);
    } catch (e) {
      console.log('리뷰히스토리 가져오기 에러: ', e);
    }
  };

  const [isCardClicked, setIsCardClicked] = useState(false);
  const handleCardClick = () => {
    setIsCardClicked(true);
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {datas.length > 0 ? (
        <Container>
          <Navbar>
            <NavLeft
              onClick={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            />
            <NavCenter>리뷰 히스토리</NavCenter>
          </Navbar>

          <LabelWrapper>
            <Label state='bold'>최신순</Label>
            <Label state=''>최대 20개의 리뷰를 확인할 수 있어요</Label>
          </LabelWrapper>

          <CardsWrapper>
            {datas.map((data) => (
              <CardWrapper key={data.logIdx} onClick={handleCardClick}>
                <IdWrapper>
                  <IdLabel>{data.rownum}</IdLabel>
                  <State type={data.reviewType}>{data.reviewType}</State>
                </IdWrapper>
                <TextWrapper>
                  <TextLabel>{data.generateAnswer}</TextLabel>
                  <TimeWrapper>
                    <TimeLabelWrapper>
                      <TimeLabel state='bold'>날짜</TimeLabel>
                      <TimeLabel state=''>{data.insertDate}</TimeLabel>
                    </TimeLabelWrapper>
                    <Border />
                    <TimeLabelWrapper>
                      <TimeLabel state='bold'>시간</TimeLabel>
                      <TimeLabel state=''>{data.insertTime}</TimeLabel>
                    </TimeLabelWrapper>
                  </TimeWrapper>
                </TextWrapper>
              </CardWrapper>
            ))}
            {isCardClicked && <></>}
          </CardsWrapper>
        </Container>
      ) : (
        <ReviewHistoryNone />
      )}
    </>
  );
};

export default ReviewHistory;

const Container = styled.div`
  padding: 0px 28px 48px 28px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const LabelWrapper = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const Label = styled.label<{ state: string }>`
  color: ${({ theme, state }) =>
    state === 'bold'
      ? theme.colors['neutral-600']
      : theme.colors['neutral-400']};
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: ${({ state }) => (state === 'bold' ? '599' : '500')};
  line-height: 150%;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: Column;
  align-items: center;
  gap: 6px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 94px;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  background: ${({ theme }) => theme.colors.white};
`;

const IdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
`;

const IdLabel = styled.label`
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 24px;
  font-weight: 400;
  line-height: 133%;
`;

const State = styled.label<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme, type }) => {
    switch (type) {
      case '중립':
        return theme.colors['gray-600'];
      case '문의':
        return theme.colors['secondary-500'];
      case '부정':
        return theme.colors['point-100'];
      case '긍정':
        return theme.colors['primary-500'];
      default:
        return theme.colors['gray-600'];
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 90%;
`;

const TextLabel = styled.label`
  color: ${({ theme }) => theme.colors['neutral-500']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162.5%;
  height: 52px;
  overflow: scroll;
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const TimeLabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const TimeLabel = styled.label<{ state: string }>`
  color: ${({ theme }) => theme.colors['neutral-300']};
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-style: normal;
  font-weight: ${({ state }) => (state === 'bold' ? '599' : '500')};
  line-height: 154%;
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors['gray-500']};
`;
