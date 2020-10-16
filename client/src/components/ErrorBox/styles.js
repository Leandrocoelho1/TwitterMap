import styled from 'styled-components';

export const ErrorStyles = styled.div`
  width: 100%;
  padding: 2rem;
  background: rgba(224, 36, 96, 0.19);
  border: 0.2rem solid var(--red);
  border-radius: 1.2rem;

  h4 {
    margin: 0;
    font-weight: 700;
    font-size: 1.3rem;
    line-height: 1.2;
    text-transform: uppercase;
    color: var(--red);
  }

  p {
    margin: 0;
    line-height: 1.4;
    color: var(--error-text-color);
  }

  p.message {
    margin-bottom: 1.6rem;
    color: var(--red);
  }
`;
