import React, { useState } from 'react';

export default function useMedia(query, initialState = false) {
  const [state, setState] = useState(initialState);
  React.useDebugValue(`\`${query}\` => ${state}`);

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
}
