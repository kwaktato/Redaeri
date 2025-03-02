import DeleteIcon from '@/assets/images/delete.svg?react';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

/* eslint-disable no-console */
const DeletePage = () => {
  const navigate = useNavigate();

  const [reviewCount, setReviewCount] = useState(0);

  const baseURL = import.meta.env.VITE_APP_API_URL;
  const getReviewCount = async () => {
    const token = localStorage.getItem('token');

    try {
      const result = await axios.get(`${baseURL}/api/v1/user/answer/count`, {
        headers: {
          'Content-Type': 'application/json',
          Token: token,
        },
      });
      console.log(result.data);
      setReviewCount(result.data.data.answerCount);
    } catch (e) {
      console.log('리뷰 개수 조회 에러: ', e);
    }
  };

  useEffect(() => {
    getReviewCount();
  }, []);

  return (
    <Container>
      <Title>
        수많은 리뷰...
        <br />
        <span>리대리</span>가 사장님을 위한
        <br />
        최고의 답변을 작성해 드릴 수 있어요!
      </Title>
      <DeleteWrapper>
        <Delete />
      </DeleteWrapper>
      <Detail>
        사장님과 함께한 <span>리뷰 {reviewCount}개...</span>
        <br />
        <span>리대리</span>는 아직 사장님께 도움이 되고 싶어요.
      </Detail>
      <Guide>
        *계정 정보는 탈퇴 즉시 삭제되며, 탈퇴 시 이에 동의하는 것으로
        간주합니다.
      </Guide>
      <StickyBottomContainer>
        <ButtonWrapper>
          <ButtonBlue
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          >
            취소하기
          </ButtonBlue>
          <ButtonWhite
            onClick={() => {
              navigate('/delete-complete');
              window.scrollTo(0, 0);
            }}
          >
            탈퇴하기
          </ButtonWhite>
        </ButtonWrapper>
      </StickyBottomContainer>
    </Container>
  );
};

export default DeletePage;

const Container = styled.div`
  min-height: 100vh;
  padding: 48px 28px 0px 28px;
  display: flex;
  flex-direction: column;
  justify-contetn: center;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: 400;
  line-height: 133%;
  text-align: start;

  span {
    color: ${({ theme }) => theme.colors['primary-500']};
    font-weight: 500;
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 28px;
`;

const Delete = styled(DeleteIcon)`
  width: 320px;
  height: 100%;
`;

const Detail = styled.label`
  text-align: center;
  color: ${({ theme }) => theme.colors['gray-800']};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-weight: 500;
  line-height: 156%;

  span {
    font-weight: 599;
  }
`;

const Guide = styled.label`
  text-align: center;
  color: ${({ theme }) => theme.colors['gray-600']};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 13px;
  font-weight: 500;
  line-height: 154%;
  margin-top: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const ButtonBlue = styled.button`
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

const ButtonWhite = styled.button`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors['primary-500']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;
