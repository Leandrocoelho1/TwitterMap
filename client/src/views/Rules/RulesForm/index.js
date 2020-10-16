import React, { useState } from 'react';

import { FormStyles } from './styles';
import { createRule } from '../../../api';
import Loader from '../../../components/Loader';

export default function RulesForm({ dispatch, status, postError }) {
  const [ruleValue, setRuleValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (ruleValue) {
      dispatch({ type: 'post_start' });
      createRule(ruleValue).then(
        (response) => {
          dispatch({ type: 'post_resolved', rule: response.data });
          setRuleValue('');
        },
        (error) => {
          dispatch({ type: 'post_rejected', error: error.message });
        },
      );
    }
  }

  return (
    <FormStyles
      onSubmit={handleSubmit}
      loading={Number(status === 'posting' || status === 'deleting')}
    >
      <div className="form-header">
        <h3>Create Rule</h3>
        {postError && (
          <p>
            Error creating rule: <span>&ldquo;{postError}&rdquo;</span>
          </p>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          value={ruleValue}
          onChange={(e) => setRuleValue(e.target.value)}
          required
          placeholder="Rule value"
        />
        <button
          type="submit"
          disabled={status === 'posting' || status === 'deleting'}
        >
          <div className="loader">
            <Loader size="2.8rem" />
          </div>
          Create
        </button>
      </div>
      <div className="info">
        <p>You can add a keyword, a @username or a #hashtag.</p>{' '}
      </div>
    </FormStyles>
  );
}
