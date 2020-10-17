import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LayoutStyles = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  overflow-x: hidden;
`;

const ContentStyles = styled(motion.div)`
  width: 100%;
  max-width: 64.2rem;
`;

const SidebarStyles = styled.div`
  flex: 1;
  /* min-width: 29.4rem; */
`;

export function Layout({ children }) {
  return <LayoutStyles>{children}</LayoutStyles>;
}

const animationVariance = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-2rem',
  },
};

const animationTransition = {
  duration: 0.4,
};

export function Content({ children }) {
  return (
    <ContentStyles
      initial="out"
      animate="in"
      exit="out"
      variants={animationVariance}
      transition={animationTransition}
    >
      {children}
    </ContentStyles>
  );
}
export function Sidebar({ children }) {
  return <SidebarStyles>{children}</SidebarStyles>;
}
