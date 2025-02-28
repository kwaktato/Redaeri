import { ReactNode, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button/Button';
import ReviewLong from '@/assets/images/review-long.jpg';
import ReviewShort from '@/assets/images/review-short.jpg';
import ReviewMeddle from '@/assets/images/review-middle.jpg';
import ArrowLeft from '@/assets/images/arrow-left.svg?react';
import { PERSONA_REVIEW_QUESTION } from '@/types/persona';

interface PersonaQuestionProps {
  children: ReactNode;
  questions: string[];
  onClickNextBtn: (question: string, type: string) => void;
  onClickBackBtn: () => void;
  type: string;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

export default function PersonaQuestion({
  children,
  questions,
  onClickNextBtn,
  onClickBackBtn,
  type,
  isFirstPage,
  isLastPage,
}: PersonaQuestionProps) {
  const [selectedQuestion, setSelectedQuestion] = useState('');

  return (
    <Container>
      <div>
        <QuestionTitle>{children}</QuestionTitle>
        {
          <QuestionContainer>
            {isLastPage ? (
              <>
                <ImageQuestionButton
                  className={
                    selectedQuestion === PERSONA_REVIEW_QUESTION[0]
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    setSelectedQuestion(PERSONA_REVIEW_QUESTION[0])
                  }
                >
                  <p>정성이 최고 긴~ 답변</p>
                  <img src={ReviewLong} alt='review-long' />
                </ImageQuestionButton>
                <ImageQuestionButton
                  className={
                    selectedQuestion === PERSONA_REVIEW_QUESTION[1]
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    setSelectedQuestion(PERSONA_REVIEW_QUESTION[1])
                  }
                >
                  <p>길지도 짧지도 않게 알잘딱깔센</p>
                  <img src={ReviewMeddle} alt='review-middle' />
                </ImageQuestionButton>
                <ImageQuestionButton
                  className={
                    selectedQuestion === PERSONA_REVIEW_QUESTION[2]
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    setSelectedQuestion(PERSONA_REVIEW_QUESTION[2])
                  }
                >
                  <p>정성이 최고 짧은~ 답변</p>
                  <img src={ReviewShort} alt='review-short' />
                </ImageQuestionButton>
              </>
            ) : (
              questions.map((question) => (
                <QuestionButton
                  key={question}
                  className={selectedQuestion === question ? 'selected' : ''}
                  onClick={() => setSelectedQuestion(question)}
                >
                  {question}
                </QuestionButton>
              ))
            )}
          </QuestionContainer>
        }
      </div>

      <ButtonContainer>
        {!isFirstPage && (
          <BackButton onClick={onClickBackBtn}>
            <ArrowLeft />
            이전으로
          </BackButton>
        )}
        <Button
          disabled={!selectedQuestion}
          onClick={() => onClickNextBtn(selectedQuestion, type)}
        >
          {isLastPage ? '사장님의 답변 스타일은?' : '다음'}
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const ImageQuestionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  border-radius: 12px;
  padding: 12px 14px;
  text-align: start;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.white};
  &.selected {
    border: 1px solid ${({ theme }) => theme.colors['primary-500']};
    background: ${({ theme }) => theme.colors['primary-400']};
    color: ${({ theme }) => theme.colors.white};
  }

  img {
    margin-top: 8px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors['gray-300']};
    border-radius: 12px;
  }
`;

const ButtonContainer = styled.div`
  padding-top: 80px;
`;

const QuestionTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-family: 'GmarketSansMedium';
  color: ${({ theme }) => theme.colors['gray-800']};
  margin-bottom: 22px;

  strong {
    font-family: 'GmarketSansBold';
    color: ${({ theme }) => theme.colors['primary-500']};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuestionContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const QuestionButton = styled.button`
  width: 100%;
  border-radius: 10px;
  padding: 14px 0;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors['gray-900']};
  font-family: 'Pretendard Variable';
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};

  &.selected {
    border: 1px solid
      ${({ theme }) => theme.colors['<primary-5></primary-5>00']};
    background: ${({ theme }) => theme.colors['primary-400']};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors['gray-700']};
  font-size: 14px;
  font-weight: 700;
  line-height: 0;
  svg {
    width: 14px;
    height: 14px;
  }
`;
