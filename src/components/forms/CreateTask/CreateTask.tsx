import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Paper, TextField } from '@mui/material';

import { useCreateTaskMutation } from '@Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

function CreateTask(props: {
  boardId: string;
  columnId: string;
  modalClose: () => void;
}): JSX.Element {
  const userId = localStorage.getItem('userId');
  const { t } = useTranslation();
  const { boardId, columnId, modalClose } = props;
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    if (userId) {
      await createTask({ boardId, columnId, body: { ...values, userId } });
      modalClose();
      reset();
    }
  };

  return (
    <Paper className={styles.form__container}>
      <h3>{t('tasks.createTask')}</h3>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        <TextField
          size="small"
          type="text"
          label="Title"
          error={!!errors.title}
          {...register('title', { required: 'true' })}
        />

        <TextField
          size="small"
          type="text"
          label="Description"
          error={!!errors.description}
          {...register('description', { required: 'true' })}
        />

        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={!!Object.keys(errors).length}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}
export { CreateTask };
