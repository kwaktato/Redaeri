import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useEffect } from 'react';

import MainContainer from '@/components/mainContainer/mainContainer';
import Button from '@/components/button/Button';
// import { createStore } from '@/services/store';

export default function ShopCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const shopName = state?.shopName;
  const selectedFoodType = state?.selectedFoodType;

  const onClickCompleteBtn = async () => {
    try {
      // await createStore({
      //   shopName,
      //   storeType: selectedFoodType?.name,
      // });
      navigate('/persona');
    } catch {
      // TODO: 에러 추가
      alert('에러 발생');
    }
  };

  useEffect(() => {
    if (!shopName || !selectedFoodType) {
      navigate('/shop-information');
    }
  }, []);

  return (
    <Container>
      <Title>
        <p>
          <strong>{selectedFoodType?.name || ''}</strong>를(을) 판매하는
        </p>
        <p>
          <strong>{shopName || ''}</strong> 사장님이시군요!
        </p>
        <p>이렇게 정보 설정을 완료할까요?</p>
      </Title>
      <Content>
        <img src={selectedFoodType?.selectedImage} alt='' />
      </Content>
      <LinkContainer>
        <BackButton onClick={() => navigate(-1)}>
          아니요, 다시 입력할래요
        </BackButton>
        <Button onClick={onClickCompleteBtn}>설정 완료</Button>
      </LinkContainer>
    </Container>
  );
}

const Container = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.section`
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  margin-bottom: 40px;
  strong {
    color: ${({ theme }) => theme.colors['primary-500']};
    font-family: 'GmarketSansBold';
    font-weight: 599;
  }
`;

const Content = styled.section`
  background: ${({ theme }) => theme.colors['white']};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 30px;
  img {
    width: 250px;
    height: 250px;
  }
`;

const LinkContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;

  position: sticky;
  bottom: 17px;
`;

const BackButton = styled.button`
  font-size: 13px;
  color: ${({ theme }) => theme.colors['gray-600']};
  text-decoration: underline;
  text-align: center;
`;
