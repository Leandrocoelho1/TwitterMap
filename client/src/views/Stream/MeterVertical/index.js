import React from 'react';

import BulbTop from './BulbTop';
import BulbBottom from './BulbBottom';
import { MeterContainer, Meter } from './styles';

export default function MeterVertical({ tweets }) {
  function getToneAverage() {
    if (tweets.length) {
      const tones = tweets.map((tweet) => {
        if (tweet.tone === 2) return 0;
        if (tweet.tone === 1) return -1;
        return 1;
      });

      const average = tones.reduce((acc, cur, idx, { length }) => {
        return acc + cur / length;
      }, 0);

      return average * 100;
    }
    return 0;
  }

  return (
    <MeterContainer>
      <div className="content">
        <h2>Tone Meter</h2>
        <Meter tone={getToneAverage()}>
          <BulbTop />
          <div className="body">
            <div className="markers">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={`mark-${i}`} className="mark" />
              ))}
            </div>
            <div className="reflection" />
            <div className="positive-content">
              <div className="positive-bar" />
            </div>
            <div className="negative-content">
              <div className="negative-bar" />
            </div>
          </div>
          <BulbBottom />
        </Meter>
      </div>
    </MeterContainer>
  );
}
