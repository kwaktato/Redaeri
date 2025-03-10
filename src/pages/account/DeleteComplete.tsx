import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const DeleteComplete = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Label>탈퇴가 완료되었습니다.</Label>
      </Container>
      <StickyBottomContainer
        style={{ width: '100%', paddingLeft: '28px', paddingRight: '28px' }}
      >
        <Button
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
        >
          확인
        </Button>
      </StickyBottomContainer>
    </>
  );
};

export default DeleteComplete;

const Container = styled.div`
  min-height: 100vh;
  padding: 0px 28px 48px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors['neutral-600']};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 22px;
  font-weight: 400;
  line-height: 136%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 599;
`;
