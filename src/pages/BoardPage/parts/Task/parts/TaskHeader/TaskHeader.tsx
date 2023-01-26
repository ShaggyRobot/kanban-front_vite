import React from 'react';

import styles from '../../task.module.scss';

function TaskHeader(props: { text: string }): JSX.Element {
  const { text } = props;

  return (
    <div className={styles.task__header}>
      <div className={styles.task__title}>{text}</div>
    </div>
  );
}
export { TaskHeader };
