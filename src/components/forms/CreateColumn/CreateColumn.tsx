import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, TextField, Paper } from '@mui/material';

import { useCreateColumnMutation } from '@Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
}

function CreateColumn(props: { boardId: string; modalClose: () => void }): JSX.Element {
  const { boardId, modalClose } = props;
  const { t } = useTranslation();
  const [createColumn] = useCreateColumnMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    await createColumn({ boardId, title: values.title });
    modalClose();
    reset();
  };

  return (
    <Paper className={styles.form__container}>
      <h3>{t('columns.createColumn')}</h3>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <TextField
          size="small"
          type="text"
          label={t('boards.title')}
          {...register('title', { required: 'true' })}
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={!!Object.keys(errors).length}
        >
          {t('form.submit')}
        </Button>
      </form>
    </Paper>
  );
}
export { CreateColumn };
