import styled from 'styled-components';

export const MeterContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh);
  position: sticky;
  top: 0;
  padding: 4rem;

  .content {
    background: var(--bg-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;

    h2 {
      font-weight: 700;
      font-size: 2.2rem;
      margin: 0;
      margin-bottom: 4rem;
      text-align: center;
    }
  }
`;

export const Meter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  svg {
    width: 8.6rem;
    height: 9.2rem;
  }

  .body {
    flex: 1;
    width: 5.8rem;
    border-left: 0.4rem solid #fff;
    border-right: 0.4rem solid #fff;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;
    position: relative;

    .markers {
      width: 2.5rem;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 1;

      .mark {
        width: 65%;
        height: 0.4rem;
        background: var(--white);

        &:nth-child(1),
        &:nth-child(5),
        &:nth-child(9) {
          width: 100%;
        }
      }
    }

    .reflection {
      width: 0.8rem;
      height: 88%;
      position: absolute;
      top: -0.6rem;
      right: 0.6rem;
      display: flex;
      flex-direction: column;
      z-index: 1;

      &::before {
        content: '';
        width: 100%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0.4rem;
        height: 90%;
        margin-bottom: 1.2rem;
      }

      &::after {
        content: '';
        width: 100%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0.4rem;
        flex: 1;
      }
    }

    .positive-content,
    .negative-content {
      width: 100%;
      flex: 1;
      position: relative;

      .positive-bar {
        width: 100%;
        height: ${(props) => (props.tone > 0 ? `${props.tone}%` : 0)};
        border-radius: 0.8rem;
        position: absolute;
        background-image: linear-gradient(#17bf63, #18a570);
        bottom: 0;
      }

      .negative-bar {
        width: 100%;
        height: ${(props) => (props.tone < 0 ? `${Math.abs(props.tone)}%` : 0)};
        border-radius: 0.8rem;
        position: absolute;
        background-image: linear-gradient(#ff44a8, #e63068);
        top: 0;
        transform: rotate(180deg);
      }
    }
  }
`;
