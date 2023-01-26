import React from 'react';
import { Navigate } from 'react-router-dom';

import { SignIn } from '@Components';

function SignInPage(): JSX.Element {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page">
      <SignIn />
    </div>
  );
}
export { SignInPage };
