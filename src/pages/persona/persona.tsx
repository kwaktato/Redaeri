import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Loading from '@/components/loading/Loading';
import PersonaQuestion from '@/pages/persona/personaQuestion';
import {
  PERSONA_BOSS_QUESTION,
  PERSONA_EMOTION_QUESTION,
} from '@/types/persona';

// TODO: UI 완성 후 주석 삭제 예정
export default function Persona() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onClickBackBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const onClickNextBtn = () => {
    // TODO: props question: string, type: string 추가
    // TODO: 마지막 페이지일 때 서버에 요청 및 navigate
    if (currentPage === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/persona-success');
      }, 3000);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return !isLoading ? (
    <Container>
      <ProgressBarContainer>
        <ProgressBar className={currentPage >= 0 ? 'active' : ''} />
        <ProgressBar className={currentPage >= 1 ? 'active' : ''} />
        <ProgressBar className={currentPage >= 2 ? 'active' : ''} />
      </ProgressBarContainer>

      {currentPage === 0 && (
        <PersonaQuestion
          isFirstPage
          onClickBackBtn={onClickBackBtn}
          questions={PERSONA_BOSS_QUESTION}
          onClickNextBtn={onClickNextBtn}
          type='boss'
        >
          <p>
            <strong>어떤 말투</strong>로
          </p>
          <p>답변하고 싶으세요?</p>
        </PersonaQuestion>
      )}
      {currentPage === 1 && (
        <PersonaQuestion
          onClickBackBtn={onClickBackBtn}
          questions={PERSONA_EMOTION_QUESTION}
          onClickNextBtn={onClickNextBtn}
          type='emotion'
        >
          <p>답변을 작성할 때</p>
          <p>
            어떤 <strong>감정</strong>을 느끼시나요?
          </p>
        </PersonaQuestion>
      )}
      {currentPage === 2 && (
        <PersonaQuestion
          onClickBackBtn={onClickBackBtn}
          questions={[]}
          onClickNextBtn={onClickNextBtn}
          type='review'
          isLastPage
        >
          <p>
            <strong>답변 길이</strong>는
          </p>
          <p>어느 정도가 좋을까요?</p>
        </PersonaQuestion>
      )}
    </Container>
  ) : (
    <Loading
      first='사장님의 답변 스타일을'
      second='분석하고 있어요'
      details={['리대리가 사장님의 답변을 수신했어요...']}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 28px 48px 28px;
  min-height: 100vh;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ProgressBar = styled.div`
  width: 45px;
  height: 3px;
  margin-bottom: 40px;
  border-top: 4px solid ${({ theme }) => theme.colors['gray-400']};
  &.active {
    border-top: 4px solid ${({ theme }) => theme.colors['primary-500']};
  }
`;
