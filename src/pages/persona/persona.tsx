import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import XICon from '@/assets/images/X.svg?react';
import Loading from '@/components/loading/Loading';
import PersonaQuestion from '@/pages/persona/personaQuestion';
import {
  PERSONA_SELECT_PERSONA_KEY,
  PERSONA_SELECT_QUESTION_VALUE,
  PERSONA_EMOTION_QUESTION,
  PersonaInsertType,
  GetPersonaType,
  personaMapping,
  emotionMapping,
  lengthMapping,
} from '@/types/persona';
import { createPersona, getPersona, updatePersona } from '@/services/persona';

// TODO: UI 완성 후 주석 삭제 예정
export default function Persona() {
  const [persona, setPersona] = useState<GetPersonaType | null>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<PersonaInsertType>({
    personaSelect: '',
    emotionSelect: '',
    lengthSelect: '',
  });

  const navigate = useNavigate();

  const onClickBackBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const onClickNextBtn = async (
    question: string,
    type: keyof PersonaInsertType
  ) => {
    const currentQuestion =
      currentPage === 0
        ? PERSONA_SELECT_PERSONA_KEY[
            PERSONA_SELECT_QUESTION_VALUE.indexOf(question)
          ]
        : question;

    setCurrentPersona({ ...currentPersona, [type]: currentQuestion });
    setCurrentPage(currentPage + 1);

    const isLastPage = currentPage === 2;
    if (!isLastPage) return;

    setIsloading(true);

    const personaSelect = personaMapping[currentPersona.personaSelect];
    const emotionSelect = emotionMapping[currentPersona.emotionSelect];
    const lengthSelect = lengthMapping[question];

    if (persona) {
      const { data } = await updatePersona({
        personaIdx: persona.personaIdx,
        emotionSelect: emotionSelect,
        lengthSelect: lengthSelect,
        personaSelect: personaSelect,
      });

      // TODO: APi 수정이 필요해 임시 방편으로 state사용
      navigate('/persona-success', {
        state: { personaImgType: data.personaImgType },
      });
      window.scrollTo(0, 0);

      return;
    }

    const { data } = await createPersona({
      emotionSelect: emotionSelect,
      lengthSelect: lengthSelect,
      personaSelect: personaSelect,
    });
    // TODO: APi 수정이 필요해 임시 방편으로 state사용
    navigate('/persona-success', {
      state: { personaImgType: data.personaImgType },
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    (async () => {
      const data = await getPersona();
      setPersona(data);
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !isloading ? (
    <Container>
      <Navbar>
        <ProgressBarContainer>
          <ProgressBar className={currentPage >= 0 ? 'active' : ''} />
          <ProgressBar className={currentPage >= 1 ? 'active' : ''} />
          <ProgressBar className={currentPage >= 2 ? 'active' : ''} />
          <NavRight
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        </ProgressBarContainer>
      </Navbar>

      {currentPage === 0 && (
        <PersonaQuestion
          isFirstPage
          onClickBackBtn={onClickBackBtn}
          questions={PERSONA_SELECT_QUESTION_VALUE}
          onClickNextBtn={onClickNextBtn}
          type='personaSelect'
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
          type='emotionSelect'
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
          type='lengthSelect'
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
      details={[
        '리대리가 사장님의 답변을 수신했어요',
        '리대리가 사장님의 답변을 읽고 있어요',
        '답변을 열심히 공부하고 있어요',
        '사장님의 답변 스타일을 분석하고 있어요',
      ]}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 28px 0 28px;
  min-height: 100vh;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavRight = styled(XICon)`
  cursor: pointer;
  position: absolute;
  width: 28px;
  height: 28px;
  top: 0;
  right: -8px;
  path {
    stroke: ${({ theme }) => theme.colors['neutral-300']};
  }
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
