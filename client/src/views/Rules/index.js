import React, { useReducer, useEffect } from 'react';
import { RiSettings2Line } from 'react-icons/ri';

import useSafeDispatch from '../../hooks/useSafeDispatch';
import { fetchRules } from '../../api';
import { Content, Sidebar } from '../../components/Layout';
import { Container, LoaderWrapper } from './styles';
import RulesForm from './RulesForm';
import RulesList from './RulesList';
import Loader from '../../components/Loader';
import ErrorBox from '../../components/ErrorBox';

function rulesReducer(state, action) {
  switch (action.type) {
    case 'fetch_start': {
      return { ...state, status: 'loading' };
    }
    case 'fetch_resolved': {
      return { ...state, status: 'available', rules: action.rules };
    }
    case 'fetch_rejected': {
      return { ...state, status: 'rejected', fetchError: action.error };
    }
    case 'post_start': {
      return { ...state, status: 'posting', postError: null };
    }
    case 'post_resolved': {
      return {
        ...state,
        status: 'available',
        rules: [...state.rules, action.rule],
      };
    }
    case 'post_rejected': {
      return { ...state, status: 'available', postError: action.error };
    }
    case 'delete_start': {
      return { ...state, status: 'deleting', deleteError: null };
    }
    case 'delete_resolved': {
      const rules = state.rules.filter((rule) => rule.id !== action.id);
      return { ...state, status: 'available', rules };
    }
    case 'delete_rejected': {
      return { ...state, status: 'available', deleteError: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RulesContent() {
  const [state, unsafeDispatch] = useReducer(rulesReducer, {
    status: 'loading',
    rules: null,
    fetchError: null,
    postError: null,
    deleteError: null,
  });
  const { status, rules, fetchError, postError, deleteError } = state;

  const dispatch = useSafeDispatch(unsafeDispatch);

  useEffect(() => {
    fetchRules().then(
      (response) => {
        dispatch({ type: 'fetch_resolved', rules: response.data });
      },
      (error) => {
        dispatch({ type: 'fetch_rejected', error: error.message });
      },
    );
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  if (status === 'rejected') {
    const message =
      "Couldn't fetch your rules. The server returned the following error:";
    return (
      <div style={{ width: '100%', padding: '2rem' }}>
        <ErrorBox message={message} error={fetchError} />
      </div>
    );
  }

  return (
    <>
      <RulesForm dispatch={dispatch} status={status} postError={postError} />
      <RulesList
        rules={rules}
        status={status}
        dispatch={dispatch}
        deleteError={deleteError}
      />
    </>
  );
}

export default function Rules() {
  return (
    <>
      <Content>
        <Container>
          <div className="header">
            <RiSettings2Line size={24} /> <h1>Rules</h1>
          </div>
          <div className="wrapper">
            <RulesContent />
          </div>
        </Container>
      </Content>
      <Sidebar />
    </>
  );
}
