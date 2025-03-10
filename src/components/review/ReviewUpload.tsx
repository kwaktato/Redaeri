import MyInfo from '@/assets/images/myInfo.svg?react';
import Erase from '@/assets/images/erase.svg?react';
import LoadingChat from '@/assets/images/loadingS.svg?react';
import styled, { keyframes } from 'styled-components';
import Star from './Star';
import { useState } from 'react';
import { Link } from 'react-router';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import Account from '@/pages/account/Account';
import { useMutation } from '@tanstack/react-query';
import { getImageText } from '@/services/review';

interface ReviewUploadProps {
  handleReviewUpload: (rating: number, review: string) => void;
}

// 5.1 리뷰 업로드
const ReviewUpload = ({ handleReviewUpload }: ReviewUploadProps) => {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState(''); // 리대리 호출 시 사용할 리뷰 텍스트
  const [textCount, setTextCount] = useState(0); // 텍스트 카운트
  const [isImage, setIsImage] = useState(false); // 이미지 업로드인지
  const [isText, setIsText] = useState(false); // 텍스트 업로드인지
  const [isloading, setIsloading] = useState(false); // 텍스트 변환 로딩 중인지
  const isEnable = score > 0 && review.length > 0;

  // 별점 매기기
  const rating = (index: number) => {
    setScore(index + 1);
  };

  // 텍스트 분석할 이미지
  const [, setImage] = useState<File>();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsText(false);
    setIsImage(false);

    if (e?.target?.files) {
      const selectedFile = e.target.files[0];

      // 파일 용량 제한 (3MB)
      const maxSize = 3 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        alert('첨부 파일 사이즈는 3MB 이내로 등록 가능합니다.');
        return;
      }

      setImage(selectedFile);
      setIsImage(true);

      convert(selectedFile);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: File) => getImageText(data),
    onMutate: () => {
      setIsloading(true);
    },
    onSuccess: (result) => {
      setReview(
        result.data.reviewText.replace(/[\r\n]+/g, '').replace(/↵/g, '')
      );
      setTextCount(
        result.data.reviewText.replace(/[\r\n]+/g, '').replace(/↵/g, '').length
      );
    },
    onSettled: () => {
      setIsloading(false);
    },
  });

  const convert = async (selectedFile: File) => {
    mutation.mutate(selectedFile);
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
            <Title>고객 리뷰를 분석할게요</Title>
            <TitleDetail>
              ⚡️<span>신경 쓰이는 컴플레인</span>부터 💬
              <span>간단한 문의글</span>
              까지,
              <br />
              리대리가 빠르게 분석해 마음에 쏙 드는 답변을 만들어드려요!
            </TitleDetail>
          </TitleWrapper>

          <ScoreWrapper>
            <SubTitle>고객이 남긴 별점을 알려주세요.</SubTitle>
            <Scores>
              {[...Array(5)].map((_, index) => (
                <Score key={index} onClick={() => rating(index)}>
                  <Star filled={index < score} />
                </Score>
              ))}
            </Scores>
          </ScoreWrapper>

          <ReviewWrapper>
            <SubTitle>리뷰 캡처 이미지 혹은 텍스트를 업로드해주세요.</SubTitle>
            <Tip>
              TIP! 리뷰 영역에 맞춰 이미지를 조정하면 리대리가 더 잘 이해할 수
              있어요.
            </Tip>
            <ReviewButtonWrapper margin={!isImage && !isText}>
              <Button
                onClick={() => document.getElementById('imageInput')?.click()}
              >
                {isImage ? '리뷰 이미지 변경하기' : '리뷰 이미지 첨부하기'}
              </Button>
              <input
                id='imageInput'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              {!isImage && !isText && (
                <>
                  <Button onClick={() => setIsText(true)}>
                    텍스트로 입력하기
                  </Button>
                </>
              )}
              {isImage && isloading && (
                <LoadingScreen>
                  <LoadingWrapper>
                    <LoadingChat />
                    <Circle />
                  </LoadingWrapper>
                  <LoadingLabel>
                    리뷰 이미지를 텍스트로 변환 중입니다.
                    <br />
                    잠시만 기다려주세요.
                  </LoadingLabel>
                </LoadingScreen>
              )}
              {isImage && !isloading && (
                <>
                  <Guide>리대리가 오해한 내용은 없는지 잘 확인해주세요!</Guide>
                  <TextAreaWrapper>
                    <X
                      onClick={() => {
                        setReview('');
                        setTextCount(0);
                      }}
                    >
                      <Erase />
                    </X>
                    <TextArea
                      placeholder='고객이 남긴 리뷰를 입력해주세요.'
                      value={review}
                      maxLength={1000}
                      onChange={(e) => {
                        setTextCount(e.target.value.length);
                        setReview(e.target.value);
                      }}
                    />
                    <TextCount>{textCount}/1000</TextCount>
                  </TextAreaWrapper>
                </>
              )}
              {isText && (
                <>
                  <TextAreaWrapper>
                    <X
                      onClick={() => {
                        setReview('');
                        setTextCount(0);
                      }}
                    >
                      <Erase />
                    </X>
                    <TextArea
                      placeholder='고객이 남긴 리뷰를 입력해주세요.'
                      value={review}
                      maxLength={1000}
                      onChange={(e) => {
                        setTextCount(e.target.value.length);
                        setReview(e.target.value);
                      }}
                    />
                    <TextCount>{textCount}/1000</TextCount>
                  </TextAreaWrapper>
                </>
              )}
              <ToHistory to='/review-history'>
                이전에 생성한 AI답변을 보고 싶어요
              </ToHistory>
            </ReviewButtonWrapper>
          </ReviewWrapper>

          <StickyBottomContainer>
            <NextButton
              onClick={() => handleReviewUpload(score, review)}
              disabled={!isEnable}
              state={isEnable}
            >
              다음
            </NextButton>
          </StickyBottomContainer>
        </Container>
      )}
    </>
  );
};

