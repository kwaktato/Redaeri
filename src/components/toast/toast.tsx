import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

import AlertIcon from '@/assets/images/alert.svg?react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const TOAST_DURATION = 2000;
// TODO: 우선 순위 낮춰서 Width full로 들어오게 수정 예정
export default function Toast({ isOpen, ...props }: ToastProps) {
  if (typeof window === 'undefined') return null;

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot || !isOpen) return null;

  return createPortal(
    <ToastContainer className='fixed w-screen h-screen top-0 z-50'>
      <ToastUI {...props} />
    </ToastContainer>,
    portalRoot
  );
}

const ToastContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ToastUI({ message, onClose }: Omit<ToastProps, 'isOpen'>) {
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadeOut(true);
    }, TOAST_DURATION - 100);

    return () => clearTimeout(fadeOutTimer);
  }, [isFadeOut, onClose]);

  return (
    <ToastUiContainer isFadeOut={isFadeOut}>
      <AlertIcon />
      {message}
    </ToastUiContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastUiContainer = styled.div<{ isFadeOut: boolean }>`
  bottom: 140px;
  position: absolute;

  animation: ${({ isFadeOut }) => (isFadeOut ? fadeOut : fadeIn)} 0.3s ease
    forwards;

  border-radius: 10px;
  padding: 12px;
  color: ${({ theme }) => theme.colors['white']};
  background: ${({ theme }) => theme.colors['gray-800']};

  display: flex;
  align-items: center;
  font-size: 14px;

  svg {
    margin-right: 8px;
  }
`;
