---
title: 'Using React useReducer hook with TypeScript'
description: ''
date: 2020-08-25
tags:
  - react
  - typescript
  - hooks
  - snippets
---

Every time I [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) in TypeScript I struggle to type it correctly. First, to make it compile at all, then to avoid any unnecessary types.

Here’s [a snippet that works](https://codesandbox.io/s/serene-pine-z4f9x?file=/src/Counter.tsx) for me:

```tsx
import React from 'react';

enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}

type Action = {
  type: ActionType;
};

type State = {
  count: number;
};

const initialState = {
  count: 0
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.INCREMENT: {
      return { count: state.count + 1 };
    }
    case ActionType.DECREMENT: {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error('Unknown action');
    }
  }
}

export default function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({ type: ActionType.DECREMENT })}
      >
        -
      </button>
      <button
        onClick={() => dispatch({ type: ActionType.INCREMENT })}
      >
        +
      </button>
    </>
  );
}
```
