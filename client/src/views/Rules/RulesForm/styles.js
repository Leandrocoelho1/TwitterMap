import styled from 'styled-components';

export const FormStyles = styled.form`
  padding: 4rem;
  width: 100%;

  .form-header {
    display: flex;
    align-items: center;
    margin-bottom: 2.4rem;

    h3 {
      font-weight: 700;
      line-height: 1.2rem;
      margin: 0;
      margin-right: 1.2rem;
      font-size: 2rem;
    }

    p {
      margin: 0;
      color: var(--red);

      span {
        color: var(--error-text-color);
      }
    }
  }

  .input-wrapper {
    display: flex;
    margin: 0 -2rem 0 -2rem;
    align-items: center;
    justify-content: space-between;

    input {
      flex: 1;
      outline: none;
      margin-right: 1rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border: none;
      background: var(--input-color);
      height: 4rem;
      border-radius: 2rem;
      color: var(--white);

      &::placeholder {
        color: var(--bg);
      }
    }

    button {
      height: 4rem;
      width: 13.6rem;
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
  }

  p {
    margin: 0.5rem 0 0 0;
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--gray);
  }
`;
