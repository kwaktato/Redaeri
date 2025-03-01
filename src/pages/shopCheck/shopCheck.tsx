import { Link as RouterLink, useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useEffect } from 'react';

import MainContainer from '@/components/mainContainer/mainContainer';

export default function ShopCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const shopName = state?.shopName;
  const selectedFoodType = state?.selectedFoodType;

  useEffect(() => {
    if (!shopName || !selectedFoodType) {
      navigate('/shop-information');
    }
  }, []);

  return (
    <Container>
      <Title>
        <p>
          <strong>{selectedFoodType?.name || ''}</strong>를 판매하는
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
        <Link to='/persona' className='success'>
          설정 완료
        </Link>
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
`;

const BackButton = styled.button`
  font-size: 13px;
  color: ${({ theme }) => theme.colors['gray-600']};
  text-decoration: underline;
  text-align: center;
`;

const Link = styled(RouterLink)`
  &.success {
    background: ${({ theme }) => theme.colors['primary-500']};
    color: ${({ theme }) => theme.colors['white']};
    font-size: 13px;
    font-weight: 599;
    padding: 12px 0;
    border-radius: 12px;
    text-align: center;
  }

  position: sticky;
  bottom: 12px;
`;
