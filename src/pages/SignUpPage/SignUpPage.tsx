import React from 'react';
import { Navigate } from 'react-router-dom';

import { SignUp } from '@Components';

function SignUpPage(): JSX.Element {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page">
      <SignUp />
    </div>
  );
}
export { SignUpPage };
