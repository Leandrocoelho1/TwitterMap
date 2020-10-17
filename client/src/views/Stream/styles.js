import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 0.1rem solid var(--border-color);
  border-top: none;
  border-bottom: none;
  position: relative;

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

export const IntroMessage = styled.div`
  width: 100%;
  height: ${(props) =>
    props.isSmall ? 'calc(100vh - 22.9rem)' : 'calc(100vh - 11rem)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;

  button {
    height: 4rem;
    padding: 0 2.6rem;
    border: none;
    outline: none;
    background: var(--blue);
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:disabled {
      cursor: wait;
    }

    & > .loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: var(--blue);
      display: ${(props) => (props.loading ? 'flex' : 'none')};
      align-items: center;
      justify-content: center;
    }
  }
`;
