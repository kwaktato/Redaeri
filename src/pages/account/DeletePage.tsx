import DeleteIcon from '@/assets/images/delete.svg?react';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import { deleteUser, getUserReviewCount } from '@/services/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const DeletePage = () => {
  const navigate = useNavigate();

  const [reviewCount, setReviewCount] = useState(0);

  const handleDelete = () => {
    deleteUser();
    localStorage.removeItem('token');
    navigate('/delete-complete');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    (async () => {
      const data = await getUserReviewCount();
      setReviewCount(data.answerCount);
    })();
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
      <StickyBottomContainer>
        <ButtonWrapper>
          <ButtonBlue
            onClick={() => {
              navigate('/review');
              window.scrollTo(0, 0);
            }}
          >
            취소하기
          </ButtonBlue>
          <ButtonWhite onClick={handleDelete}>탈퇴하기</ButtonWhite>
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
  letter-spacing: -0.6px;

  span {
    color: ${({ theme }) => theme.colors['primary-500']};
    font-weight: 599;
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
  font-size: 16px;
  font-weight: 500;
  line-height: 143%;

  span {
    font-weight: 599;
  }
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
  font-size: 16px;
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
  font-size: 16px;
  font-weight: 599;
`;
