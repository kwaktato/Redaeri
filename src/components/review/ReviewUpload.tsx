import MyInfo from '@/assets/images/myInfo.svg?react';
import Erase from '@/assets/images/erase.svg?react';
import LoadingChat from '@/assets/images/loadingS.svg?react';
import styled, { keyframes } from 'styled-components';
import Star from './Star';
import { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

interface ReviewUploadProps {
  handleReviewUpload: (rating: number, review: string) => void;
}

// 5.1 리뷰 업로드
/* eslint-disable no-console */
const ReviewUpload = ({ handleReviewUpload }: ReviewUploadProps) => {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState(''); // 리대리 호출 시 사용할 리뷰 텍스트
  const [textCount, setTextCount] = useState(0); // 텍스트 카운트
  const [isImage, setIsImage] = useState(false); // 이미지 업로드인지
  const [isText, setIsText] = useState(false); // 텍스트 업로드인지
  const [isLoading, setIsLoading] = useState(false); // 텍스트 변환 로딩 중인지
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

  const baseURL = import.meta.env.VITE_APP_API_URL;
  const convert = async (selectedFile: File) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('reviewImgFile', selectedFile);
    // api 호출
    try {
      const result = await axios.post(
        `${baseURL}/api/v1/image/text/read`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6MjUsImV4cCI6MTc0MDgzNTQyNSwiaWF0IjoxNzQwNzQ5MDI1fQ.LLZ4UrDZ27-Kd8RNEfOmGAFjgzyXFA-Jw2ufUSv-3a0',
          },
        }
      );
      console.log(result.data);
      setReview(
        result.data.data.reviewText.replace(/[\r\n]+/g, '').replace(/↵/g, '')
      );
    } catch (e) {
      console.log('리뷰 사진 에러: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <My>
        <MyInfo />
      </My>

      <TitleWrapper>
        <Title>고객 리뷰를 분석할게요</Title>
        <TitleDetail>
          ⚡️<span>신경 쓰이는 컴플레인</span>부터 💬<span>간단한 문의글</span>
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
        <ReviewButtonWrapper margin={!isImage && !isText}>
          <Button
            onClick={() => document.getElementById('imageInput')?.click()}
          >
            {isImage ? '이미지 변경하기' : '리뷰 이미지 첨부하기'}
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
              <Button onClick={() => setIsText(true)}>텍스트로 입력하기</Button>
            </>
          )}
          {isImage && isLoading && (
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
          {isImage && !isLoading && (
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

      <BottomWrapper>
        <Border />
        <NextButton
          onClick={() => handleReviewUpload(score, review)}
          disabled={!isEnable}
          state={isEnable}
        >
          다음
        </NextButton>
      </BottomWrapper>
    </Container>
  );
};

export default ReviewUpload;

const Container = styled.div`
  position: relative;
  padding: 68px 28px 48px 28px;
  min-height: 100vh;
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

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 35px;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 26px;
  font-weight: 400;
  line-height: 131%;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['neutral-400']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;

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
`;

const Score = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewButtonWrapper = styled.div<{ margin: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: ${({ margin }) => (margin ? '104px' : '57px')};
`;

const Button = styled.button`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-600']};
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
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-weight: 500;
    line-height: 162%;
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
  font-size: 16px;
  font-weight: 500;
  line-height: 162.5%;
  text-decoration-line: underline;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: sticky;
  bottom: 0px;
  margin: 0px -28px;
  padding-bottom: 12px;
  background: ${({ theme }) => theme.colors['gray-100']};
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors['gray-200']};
`;

const NextButton = styled.button<{ state: boolean }>`
  display: flex;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, state }) =>
    state ? theme.colors['primary-500'] : theme.colors['neutral-300']};

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;

  margin: 0px 28px;
`;
