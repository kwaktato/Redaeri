import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import MainContainer from '@/components/mainContainer/mainContainer';
import Button from '@/components/button/Button';
import { createStore, updateStore } from '@/services/store';
import { User } from '@/types/user';
import { getUser } from '@/services/user';

export default function ShopCheck() {
  const [user, setUser] = useState<User>();
  const [isloading, setIsloading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const storeName = state?.storeName || '';
  const selectedFoodType = state?.selectedFoodType;

  const onClickCompleteBtn = async () => {
    try {
      setIsloading(true);
      if (user?.storeName || user?.storeType) {
        await updateStore({
          storeName: storeName,
          storeType: selectedFoodType?.name,
        });

        if (localStorage.getItem('token')) {
          navigate('/update-store');
          window.scrollTo(0, 0);
        } else {
          navigate('/upload-answer');
          window.scrollTo(0, 0);
        }
        setIsloading(false);
        return;
      }
      await createStore({
        storeName,
        storeType: selectedFoodType?.name,
      });
      setIsloading(false);
      navigate('/upload-answer');
      window.scrollTo(0, 0);
    } catch {
      // TODO: 에러 추가
      alert('에러 발생');
    }
  };

  useEffect(() => {
    if (!storeName || !selectedFoodType) {
      navigate('/shop-information');
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, []);

  return (
    <Container>
      <Title>
        <p>
          <strong>{selectedFoodType?.name}</strong>을(를) 판매하는
        </p>
        <p>
          <strong>{storeName}</strong> 사장님이시군요!
        </p>
        <p>가게 정보 설정을 완료할까요?</p>
      </Title>
      <Content>
        <video autoPlay loop muted playsInline>
          <source src={selectedFoodType?.selectedImage} type='video/mp4' />
        </video>
      </Content>
      <LinkContainer>
        <BackButton
          onClick={() => {
            navigate(-1);
            window.scrollTo(0, 0);
          }}
        >
          아니요, 다시 입력할래요
        </BackButton>
        <Button isLoading={isloading} onClick={onClickCompleteBtn}>
          설정 완료
        </Button>
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
  overflow: visible;

  video {
    display: flex;
    width: 300px;
    height: auto;
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
