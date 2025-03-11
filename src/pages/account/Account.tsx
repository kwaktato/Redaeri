import styled from 'styled-components';
import XICon from '@/assets/images/X.svg?react';
import Arrow from '@/assets/images/arrow-left.svg?react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '@/types/user';
import { getUser } from '@/services/user';
import { FOOD_TYPE } from '@/types/food';
import { personaMapping } from '@/types/persona';
import Toast from '@/components/toast/toast';

interface AccountClose {
  close: () => void;
}

const Account = ({ close }: AccountClose) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  const [toastStatus, setToastStatus] = useState({
    isOpen: false,
    message: '',
  });

  const foodItem = FOOD_TYPE.find((item) => item.name === user?.storeType);
  const selectedImage = foodItem?.image;

  const convert = (
    object: Record<string, string>,
    value: string | undefined
  ) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToastStatus({
      isOpen: true,
      message: '로그아웃되었습니다.',
    });
    navigate('/');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Navbar>
        <NavCenter>내 정보</NavCenter>
        <NavRight onClick={close} />
      </Navbar>
      <Wrapper>
        <Title>가게 정보</Title>
        <Info>
          <div>
            <img src={selectedImage} alt='가게 타입 이미지' />
            <label>{user?.storeName}</label>
          </div>
          <button
            onClick={() => {
              navigate('/shop-information');
              window.scrollTo(0, 0);
            }}
          >
            변경
          </button>
        </Info>
      </Wrapper>
      <Wrapper>
        <Title>답변 스타일</Title>
        <Info
          onClick={() => {
            navigate('/persona-success');
            window.scrollTo(0, 0);
          }}
        >
          <label>{convert(personaMapping, user?.personaSelect)}</label>
          <ArrowNext />
        </Info>
      </Wrapper>
      <Wrapper>
        <Title>리뷰 히스토리</Title>
        <Info
          onClick={() => {
            navigate('/review-history');
            window.scrollTo(0, 0);
          }}
        >
          <label>생성했던 AI 답변 확인</label>
          <ArrowNext />
        </Info>
      </Wrapper>
      <DeleteWrapper>
        <label onClick={logout}>로그아웃</label>
        <Border />
        <label
          onClick={() => {
            navigate('/delete');
            window.scrollTo(0, 0);
          }}
        >
          서비스 탈퇴
        </label>
      </DeleteWrapper>

      <Toast
        isOpen={toastStatus.isOpen}
        onClose={() => setToastStatus({ isOpen: false, message: '' })}
        message={toastStatus.message}
      />
    </Container>
  );
};

export default Account;

const Container = styled.div`
  min-height: 100vh;
  padding: 0px 28px;
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors['neutral-500']};
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: 400;
  line-height: 133%;
`;

const NavRight = styled(XICon)`
  cursor: pointer;
  position: absolute;
  width: 28px;
  height: 28px;
  right: -8px;
  path {
    stroke: ${({ theme }) => theme.colors['neutral-300']};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 32px;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['neutral-600']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 599;
  line-height: 156%;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 36px;
  }

  label {
    color: ${({ theme }) => theme.colors['neutral-600']};
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-weight: 500;
    line-height: 150%;
  }

  button {
    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors['neutral-600']};
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-weight: 500;
    line-height: 162.5%;
  }
`;

const ArrowNext = styled(Arrow)`
  display: flex;
  width: 9px;
  height: 18px;
  transform: rotate(180deg);

  path {
    stroke: ${({ theme }) => theme.colors['neutral-600']};
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  label {
    color: ${({ theme }) => theme.colors['neutral-300']};
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 154%;
    text-align: center;
  }
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors['gray-500']};
`;
