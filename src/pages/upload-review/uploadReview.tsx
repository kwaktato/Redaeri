import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/button/Button';
import CloseIcon from '@/assets/images/close.svg?react';
import { Link, useNavigate } from 'react-router';
import Loading from '@/components/loading/Loading';

// TODO: API 연결, 이미지 3개이상 첨부 문구 및 toast
// TODO: textarea 띄어쓰기 하지 않을 경우 줄바꿈 이슈 확인
export default function UploadReview() {
  const [isOpenTextArea, setIsOpenTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [fileList, setFileList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activatedTextareaValue, setActivatedTextareaValue] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length >= 3) {
        alert('최대 3개까지 업로드 가능합니다.');
        return;
      }

      setFileList(Array.from(files));
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.placeholder =
        '다음 3가지 리뷰 답변 업로드를 추천드려요.\n1. 고객의 칭찬에 대한 답변\n2. 부정적인 코멘트에 대처하는 답변\n3. 고객의 문의 리뷰에 응답하는 답변';
    }
  }, [isOpenTextArea]);

  return isLoading ? (
    <Loading
      first='사장님의 답변 스타일을'
      second='분석하고 있어요'
      details={['리대리가 사장님의 답변을 수신했어요...']}
    />
  ) : (
    <Container onSubmit={onSubmitForm}>
      <div>
        <Title>
          <strong>웨일즈 베이커리</strong>
          <p>사장님, 반갑습니다!</p>

          <div className='info'>
            <p>
              <strong>안성맞춤, 찰떡콩떡</strong>한 리뷰 생성을 위해
            </p>
            <p>사장님의 말투를 먼저 분석합니다.</p>
            <p>직접 장성하신 답변의 사진이나 텍스트를 업로드해주세요.</p>
            <span>*최대 3개의 답변까지 가능합니다.</span>
          </div>
        </Title>

        <Content>
          <input
            type='file'
            id='file'
            accept='image/*'
            multiple
            onChange={onChangeFile}
          />
          <label htmlFor='file'>답변 이미지 첨부하기</label>
          {isOpenTextArea ? (
            <TextareaContainer>
              {/* TODO: 텍스트 입력 시 Textarea height 늘어나는 작업 */}
              <Textarea
                ref={textareaRef}
                maxLength={500}
                defaultValue={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <div>
                <span className={textareaValue.length === 500 ? 'error' : ''}>
                  {textareaValue.length} / 500
                </span>
                <BlackButton
                  onClick={() => {
                    setActivatedTextareaValue(textareaValue);
                    setIsOpenTextarea(false);
                  }}
                >
                  완료
                </BlackButton>
              </div>
            </TextareaContainer>
          ) : (
            <CustomButton
              colorScheme='white'
              onClick={() => setIsOpenTextarea(true)}
            >
              텍스트로 입력하기
            </CustomButton>
          )}

          <UploadContainer>
            <p>업로드한 사장님 답변</p>
            <div className='upload-file'>
              <p>{fileList.map((file) => file.name).join(' / ')}</p>
              {fileList.length > 0 && (
                <CloseIcon role='button' onClick={() => setFileList([])} />
              )}
            </div>
            <div className='upload-textarea'>
              <p>{isOpenTextArea ? '' : activatedTextareaValue}</p>
              {!isOpenTextArea && activatedTextareaValue && (
                <CloseIcon
                  role='button'
                  onClick={() => {
                    setActivatedTextareaValue('');
                    setTextareaValue('');
                  }}
                />
              )}
            </div>
          </UploadContainer>
        </Content>
      </div>

      <ButtonContainer>
        <Link to='/persona'>답변 업로드 건너뛰기</Link>
        <Button
          type='submit'
          disabled={!fileList.length && !activatedTextareaValue}
        >
          설정 완료
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 28px 48px 35px;
`;

const Title = styled.section`
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  color: ${({ theme }) => theme.colors['gray-800']};
  margin-bottom: 10px;
  strong {
    color: ${({ theme }) => theme.colors['primary-500']};
    font-family: 'GmarketSansBold';
    font-weight: 599;
  }
  .info {
    margin-top: 12px;
    font-family: 'Pretendard Variable';
    font-size: 15px;
    color: ${({ theme }) => theme.colors['gray-700']};
    strong {
      font-weight: 300;
      color: ${({ theme }) => theme.colors['gray-700']};
      position: relative;
      &::after {
        content: '....';
        position: absolute;
        color: ${({ theme }) => theme.colors['primary-500']};
        top: -20px;
        right: -4px;
        letter-spacing: 9px;
        font-size: 17px;
      }
    }
    span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors['gray-600']};
    }
  }
`;

const CustomButton = styled(Button)`
  font-weight: 400;
  margin-top: 12px;
  font-size: 13px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    height: 39px;
    background-color: ${({ theme }) => theme.colors['white']};
    padding: 12px 18px;
    color: ${({ theme }) => theme.colors['gray-900']};
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent;
    &:focus {
      outline: none;
    }
  }

  input {
    display: none;
  }

  div {
    font-size: 15px;
    font-weight: 599;
    color: ${({ theme }) => theme.colors['gray-900']};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  border: none;
  border-radius: 12px;
  outline: none;
  padding: 12px 18px;
  margin-top: 12px;
  font-family: 'Pretendard Variable';
  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
    font-size: 13px;
    letter-spacing: -0.32px;
    line-height: 18px;
  }
  &:empty::before {
    content: '첫 번째 줄\A두 번째 줄\A세 번째 줄';
    white-space: pre-line;
  }
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  span {
    color: ${({ theme }) => theme.colors['gray-600']};
    font-size: 13px;
    font-weight: 500;
    &.error {
      color: ${({ theme }) => theme.colors['error']};
    }
  }
`;

const BlackButton = styled.button`
  background-color: ${({ theme }) => theme.colors['gray-900']};
  color: ${({ theme }) => theme.colors['white']};
  font-size: 15px;
  border-radius: 8px;
  padding: 8px 24px;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
  font-weight: 200;

  svg {
    position: absolute;
    width: 20px;
    right: 10px;
    top: 7px;
  }

  div {
    position: relative;
    padding: 8px 12px;
    padding-right: 32px;
    height: 46px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors['gray-600']};
    font-size: 12px;
    border-radius: 12px;
  }

  .upload-textarea p {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시할 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload-file p {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors['gray-600']};
    font-size: 12px;
    overflow: hidden;
    line-height: 28px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  a {
    margin-bottom: 12px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors['gray-600']};
    text-decoration: underline;
`;
