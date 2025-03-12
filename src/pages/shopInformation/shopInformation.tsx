import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import XICon from '@/assets/images/X.svg?react';
import CloseIcon from '@/assets/images/close.svg?react';
import { FOOD_TYPE } from '@/types/food';
import Button from '@/components/button/Button';

export default function ShopInformation() {
  const [storeName, setStoreName] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState<{
    name: string;
    image: string;
    selectedImage: string;
  }>();
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/shop-check', {
      state: { selectedFoodType, storeName },
    });
    window.scrollTo(0, 0);
  };

  const close = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsClose(true);
    }
  });

  return (
    <Form onSubmit={onSubmitForm}>
      <Navbar>{isClose && <NavRight onClick={close} />}</Navbar>
      <ContentContainer>
        <Greeting>
          <p>사장님, 안녕하세요!</p>
          <p>안성맞춤 답변 생성을 위해</p>
          <p>
            <strong>가게 이름</strong>과 <strong>음식 종류 </strong>정보가
            필요해요.
          </p>
        </Greeting>

        <InputContainer>
          <label htmlFor='shopName'>가게 이름을 입력해주세요.</label>
          <div>
            <input
              type='text'
              id='shopName'
              placeholder='상호명을 입력해주세요.'
              maxLength={25}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            {storeName && (
              <button onClick={() => setStoreName('')}>
                <CloseIcon />
              </button>
            )}
          </div>
        </InputContainer>

        <FoodTypeContainer>
          <p>판매 하시는 음식 종류를 선택해주세요.</p>
          <ul>
            {FOOD_TYPE.map((food) => (
              <li
                key={food.name}
                role='button'
                className={
                  selectedFoodType?.name === food.name ? 'selected' : ''
                }
                onClick={() => setSelectedFoodType(food)}
              >
                <img src={food.image} alt={food.name} />
                <p>{food.name}</p>
              </li>
            ))}
          </ul>
        </FoodTypeContainer>
      </ContentContainer>

      <SubmitButton type='submit' disabled={!storeName || !selectedFoodType}>
        확인
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 28px 48px 28px;
`;

const Greeting = styled.section`
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  color: ${({ theme }) => theme.colors['gray-800']};
  strong {
    font-family: 'GmarketSansBold';
    color: ${({ theme }) => theme.colors['primary-500']};
    font-weight: 599;
  }
`;

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: -56px;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 64px;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 0 36px 0;
  font-size: 15px;
  div {
    position: relative;
  }
  label {
    color: ${({ theme }) => theme.colors['gray-900']};
    padding-bottom: 8px;
    font-weight: 599;
  }
  input {
    padding: 12px 16px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors['gray-200']};
    border-radius: 12px;
    outline: none;
    font-size: 12px;

    &::placeholder {
      font-size: 12px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const FoodTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: 599;
  color: ${({ theme }) => theme.colors['gray-900']};
  p {
    margin-bottom: 8px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  li {
    cursor: pointer;
    &.selected {
      background: ${({ theme }) => theme.colors['primary-500']};
      color: ${({ theme }) => theme.colors['white']};
    }
    list-style: none;
    background: ${({ theme }) => theme.colors['white']};
    color: ${({ theme }) => theme.colors['gray-900']};
    font-size: 12px;
    font-weight: 400;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
    img {
      width: 80px;
    }
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
  font-size: 16px;

  position: sticky;
  bottom: 12px;
`;
