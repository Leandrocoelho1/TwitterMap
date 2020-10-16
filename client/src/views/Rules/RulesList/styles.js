import styled from 'styled-components';

export const ListStyles = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  .list-header {
    display: flex;
    align-items: center;
    padding: 0 4rem;
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

  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 0 2rem 0 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 7rem;
      transition: all 0.15s ease-in-out;

      &:hover {
        background: var(--bg-medium);
      }

      button {
        height: 4rem;
        width: 13.6rem;
        border: none;
        outline: none;
        background: none;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--red);
        font-weight: 700;
        font-size: 1.4rem;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        position: relative;
        overflow: hidden;

        svg {
          margin-right: 1rem;
        }

        &:hover {
          background: rgba(224, 36, 96, 0.19);
        }

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
          background: #3b2035;
          display: ${(props) => (props.loading ? 'flex' : 'none')};
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
