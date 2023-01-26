import * as React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ outlet }: { outlet: JSX.Element }): JSX.Element {
  const userToken = localStorage.getItem('token');

  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return outlet;
}

export { ProtectedRoute };
