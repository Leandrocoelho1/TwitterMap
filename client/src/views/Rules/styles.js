import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 0.1rem solid var(--border-color);
  border-top: none;
  border-bottom: none;
  position: relative;

  & > .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 11rem);
  }

  & > .header {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    border-bottom: 0.1rem solid var(--border-color);
    height: 11rem;
    position: sticky;
    background: var(--bg);
    top: 0;

    h1 {
      font-weight: 700;
      font-size: 2.6rem;
      margin-left: 1.5rem;
    }
  }

  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
