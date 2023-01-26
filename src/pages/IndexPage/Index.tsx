import React from 'react';
import { Navigate } from 'react-router-dom';

function Index(): JSX.Element {
  if (localStorage.getItem('token')) {
    return <Navigate to="/boards" />;
  }

  return <Navigate to="/home" />;
}

export { Index };
