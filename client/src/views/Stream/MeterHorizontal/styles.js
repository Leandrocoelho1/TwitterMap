import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MeterContainer = styled(motion.div)`
  width: 100%;
  padding: 1.5rem;
  border-top: 0.1rem solid var(--border-color);

  .content {
    background: var(--bg-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8.8rem;
    padding: 1.4rem 1.8rem;
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
  align-items: center;
  flex: 1;

  svg {
    width: 6.3rem;
    height: 6rem;
  }

  .body {
    flex: 1;
    height: 4.6rem;
    border-top: 0.4rem solid #fff;
    border-bottom: 0.4rem solid #fff;
    padding: 0.6rem 0;
    display: flex;
    position: relative;

    .markers {
      height: 1.8rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      z-index: 1;

      .mark {
        height: 65%;
        width: 0.4rem;
        background: var(--white);

        &:nth-child(1),
        &:nth-child(5),
        &:nth-child(9) {
          height: 100%;
        }
      }
    }

    .reflection {
      width: 70%;
      height: 0.6rem;
      position: absolute;
      top: 0.4rem;
      right: 0rem;
      display: flex;
      z-index: 1;

      &::before {
        content: '';
        hieght: 100%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0.4rem;
        margin-right: 1.2rem;
        flex: 1;
      }

      &::after {
        content: '';
        width: 90%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 0.4rem;
        height: 100%;
      }
    }

    .positive-content,
    .negative-content {
      width: 100%;
      flex: 1;
      position: relative;

      .positive-bar {
        height: 100%;
        width: ${(props) => (props.sentiment > 0 ? `${props.sentiment}%` : 0)};
        border-radius: 0.8rem;
        position: absolute;
        background-image: linear-gradient(#17bf63, #18a570);
      }

      .negative-bar {
        height: 100%;
        width: ${(props) =>
          props.sentiment < 0 ? `${Math.abs(props.sentiment)}%` : 0};
        border-radius: 0.8rem;
        position: absolute;
        background-image: linear-gradient(#ff44a8, #e63068);
        transform: rotate(180deg);
      }
    }
  }
`;
