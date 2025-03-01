import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  colorScheme?: 'primary' | 'white';
  shadow?: boolean;
}

// TODO: 로딩 상태 추가
export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
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
  box-shadow: ${({ shadow }) =>
    shadow ? '0px 3px 10px 0px rgba(0, 0, 0, 0.4)' : 'none'};

  &:disabled {
    background: ${({ theme }) => theme.colors['gray-200']};
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`;
