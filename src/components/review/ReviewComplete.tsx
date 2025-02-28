import styled from 'styled-components';
import MyInfo from '@/assets/images/myInfo.svg?react';
import ArrowDown from '@/assets/images/arrowDown.svg?react';
import CopyIcon from '@/assets/images/copy.svg?react';
import Tooltip from '@/assets/images/tooltip.png';
import Star from './Star';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

// 5.4 답변 완료 - 완료
const ReviewComplete = () => {
  const [score, setScore] = useState(0);

  const getReview = () => {
    // api 호출
    setScore(4);
  };

  // 답변 복사하기
  const copy = async () => {
    // try {
    //   await navigator.clipboard.writeText(answerText);
    //   alert('답변이 클립보드에 복사되었습니다!');
    // } catch (e) {
    //   alert('복사에 실패했습니다. 다시 시도해주세요.');
    //   /* eslint-disable no-console */
    //   console.log('클립보드 복사 실패: ', e);
    // }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <Container>
      <My>
        <StyledMyInfo />
      </My>

      <TitleWrapper>
        <TitleDetail>
          <span>웨일즈 베이커리</span>에 대한
        </TitleDetail>
        <Title>
          <span>긍정</span>리뷰가 달렸어요
        </Title>
      </TitleWrapper>

      <Scores>
        {[...Array(5)].map((_, index) => (
          <Score key={index}>
            <Star filled={index < score} />
          </Score>
        ))}
      </Scores>

      <Review>
        저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서
        감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을
        좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희 가게
        음식을 좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서
        감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을
        좋아해주셔서 감사합니다저희 가
      </Review>

      <Arrow />

      <AnswerWrapper>
        <AnswerTitle>
          이렇게 <span>답변해보시는 건 어떨까요?</span>
        </AnswerTitle>
        <Answer>
          저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서
          감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을
          좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희
          가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을 좋아해주셔서
          감사합니다저희 가게 음식을 좋아해주셔서 감사합니다저희 가게 음식을
          좋아해주셔서 감사합니다저희 가
          <Copy onClick={copy} />
        </Answer>
        <Rewrite>
          원하는 답변이 아닌가요? <span>답변 재작성하기</span>
        </Rewrite>
      </AnswerWrapper>

      <BottomWrapper>
        <Border />
        <ButtonWrapper>
          <img src={Tooltip} alt='tooltip' />
          <Button state='' to='upload-review'>
            스타일 수정하기
          </Button>
          <Button state='black' to='/review'>
            다른 리뷰도 답변하기
          </Button>
        </ButtonWrapper>
      </BottomWrapper>
    </Container>
  );
};

export default ReviewComplete;

const Container = styled.div`
  position: relative;
  padding: 68px 28px 0px 28px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors['primary-500']};
`;

const My = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledMyInfo = styled(MyInfo)`
  path {
    stroke: #aad3ff;
  }
  circle {
    stroke: #aad3ff;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['primary-100']};
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-weight: 400;
  line-height: 126%;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'GmarketSansBold';
    font-weight: 500;
  }
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['primary-100']};
  font-family: 'GmarketSansMedium';
  font-size: 25px;
  font-weight: 400;
  line-height: 126%;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'GmarketSansBold';
    font-weight: 500;
  }
`;

const Scores = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

const Score = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Review = styled.label`
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors['primary-300']};
  color: ${({ theme }) => theme.colors['primary-200']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162%;
`;

const Arrow = styled(ArrowDown)`
  margin: 16px auto;
  display: flex;
  justify-content: center;
  width: 28px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 36px;
`;

const AnswerTitle = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;

  span {
    font-weight: 599;
  }
`;

const Answer = styled.label`
  padding: 12px 52px 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-100']};
  border: 1px solid ${({ theme }) => theme.colors['primary-200']};
  color: ${({ theme }) => theme.colors['primary-700']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162%;
  position: relative;
`;

const Copy = styled(CopyIcon)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const Rewrite = styled.button`
  color: ${({ theme }) => theme.colors['primary-100']};
  text-align: end;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162.5%;
  text-decoration-line: underline;

  span {
    font-weight: 599;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 48px;
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors['primary-600']};
  margin: 0px -28px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  position: relative;

  img {
    width: 200px;
    position: absolute;
    top: -40px;
    transform: translateX(-50%);
    left: 100px;
  }
`;

const Button = styled(Link)<{ state: string }>`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, state }) =>
    state === 'black' ? theme.colors.black : theme.colors.white};

  color: ${({ theme, state }) =>
    state === 'black' ? theme.colors.white : theme.colors['primary-500']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;
