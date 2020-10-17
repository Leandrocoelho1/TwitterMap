import React from 'react';
import styled from 'styled-components';

import Face from '../../../../components/Face';

const MarkerWrapper = styled.div`
  width: 3.6rem;
  height: 4.4rem;
  position: relative;

  svg:nth-child(2) {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }
`;

export default function CustomMarker({ sentiment }) {
  return (
    <div>
      <MarkerWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 44"
          className="marker-bg"
        >
          <path
            fill="#15202B"
            d="M18 43.7L5.3 31c-7-7-7-18.4 0-25.5s18.4-7 25.5 0c7 7 7 18.4 0 25.5L18 43.7z"
          />
        </svg>
        <Face type={sentiment} />
      </MarkerWrapper>
    </div>
  );
}
