import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Paper, TextField } from '@mui/material';

import { useCreateBoardMutation } from '@Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

function CreateBoard(props: { modalClose: () => void }): JSX.Element {
  const { modalClose } = props;

  const { t } = useTranslation();

  const [createBoard] = useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const boardCreate = async (values: IFormValues) => {
    const formVals = values;

    const dto = { ...formVals, sharedWith: '[]' };

    await createBoard(dto).unwrap();
    modalClose();
    reset();
  };

  return (
    <Paper elevation={2} className={styles.form__container}>
      <h3>{t('boards.createBoard')}</h3>
      <form
        id="boardCreate"
        className={styles.form}
        onSubmit={handleSubmit(boardCreate)}
        autoComplete="off"
      >
        <TextField
          rows={1}
          size="small"
          label={t('boards.title')}
          error={!!errors.title}
          autoComplete="off"
          {...register('title', { required: 'true' })}
        />

        <TextField
          multiline
          rows={6}
          className={styles.form__txt_area}
          label={`${t('boards.description')}`}
          {...register('description', { required: 'true' })}
        />

        <Button variant="outlined" size="small" type="submit">
          {t('boards.create')}
        </Button>
      </form>
    </Paper>
  );
}

export { CreateBoard };
