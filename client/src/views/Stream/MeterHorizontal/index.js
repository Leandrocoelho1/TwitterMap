import React from 'react';

import { MeterContainer, Meter } from './styles';
import BulbLeft from './BulbLeft';
import BulbRight from './BulbRight';

export default function MeterHorizontal({ tweets }) {
  function getSentimentAverage() {
    if (tweets.length) {
      const sentiments = tweets.map((tweet) => {
        if (tweet.sentiment === 'positive') return 1;
        if (tweet.sentiment === 'negative') return -1;
        return 0;
      });

      const average = sentiments.reduce((acc, cur, idx, { length }) => {
        return acc + cur / length;
      }, 0);

      return average * 100;
    }
    return 0;
  }

  return (
    <MeterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ suration: 0.4 }}
    >
      <div className="content">
        <Meter sentiment={getSentimentAverage()}>
          <BulbLeft />
          <div className="body">
            <div className="markers">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={`mark-${i}`} className="mark" />
              ))}
            </div>
            <div className="reflection" />
            <div className="negative-content">
              <div className="negative-bar" />
            </div>
            <div className="positive-content">
              <div className="positive-bar" />
            </div>
          </div>
          <BulbRight />
        </Meter>
      </div>
    </MeterContainer>
  );
}
