import styled from 'styled-components';
import XICon from '@/assets/images/X.svg?react';
import Arrow from '@/assets/images/arrow-left.svg?react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface User {
  userIdx: number;
  storeIdx: number;
  storeName: string;
  storeType: string;
  personaSelect: string;
  personaIdx: number;
}

interface AccountClose {
  close: () => void;
}

/* eslint-disable no-console */
const Account = ({ close }: AccountClose) => {
  const navigate = useNavigate();

  const [data, setData] = useState<User>();

  const baseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDIsImV4cCI6MTc0MTcwNzIwMywiaWF0IjoxNzQwODQzMjAzfQ.JWHbxheQDgu4U1BhJWALFw7ANgp6iWVxtrtbREW6bCg';
    try {
      const result = await axios.get(`${baseURL}/api/v1/user/get`, {
        headers: {
          'Content-Type': 'applicatoin/json',
          Token: token,
        },
      });
      console.log(result.data);
      setData(result.data.data);
    } catch (e) {
      console.log('내정보 가져오기 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
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
          <label>{data?.storeName}</label>
        </Info>
      </Wrapper>
      <Wrapper>
        <Title>페르소나</Title>
        <Info
          onClick={() => {
            navigate('/persona-success');
            window.scrollTo(0, 0);
          }}
        >
          <label>{data?.personaSelect}</label>
          <ArrowNext />
        </Info>
      </Wrapper>
      <DeleteWrapper>
        {/* <label>로그아웃</label>
        <Border /> */}
        <label
          onClick={() => {
            navigate('/delete');
            window.scrollTo(0, 0);
          }}
        >
          회원탈퇴
        </label>
      </DeleteWrapper>
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
  right: 0px;
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
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-200']};

  label {
    color: ${({ theme }) => theme.colors['neutral-600']};
    font-family: 'Pretendard Variable';
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
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
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 154%;
    text-align: center;
  }
`;

// const Border = styled.div`
//   width: 1px;
//   height: 12px;
//   background: ${({ theme }) => theme.colors['gray-500']};
// `;
