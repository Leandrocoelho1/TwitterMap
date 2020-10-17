import React, { useRef } from 'react';
import { RiTwitterLine, RiMapPinLine, RiFocus2Line } from 'react-icons/ri';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { StatusDisplayStyles, TweetStyles, ListStyles } from './styles';
import Loader from '../../../components/Loader';
import Face from '../../../components/Face';

function StatusDisplay({ status }) {
  if (status === 'disconnected') {
    return (
      <StatusDisplayStyles status={status}>
        <RiFocus2Line size={24} />
        <p>Streaming is off.</p>
      </StatusDisplayStyles>
    );
  }

  if (status === 'connecting') {
    return (
      <StatusDisplayStyles status={status}>
        <Loader color="var(--white)" size="2.2rem" />
        <p>Connecting to Twitter...</p>
      </StatusDisplayStyles>
    );
  }

  return (
    <StatusDisplayStyles status={status}>
      <RiFocus2Line size={24} />
      <p>Streaming is on. Waiting for new Tweets.</p>
    </StatusDisplayStyles>
  );
}

function Tweet({ tweet, dispatch }) {
  function displayMap() {
    dispatch({ type: 'display-map', selectedTweet: tweet });
  }

  return (
    <TweetStyles>
      <div className="header">
        <Face type={tweet.sentiment} />
        <div className="user-info">
          <h3>{tweet.user}</h3>
          <p>{tweet.createdAt}</p>
        </div>
      </div>

      <div className="body">
        <p>{tweet.text}</p>
        <div className="nav">
          <a
            href={`https://twitter.com/${tweet.username}/status/${tweet.id}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <RiTwitterLine size={26} /> View Tweet
          </a>
          {tweet.place.length ? (
            <button type="button" onClick={displayMap}>
              <RiMapPinLine size={24} />
              View on Map
            </button>
          ) : null}
        </div>
      </div>
    </TweetStyles>
  );
}

const animationVariance = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const animationTransition = {
  duration: 0.4,
};

export default function TweetList({ tweets, status, dispatch, isSmall }) {
  const listRef = useRef();

  return (
    <ListStyles
      ref={listRef}
      isSmall={Number(!!isSmall)}
      initial="out"
      animate="in"
      exit="out"
      variants={animationVariance}
      transition={animationTransition}
    >
      <PerfectScrollbar>
        {tweets.length
          ? tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} dispatch={dispatch} />
            ))
          : null}
        <div style={{ padding: '2.4rem 4.2rem' }}>
          <StatusDisplay status={status} />
        </div>
      </PerfectScrollbar>
    </ListStyles>
  );
}
