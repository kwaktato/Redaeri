import styled from 'styled-components';

interface StickyBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function StickyBottom({
  children,
  ...props
}: StickyBottomProps) {
  return <StickyBottomContainer {...props}>{children}</StickyBottomContainer>;
}

export const StickyBottomContainer = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: auto;
  padding-bottom: 18px;
  padding-top: 5px;
  background: ${({ theme }) => theme.colors['gray-100']};
`;
