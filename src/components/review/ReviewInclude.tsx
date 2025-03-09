import MyInfo from '@/assets/images/myInfo.svg?react';
import { useState } from 'react';
import styled from 'styled-components';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import Account from '@/pages/account/Account';

interface ReviewIncludeProps {
  includeText: string;
  beforeButton: () => void;
  handleIncludeText: (text: string) => void;
  handlePostAnswer: () => void;
}

// 5.2 포함 문구 입력
const ReviewInclude = ({
  includeText,
  beforeButton,
  handleIncludeText,
  handlePostAnswer,
}: ReviewIncludeProps) => {
  const [textCount, setTextCount] = useState(0);

  const handleAnswer = () => {
    includeText = '';
    handleIncludeText(includeText);
    handlePostAnswer();
  };

  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      {infoOpen && <Account close={() => setInfoOpen(false)} />}
      {!infoOpen && (
        <Container>
          <Navbar>
            <NavRight onClick={() => setInfoOpen(true)} />
          </Navbar>

          <TitleWrapper>
            <Title>
              꼭 넣고 싶은
              <br />
              내용이 있나요?
            </Title>
            <TitleDetail>(선택사항)</TitleDetail>
          </TitleWrapper>

          <IncludeWrapper>
            <Include
              placeholder='포함하고 싶은 내용을 이모티콘 없이 작성해주세요.'
              maxLength={100}
              onChange={(e) => {
                handleIncludeText(e.target.value);
                setTextCount(e.target.value.length);
              }}
            />
            <IncludeCount>{textCount}/100</IncludeCount>
          </IncludeWrapper>

          <ExamWrapper>
            <ExamTitle>이런 내용을 넣으면 좋아요!</ExamTitle>
            <Exam>
              <span>신제품 홍보</span>
              <label>
                “이번에 새롭게 출시된 달콤 짭짜롬한 앙버터 소금빵도
                추천드립니다!”
              </label>
            </Exam>
            <Exam>
              <span>특이사항 안내</span>
              “혈당 조절이 어려운 분들을 위해 맛있는 건강식을 제공합니다."
            </Exam>
            <Exam>
              <span>시즈널 음식 추천</span>
              “겨울이 제철인 방어회도 요즘 정말 맛있답니다! 다음에
              도전해보세요.”
            </Exam>
          </ExamWrapper>

          <StickyBottomContainer>
            <Before onClick={beforeButton}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='11'
                height='19'
                viewBox='0 0 11 19'
                fill='none'
              >
                <path
                  d='M10.3 1L2 9.3L10.3 17.6'
                  stroke='#73797F'
                  stroke-width='2'
                />
              </svg>
              <div>이전으로</div>
            </Before>
            <ButtonBottom onClick={handleAnswer}>
              리대리 답변 확인하기
            </ButtonBottom>
          </StickyBottomContainer>
        </Container>
      )}
    </>
  );
};

export default ReviewInclude;

const Container = styled.div`
  padding: 0px 28px 48px 28px;
  min-height: 100vh;
  position: relative;
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavRight = styled(MyInfo)`
  cursor: pointer;
  position: absolute;
  width: 36px;
  height: 36px;
  right: 0px;
  path {
    stroke: ${({ theme }) => theme.colors['neutral-300']};
  }
`;

const TitleWrapper = styled.label`
  display: flex;
  gap: 6px;
  align-items: flex-end;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-weight: 400;
  line-height: 157%;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 25px;
  font-weight: 400;
  line-height: 135%;
`;

const IncludeWrapper = styled.div`
  margin-top: 18px;
  margin-bottom: 41px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Include = styled.textarea`
  display: flex;
  width: 100%;
  height: 128px;
  padding: 12px 17px;
  resize: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['neutral-300']};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors['neutral-500']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162%;

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-weight: 500;
    line-height: 162%;
  }

  &:focus {
    outline: none;
  }
`;

const IncludeCount = styled.label`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
`;

const ExamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 55px;
`;

const ExamTitle = styled.label`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
  line-height: 157%;
`;

const Exam = styled.label`
  height: 67px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-500']};

  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: 500;
  line-height: 157%;

  span {
    font-weight: 599;
  }
`;

const Before = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  div {
    color: ${({ theme }) => theme.colors['gray-700']};
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-weight: 599;
    line-height: 28px;
  }
`;

const ButtonBottom = styled.button`
  margin-top: 8px;

  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-500']};

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;
