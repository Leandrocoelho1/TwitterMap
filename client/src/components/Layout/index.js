import React from 'react';
import styled from 'styled-components';

const LayoutStyles = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
`;

const ContentStyles = styled.div`
  width: 100%;
  max-width: 64.2rem;
`;

const SidebarStyles = styled.div`
  flex: 1;
  min-width: 29.4rem;
`;

export function Layout({ children }) {
  return <LayoutStyles>{children}</LayoutStyles>;
}

export function Content({ children }) {
  return <ContentStyles>{children}</ContentStyles>;
}
export function Sidebar({ children }) {
  return <SidebarStyles>{children}</SidebarStyles>;
}
