import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MapContainer = styled(motion.div)`
  width: 100%;
  height: ${(props) =>
    props.isSmall ? 'calc(100vh - 22.9rem)' : 'calc(100vh - 11rem)'};
  padding: 1.5rem;
  position: relative;

  .map {
    width: 100%;
    height: 100%;
    background: var(--gray);
  }

  & > button {
    border: none;
    outline: none;
    background: var(--bg);
    height: 4rem;
    border-radius: 2rem;
    color: var(--blue);
    font-weight: 600;
    font-size: 1.4rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding: 0 1.7rem;
    cursor: pointer;
    position: absolute;
    bottom: 2.4rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0.4rem 3.2rem rgba(0, 0, 0, 0.4);
  }
`;
