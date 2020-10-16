import React from 'react';
import styled from 'styled-components';

const LoaderStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  position: relative;

  &::before,
  &::after {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 3.2rem;
    border-width: 0.3rem;
    border-style: solid;
  }

  &::before {
    border-color: ${(props) => props.color};
    opacity: 0.2;
  }

  &::after {
    border-color: ${(props) => props.color} transparent transparent;
    animation: loader 0.6s linear;
    animation-iteration-count: infinite;
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Loader({ color = '#fff', size = '3.2rem' }) {
  return <LoaderStyles color={color} size={size} />;
}
