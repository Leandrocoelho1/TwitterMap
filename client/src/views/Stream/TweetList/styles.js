import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const ListStyles = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    props.isSmall ? 'calc(100vh - 22.9rem)' : 'calc(100vh - 11rem)'};
  overflow-y: hidden;
`;

export const TweetStyles = styled.div`
  padding: 4rem;
  border-bottom: 0.1rem solid var(--border-color);
  background: transparent;
  transition: all 0.2s ease-out;

  &:hover {
    background: var(--bg-medium);
  }

  &:last-child {
    border-bottom: none;
  }

  & > .header {
    display: flex;
    align-items: center;

    svg {
      width: 5rem;
      height: 5rem;
    }

    .user-info {
      margin-left: 2.2rem;
      display: flex;
      flex-direction: column;

      h3 {
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 1.3;
        margin: 0;
      }

      p {
        font-size: 1.3rem;
        font-weight: 400;
        color: var(--gray);
        margin: 0;
      }
    }
  }

  & > .body {
    margin-top: 1.5rem;
    margin-left: 7.2rem;

    p {
      font-weight: 300;
      line-height: 1.4;
      margin: 0;
      margin-bottom: 1.5rem;
    }

    .nav {
      display: flex;
      align-items: center;
    }

    button {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 4rem;
    }

    a,
    button {
      svg {
        margin-right: 0.6rem;
      }

      color: var(--blue);
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 600;
      letter-spacing: 0.02rem;
      text-transform: uppercase;
    }
  }
`;

export const StatusDisplayStyles = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${(props) =>
      props.status === 'connected' || props.status === 'disconnecting'
        ? 'var(--blue)'
        : 'var(--gray)'};
    ${(props) =>
      (props.status === 'connected' || props.status === 'disconnecting') &&
      css`
        animation: pulse 1.5s linear;
        animation-iteration-count: infinite;

        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}
  }

  p {
    font-weight: 300;
    font-size: 1.4rem;
    opacity: 0.8;
    margin: 0;
    margin-left: 0.8rem;
  }
`;
