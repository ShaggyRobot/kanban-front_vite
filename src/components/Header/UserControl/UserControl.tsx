import React from 'react';

import { UserDashboard } from './UserDashboard';

import styles from './user-control.module.scss';

function UserControl(): JSX.Element {
  return (
    <div className={styles.control}>
      <UserDashboard />
    </div>
  );
}
export { UserControl };
