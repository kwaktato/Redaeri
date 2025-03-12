import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button/Button';
import ReviewLong from '@/assets/images/review-long.png';
import ReviewShort from '@/assets/images/review-short.png';
import ReviewMeddle from '@/assets/images/review-middle.png';
import ArrowLeft from '@/assets/images/arrow-left.svg?react';
import {
  PERSONA_LENGTH_QUESTION,
  PERSONA_SELECT_PERSONA_KEY,
  PERSONA_SELECT_QUESTION_VALUE,
  PersonaInsertType,
  personaMapping,
  PersonaPrefer,
} from '@/types/persona';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import { getPreferPersona } from '@/services/persona';

const PERSONA_LENGTH_QUESTION_IMG = [ReviewLong, ReviewMeddle, ReviewShort];

interface PersonaQuestionProps {
  children: ReactNode;
  questions: string[];
  onClickNextBtn: (question: string, type: keyof PersonaInsertType) => void;
  onClickBackBtn: () => void;
  type: keyof PersonaInsertType;
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
  const [preferPersona, setPreferPersona] = useState<PersonaPrefer>({
    preferPersona: '',
  });

  useEffect(() => {
    (async () => {
      const data = await getPreferPersona();
      setPreferPersona(data);
    })();
  }, []);

  return (
    <>
      <Container>
        <div>
          <QuestionTitle>{children}</QuestionTitle>
          {
            <QuestionContainer>
              {isLastPage
                ? PERSONA_LENGTH_QUESTION.map((question, index) => (
                    <ImageQuestionButton
                      key={index}
                      className={
                        selectedQuestion === question ? 'selected' : ''
                      }
                      onClick={() => setSelectedQuestion(question)}
                    >
                      <p>{question}</p>
                      <img
                        src={PERSONA_LENGTH_QUESTION_IMG[index] || ''}
                        alt='review-long'
                      />
                    </ImageQuestionButton>
                  ))
                : isFirstPage
                  ? questions.map((question) => (
                      <QuestionButton
                        key={question}
                        className={
                          selectedQuestion === question ? 'selected' : ''
                        }
                        onClick={() => setSelectedQuestion(question)}
                      >
                        {preferPersona.preferPersona ===
                          personaMapping[
                            PERSONA_SELECT_PERSONA_KEY[
                              PERSONA_SELECT_QUESTION_VALUE.indexOf(question)
                            ]
                          ] && (
                          <label>
                            많은 사장님들이 선택한 답변 스타일이에요!
                          </label>
                        )}
                        {question}
                      </QuestionButton>
                    ))
                  : questions.map((question) => (
                      <QuestionButton
                        key={question}
                        className={
                          selectedQuestion === question ? 'selected' : ''
                        }
                        onClick={() => setSelectedQuestion(question)}
                      >
                        {question}
                      </QuestionButton>
                    ))}
            </QuestionContainer>
          }
        </div>
      </Container>

      <StickyBottomContainer>
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
      </StickyBottomContainer>
    </>
  );
}

const ImageQuestionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  border-radius: 12px;
  padding: 12px 14px;
  text-align: start;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors['neutral-600']};

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
    font-weight: 599;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  // margin-bottom: 20px;
`;

const QuestionContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const QuestionButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  border-radius: 10px;
  // height: 47px;
  padding: 14px 0;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors['gray-900']};
  font-family: 'Pretendard Variable';
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  font-size: 13px;

  label {
    font-size: 10px;
    color: ${({ theme }) => theme.colors['primary-400']};
  }

  &.selected {
    border: 1px solid ${({ theme }) => theme.colors['primary-500']};
    background: ${({ theme }) => theme.colors['primary-400']};
    color: ${({ theme }) => theme.colors.white};

    label {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors['gray-700']};
  font-size: 14px;
  font-weight: 599;
  line-height: 0;
  svg {
    width: 14px;
    height: 14px;
  }
`;
