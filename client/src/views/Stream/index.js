import React, { useCallback, useEffect, useReducer } from 'react';
import { RiFocus2Line } from 'react-icons/ri';

import { fetchConnections, fetchRules } from '../../api';
import useSafeDispatch from '../../hooks/useSafeDispatch';
import { Content, Sidebar } from '../../components/Layout';
import { Container, IntroMessage } from './styles';
import Switch from './Switch';
import TweetList from './TweetList';
import MeterVertical from './MeterVertical';
import Map from './Map';
import ErrorBox from '../../components/ErrorBox';

function streamReducer(state, action) {
  switch (action.type) {
    case 'connecting': {
      return { ...state, status: 'connecting', error: null };
    }
    case 'connected': {
      return { ...state, status: 'connected', eventSource: action.eventSource };
    }
    case 'tweet-received': {
      const newTweets = [...state.tweets, action.tweet];
      return { ...state, tweets: newTweets };
    }
    case 'disconnected': {
      return { ...state, status: 'disconnected', eventSource: null };
    }
    case 'rejected': {
      return {
        ...state,
        status: 'rejected',
        eventSource: null,
        error: action.error,
      };
    }
    case 'display-map': {
      return { ...state, showMap: true, selectedTweet: action.selectedTweet };
    }
    case 'close-map': {
      return { ...state, showMap: false, selectedTweet: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function StreamContent({
  tweets,
  status,
  connectCallback,
  error,
  dispatch,
  showMap,
  selectedTweet,
}) {
  if (status === 'idle') {
    return (
      <IntroMessage>
        <p>Start the stream to receive your filtered Tweets in real time.</p>
        <button type="button" onClick={connectCallback}>
          Start Streaming
        </button>
      </IntroMessage>
    );
  }

  if (status === 'rejected') {
    return (
      <div style={{ padding: '1.8rem', height: 'calc(100vh - 11rem)' }}>
        <ErrorBox
          message="Couldn't stream data. The server responded with the following  error:"
          error={error}
        />
      </div>
    );
  }

  // return <TweetList tweets={tweets} status={status} dispatch={dispatch} />;

  return !showMap ? (
    <TweetList tweets={tweets} status={status} dispatch={dispatch} />
  ) : (
    <Map tweets={tweets} dispatch={dispatch} selectedTweet={selectedTweet} />
  );
}

export default function Stream() {
  const [state, unsafeDispatch] = useReducer(streamReducer, {
    status: 'idle',
    tweets: [],
    selectedTweet: null,
    eventSource: null,
    error: null,
    showMap: false,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);
  const { tweets, status, eventSource, error, showMap, selectedTweet } = state;

  async function connectStream() {
    if (eventSource) {
      return;
    }
    dispatch({ type: 'connecting' });
    try {
      const connections = await fetchConnections();
      if (connections.data.hasConnection) {
        dispatch({
          type: 'rejected',
          error: 'You already have an open connetion',
        });
        return;
      }
      // const rules = await fetchRules();
      // if (!rules.data.length) {
      //   dispatch({
      //     type: 'rejected',
      //     error: 'You need at leat one rule to start streaming',
      //   });
      //   return;
      // }
    } catch (err) {
      dispatch({
        type: 'rejected',
        error: 'Network error',
      });
      return;
    }

    const source = new EventSource('http://localhost:8888/stream');
    source.onopen = () => {
      dispatch({ type: 'connected', eventSource: source });
    };
    source.onmessage = (e) => {
      console.log(JSON.parse(e.data));
      dispatch({ type: 'tweet-received', tweet: JSON.parse(e.data) });
    };
    source.onerror = () => {
      dispatch({
        type: 'rejected',
        error: 'Network error',
      });
      source.close();
    };
  }

  const disconnectStream = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      dispatch({ type: 'disconnected' });
    }
  }, [dispatch, eventSource]);

  useEffect(() => {
    return () => {
      if (status === 'connected' && eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource, status]);

  return (
    <>
      <Content>
        <Container>
          <div className="header">
            <RiFocus2Line size={24} /> <h1>Stream</h1>
            <Switch
              status={status}
              connectCallback={connectStream}
              disconnectCallback={disconnectStream}
            />
          </div>
          <StreamContent
            connectCallback={connectStream}
            tweets={tweets}
            status={status}
            error={error}
            dispatch={dispatch}
            showMap={showMap}
            selectedTweet={selectedTweet}
          />
        </Container>
      </Content>
      <Sidebar>
        <MeterVertical tweets={tweets} />
      </Sidebar>
    </>
  );
}
