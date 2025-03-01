import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  colorScheme?: 'primary' | 'white';
  isLoading?: boolean;
}

// TODO: 로딩 상태 추가
export default function Button({ children, ...props }: ButtonProps) {
  return (
    <StyledButton {...props}>
      {props.isLoading ? (
        <>
          <Spinner />
          <span>""</span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, colorScheme }) =>
    colorScheme === 'white'
      ? theme.colors['white']
      : theme.colors['primary-500']};
  font-family: 'Pretendard Variable';
  border-radius: 12px;
  padding: 14px 0;
  color: ${({ theme, colorScheme }) =>
    colorScheme === 'white' ? theme.colors['gray-900'] : theme.colors['white']};
  width: 100%;
  font-weight: 599;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};

  ${({ isLoading }) =>
    isLoading &&
    `
    color: transparent;
    > *:not(div) { 
      visibility: hidden;
    }
  `}

  &:disabled {
    background: ${({ theme }) => theme.colors['gray-200']};
    color: ${({ theme }) => theme.colors['gray-500']};
  }

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  span {
    opacity: 0;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  border: 2px solid ${({ theme }) => theme.colors['gray-200']};
  border-top: 2px solid ${({ theme }) => theme.colors['primary-500']};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
