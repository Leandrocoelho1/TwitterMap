import React from 'react';

import Loader from '../../../components/Loader';
import { SwitchStyles } from './styles';

export default function Switch({
  status,
  connectCallback,
  disconnectCallback,
}) {
  function handleClick() {
    if (status === 'connecting' || status === 'disconnecting') {
      return;
    }

    if (status === 'connected') {
      disconnectCallback();
    } else {
      connectCallback();
    }
  }

  return (
    <SwitchStyles
      role="button"
      aria-label="Toggle stream on or off"
      status={status}
      onClick={handleClick}
    >
      {status === 'disconnecting' ? (
        <div className="on-loader">
          <Loader size="2rem" color="var(--blue)" />
        </div>
      ) : (
        <div className="on-text">On</div>
      )}
      {status === 'connecting' ? (
        <div className="off-loader">
          <Loader size="2rem" />
        </div>
      ) : (
        <div className="off-text">Off</div>
      )}
      <div className="knob">&nbsp;</div>
    </SwitchStyles>
  );
}
