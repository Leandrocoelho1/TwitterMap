import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

import { deleteRule } from '../../../api';
import { ListStyles } from './styles';
import Loader from '../../../components/Loader';

export default function RulesList({ rules, dispatch, status, deleteError }) {
  function handleDelete(id) {
    dispatch({ type: 'delete_start' });
    deleteRule(id).then(
      (response) => {
        dispatch({ type: 'delete_resolved', id: response.data.id });
      },
      (error) => {
        dispatch({ type: 'delete_rejected', error: error.message });
      },
    );
  }

  return (
    <ListStyles loading={Number(status === 'posting' || status === 'deleting')}>
      <div className="list-header">
        <h3>Your rules</h3>
        {deleteError && (
          <p>
            Error deleting rule: <span>&ldquo;{deleteError}&rdquo;</span>
          </p>
        )}
      </div>
      <ul>
        {!rules.length && (
          <p style={{ padding: '4rem' }}>
            You don&apos;t have any rules. Create your first one above.
          </p>
        )}
        {rules.map((rule) => (
          <li key={rule.id}>
            <p>{rule.value}</p>
            <button
              type="button"
              disabled={status === 'posting' || status === 'deleting'}
              onClick={() => handleDelete(rule.id)}
            >
              <div className="loader">
                <Loader size="2.8rem" color="#E63068" />
              </div>
              <RiDeleteBinLine size={22} /> Delete
            </button>
          </li>
        ))}
      </ul>
    </ListStyles>
  );
}