export default ReviewUpload;

const Container = styled.div`
  position: relative;
  padding: 0px 28px 20px 28px;
  min-height: 100vh;
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
  right: -8px;
  path {
    stroke: ${({ theme }) => theme.colors['neutral-300']};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 35px;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 24px;
  font-weight: 400;
  line-height: 131%;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['neutral-400']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 170%;
  letter-spacing: -0.6px;

  span {
    font-weight: 599;
  }
`;

const SubTitle = styled.label`
  color: ${({ theme }) => theme.colors['neutral-600']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 599;
  line-height: 28px;
`;

const Tip = styled.div`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 12px;
  font-weight: 500;
  line-height: 154%;
  margin-bottom: 8px;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;
`;

const Scores = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Score = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 4px;
`;

const ReviewButtonWrapper = styled.div<{ margin: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: ${({ margin }) => (margin ? '104px' : '57px')};
`;

const Button = styled.button`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors['neutral-600']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 156%;
`;

const LoadingScreen = styled.div`
  height: 244px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-500']};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const LoadingWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
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
  width: 42px;
  height: 42px;
  border: 7px solid transparent;
  border-top: 7px solid ${({ theme }) => theme.colors['primary-500']};
  border-radius: 50%;
  top: 15%;
  left: 17%;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162.5%;
`;

const Guide = styled.label`
  display: flex;
  height: 32px;
  padding: 5px 10px;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-100']};

  color: ${({ theme }) => theme.colors['primary-500']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162%;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
`;

const X = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  right: 12px;
`;

const TextArea = styled.textarea`
  display: flex;
  height: 200px;
  width: 100%;
  padding: 12px 40px 12px 16px;
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
  }

  &:focus {
    outline: none;
  }
`;

const TextCount = styled.label`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
`;

const ToHistory = styled(Link)`
  color: ${({ theme }) => theme.colors['gray-600']};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162.5%;
  text-decoration-line: underline;
  margin-top: 4px;
`;

const NextButton = styled.button<{ state: boolean }>`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, state }) =>
    state ? theme.colors['primary-500'] : theme.colors['neutral-300']};

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 599;
`;
