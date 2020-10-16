import React from 'react';

import { ErrorStyles } from './styles';

export default function ErrorBox({ message, error }) {
  return (
    <ErrorStyles>
      <h4>Oops, something went wrong...</h4>
      <p className="message">{message}</p>
      <p>&ldquo;{error}&rdquo;</p>
    </ErrorStyles>
  );
}
