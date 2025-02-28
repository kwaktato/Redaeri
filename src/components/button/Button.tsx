import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  colorScheme?: 'primary' | 'white';
}

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
  font-weight: bold;

  &:disabled {
    background: ${({ theme }) => theme.colors['gray-200']};
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`;
