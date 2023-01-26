import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import styles from './confirm.module.scss';

function Confirm(props: {
  message: string;
  action: () => void;
  cancelAction?: () => void;
}): JSX.Element {
  const { message, action, cancelAction } = props;
  const { t } = useTranslation();

  return (
    <Paper elevation={3} className={styles.confirm}>
      <h3>{message}</h3>
      <Button variant="contained" color="error" onClick={action} fullWidth>
        {t('yes')}
      </Button>
      <Button
        variant="contained"
        color="success"
        className="close"
        fullWidth
        onClick={cancelAction ? cancelAction : undefined}
      >
        {t('no')}
      </Button>
    </Paper>
  );
}
export { Confirm };
