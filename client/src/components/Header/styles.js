import styled from 'styled-components';

export const StyledHeader = styled.header`
  flex: 1;
  min-width: 8rem;
  position: relative;

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 4rem;
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  @media (max-width: 1240px) {
    .content {
      padding: 4rem 2rem;
    }
  }

  .navigation {
    svg {
      fill: var(--white);
      height: 4rem;
    }

    svg.logo-expanded {
      margin-left: 0.6rem;
    }

    svg.logo-small {
      display: none;
    }
  }

  @media (max-width: 1240px) {
    .navigation {
      svg.logo-expanded {
        display: none;
      }
      svg.logo-small {
        display: block;
      }
    }
  }

  nav {
    margin-top: 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    a {
      display: flex;
      height: 4rem;
      padding: 0 2rem 0 1.4rem;
      border-radius: 2rem;
      align-items: center;
      font-weight: 700;
      font-size: 1.8rem;
      transition: all 250ms ease-in-out;

      svg {
        transition: all 0.2s ease-in-out;
      }

      span {
        margin-left: 1rem;
      }

      &.active {
        color: var(--blue);

        svg {
          fill: var(--blue);
        }
      }

      &:hover {
        background: rgba(29, 121, 242, 0.19);
        color: var(--blue);

        svg {
          fill: var(--blue);
        }
      }
    }
  }

  @media (max-width: 1240px) {
    nav {
      align-items: center;

      a {
        padding: 0;
        width: 4rem;
        justify-content: center;

        span {
          display: none;
        }
      }
    }
  }
`;
