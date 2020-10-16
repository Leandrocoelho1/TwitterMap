import styled from 'styled-components';

export const SwitchStyles = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  width: 7.6rem;
  height: 4.2rem;
  border-radius: 2.2rem;
  border: 0.1rem solid
    ${(p) =>
      p.status === 'connected' || p.status === 'disconnecting'
        ? 'var(--blue)'
        : '#192734'};
  background: #01080f;
  position: relative;
  cursor: pointer;

  .on-text,
  .off-text,
  .off-loader,
  .on-loader {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.4rem;
  }

  .on-text,
  .on-loader {
    padding-left: 0.9rem;
    color: var(--blue);
  }
  .off-text,
  .off-loader {
    padding-right: 0.9rem;
    color: var(--gray);
    justify-content: flex-end;
  }
  .knob {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background: var(--white);
    border: 0.2rem solid
      ${(p) =>
        p.status === 'connected' || p.status === 'disconnecting'
          ? 'var(--blue)'
          : 'var(--gray)'};
    position: absolute;
    box-shadow: ${(p) =>
      p.status === 'connected' || p.status === 'disconnecting'
        ? '0 0 1.8rem rgba(29, 161, 242, 0.88)'
        : '0 0 0 rgba(29, 161, 242, 0.82)'};
    top: 0.5rem;
    left: ${(p) =>
      p.status === 'connected' || p.status === 'disconnecting'
        ? '4rem'
        : '0.6rem'};
    transition: all 0.15s ease-in;
  }
`;
