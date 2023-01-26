import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Paper, TextField } from '@mui/material';

import { ITask, ITaskUpdate, useUpdateTaskMutation } from '@Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

function UpdateTask(props: {
  task: ITask;
  boardId: string;
  columnId: string;
  setIsUpdating?: React.Dispatch<React.SetStateAction<boolean>>;
  modalClose: () => void;
}): JSX.Element {
  const { t } = useTranslation();
  const { task, boardId, columnId, modalClose, setIsUpdating } = props;
  const [updateTask] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    const { userId, order } = task;
    const body: ITaskUpdate = {
      title: values.title,
      order,
      description: values.description,
      userId,
      boardId,
      columnId,
    };

    modalClose();
    reset();

    if (task.title !== values.title || task.description !== values.description) {
      setIsUpdating && setIsUpdating(true);
      await updateTask({ taskId: task.id, columnId, boardId, body });
      setIsUpdating && setIsUpdating(false);
    }
  };

  return (
    <Paper className={styles.form__container}>
      <h3>{t('tasks.updateTask')}</h3>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        <TextField
          size="small"
          type="text"
          label={t('tasks.title')}
          error={!!errors.title}
          defaultValue={task.title}
          {...register('title', { required: 'true' })}
        />

        <TextField
          size="small"
          type="text"
          multiline
          rows={8}
          label={t('tasks.description')}
          defaultValue={task.description}
          error={!!errors.description}
          {...register('description', { required: 'true' })}
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
export { UpdateTask };
