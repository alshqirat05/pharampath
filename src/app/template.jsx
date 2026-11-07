import { ViewTransition } from 'react';

export default function RootTemplate({ children }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

