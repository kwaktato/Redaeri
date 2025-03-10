import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import MainContainer from '@/components/mainContainer/mainContainer';
import PersonaSuccessImg from '@/assets/images/persona-1.png';
import CopyIcon from '@/assets/images/copy.svg?react';
import Button from '@/components/button/Button';
import Tooltip from '@/assets/images/tooltip.png';
import { getPersona, updateAllAnswer } from '@/services/persona';
import Toast from '@/components/toast/toast';
import { getUser } from '@/services/user';
import { User } from '@/types/user';
import {
  emotionMappingSuccess,
  GetPersonaType,
  lengthMappingSuccess,
  PERSONA_IMG_TYPE,
  personaMapping,
} from '@/types/persona';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';

export default function PersonaSuccess() {
  const navigate = useNavigate();

  const [persona, setPersona] = useState<GetPersonaType>();
  const [user, setUser] = useState<User>();
  const [updatedAllAnswer, setUpdatedAllAnswer] = useState('');
  const [toastStatus, setToastStatus] = useState({
    isOpen: false,
    message: '',
  });

  const personaImgType = persona?.personaImgType
    ? PERSONA_IMG_TYPE[persona.personaImgType - 1]
    : PersonaSuccessImg;

  const convert = (
    object: Record<string, string>,
    value: string | undefined
  ) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const onClickCopyAnswerBtn = async () => {
    if (!persona?.allAnswer) return;
    try {
      await navigator.clipboard.writeText(
        updatedAllAnswer || persona.allAnswer
      );
      setToastStatus({
        isOpen: true,
        message: '복사되었습니다.',
      });
    } catch {
      setToastStatus({
        isOpen: true,
        message: '복사를 실패했습니다.',
      });
    }
  };

  const onClickUpdateAllAnswer = async () => {
    try {
      if (!persona?.personaIdx) {
        return;
      }

      await updateAllAnswer({
        allAnswer: updatedAllAnswer,
        personaIdx: persona.personaIdx,
      });

      setToastStatus({
        isOpen: true,
        message: '만능 답변이 수정되었어요.',
      });
    } catch {
      alert('에러 발생!');
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const persona = await getPersona();
      if (!user || !persona) {
        navigate('/login');
        window.scrollTo(0, 0);

        return;
      }

      setUser(user);
      setPersona(persona);
    })();
  }, []);

  return (
    <Container>
      <Title>
        <p>
          <strong>{user?.storeName} </strong>
          사장님은
        </p>
        <div>
          <img src={personaImgType} alt='persona-success' />
          <p>
            당신은{' '}
            <strong>
              {emotionMappingSuccess[user?.emotionSelect || 'thank']}
            </strong>
          </p>
          <p>
            <strong>
              {lengthMappingSuccess[user?.lengthSelect || 'long']}
            </strong>
            을 선호하는
          </p>
          <p>
            <strong>
              {convert(personaMapping, user?.personaSelect || 'nicePersona')}
            </strong>{' '}
            이군요!
          </p>
        </div>
      </Title>

      <Content>
        <div className='content-title'>
          <div>
            <p>사장님을 위해 어떤 상황에서도 사용 가능한</p>
            <p>
              <strong>나만의 만능 답변</strong>을 준비했어요!
            </p>
          </div>

          <button onClick={onClickCopyAnswerBtn}>
            <CopyIcon />
          </button>
        </div>

        <div className='copy-answer'>
          <textarea
            defaultValue={user?.allAnswer}
            onChange={(e) => setUpdatedAllAnswer(e.target.value)}
          />
        </div>

        <div className='save-answer'>
          <span>만능 답변을 수정해 더욱 알맞게 만들어보세요!</span>
          {updatedAllAnswer !== '' && (
            <SaveButton onClick={onClickUpdateAllAnswer}>
              만능답변 저장하기
            </SaveButton>
          )}
        </div>
      </Content>

      <ButtonContainer>
        <img src={Tooltip} alt='tooltip' />
        <WhiteButton
          colorScheme='white'
          onClick={() => {
            navigate('/persona');
            window.scrollTo(0, 0);
          }}
          role='link'
        >
          스타일 수정하기
        </WhiteButton>
        <BlackButton
          onClick={() => {
            navigate('/review');
            window.scrollTo(0, 0);
          }}
          role='link'
        >
          리뷰에 답하러 가기
        </BlackButton>
      </ButtonContainer>

      <Toast
        isOpen={toastStatus.isOpen}
        onClose={() => setToastStatus({ isOpen: false, message: '' })}
        message={toastStatus.message}
      />
    </Container>
  );
}

const Container = styled(MainContainer)`
  background: ${({ theme }) => theme.colors['primary-500']};
  padding: 40px 28px 0 28px;
  min-height: 100vh;
`;

const Title = styled.section`
  color: ${({ theme }) => theme.colors['white']};
  font-size: 22px;
  font-family: GmarketSansMedium;
  strong {
    font-family: GmarketSansBold;
    font-weight: 599;
  }
  div {
    img {
      width: 100%;
      margin-bottom: 14px;
    }
    box-shadow: 0px 4px 10px 0px ${({ theme }) => theme.colors['primary-600']};
    font-family: 'Pretendard Variable';
    padding: 20px;
    border-radius: 12px;
    color: ${({ theme }) => theme.colors['gray-800']};
    margin-top: 8px;
    background: ${({ theme }) => theme.colors['white']};
    width: 100%;
    font-size: 14px;
    strong {
      font-weight: 100;
    }
  }
`;

const Content = styled.section`
  color: ${({ theme }) => theme.colors['white']};
  font-size: 16px;
  margin-top: 28px;

  textarea {
    height: 200px;
    border: none;
    width: 100%;
    outline: none;
    font-family: 'Pretendard Variable';
    font-size: 14px;
    line-height: 156%;
    border-radius: 12px;
    padding: 12px 16px;
    background: ${({ theme }) => theme.colors['primary-100']};
    color: ${({ theme }) => theme.colors['primary-700']};
  }

  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 6px;
    svg {
      border-radius: 6px;
      height: 28px;
    }
    strong {
      font-weight: 599;
    }
  }

  .copy-answer {
    position: relative;
    margin-top: 6px;
    button {
      position: absolute;
      right: 12px;
      top: 4px;
    }
  }

  .save-answer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.colors['primary-200']};
    margin-top: 4px;
  }
`;

const ButtonContainer = styled(StickyBottomContainer)`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  gap: 8px;
  // position: sticky;
  // bottom: 12px;
  background: ${({ theme }) => theme.colors['primary-500']};

  img {
    width: 200px;
    position: absolute;
    top: -40px;
    transform: translateX(-50%);
    left: 100px;
  }
`;

const WhiteButton = styled(Button)`
  color: ${({ theme }) => theme.colors['primary-500']};
  position: sticky;
  bottom: 12px;
`;

const BlackButton = styled(Button)`
  background: ${({ theme }) => theme.colors['gray-900']};
  color: ${({ theme }) => theme.colors['white']};

  position: sticky;
  bottom: 12px;
`;

const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors['primary-200']};
  color: ${({ theme }) => theme.colors['primary-600']};
  font-size: 12px;
  font-family: 'Pretendard Variable';
  padding: 6px 8px;
  border-radius: 8px;
`;
