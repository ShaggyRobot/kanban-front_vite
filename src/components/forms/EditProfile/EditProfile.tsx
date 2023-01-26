import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, TextField, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  IServerError,
  ISignUpBody,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} from '@Rtk';
import { useTranslation } from 'react-i18next';

import styles from '../form.module.scss';
import { toast } from 'react-toastify';
import { ModalComponent } from '../../ModalComponent/ModalComponent';
import { Confirm } from '../../Confirm/Confirm';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function EditProfile(): JSX.Element {
  const userId = localStorage.getItem('userId') || '';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useEditUserMutation();
  const { data: userData } = useGetUserQuery({ id: userId });
  const [confirm, setConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    if (!userId) navigate('/home');

    const body: ISignUpBody = {
      login: values.login,
      name: values.name,
      password: values.password,
    };
    const updateUserToast = toast.loading('Updating...');

    try {
      const updateResponse = await updateUser({ id: userId!, body }).unwrap();
      const { login } = updateResponse;
      localStorage.setItem('login', login);

      toast.update(updateUserToast, {
        render: `${t('messages.success')} (*^o^)人 (^o^*)`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      const error = err as IServerError;
      const { statusCode, message } = error.data;

      toast.update(updateUserToast, {
        render: (
          <div>
            {`${message}`}
            <br />
            {t('messages.loginTaken')}
            <br />
            ¯\_(ツ)_/¯
          </div>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
      if (statusCode === 401) navigate('/home');
    }
    reset();
  };

  const handleLogOut = () => {
    const entries = ['token', 'login', 'userId'];
    entries.forEach((entry) => localStorage.removeItem(entry));
    navigate('/');
  };

  const handleDelete = () => {
    userId && deleteUser(userId);
    setConfirm(false);
    handleLogOut();
  };

  const handleConfirmNegative = () => {
    setConfirm(false);
  };

  return (
    <>
      {userData ? (
        <Paper className={styles.form__container} elevation={3}>
          <h3>{t('form.editProfile')}</h3>

          <div className={styles.form__icon_back} onClick={() => navigate(-1)}>
            <ArrowBackIcon color="primary" />
          </div>

          <form
            className={styles.form}
            id="form"
            onSubmit={handleSubmit(submitHandler)}
            autoComplete="off"
          >
            <Paper elevation={3}>
              <TextField
                error={!!errors.name}
                size="small"
                label={t('form.name')!}
                {...register('name', { required: 'true' })}
                autoComplete="off"
                defaultValue={userData?.name}
              />
            </Paper>

            <Paper elevation={3}>
              <TextField
                error={!!errors.login}
                size="small"
                label={t('form.login')!}
                {...register('login', { required: 'true' })}
                defaultValue={userData?.login}
              />
            </Paper>

            <Paper elevation={3}>
              <TextField
                error={!!errors.password}
                size="small"
                type="password"
                label={t('form.password')!}
                {...register('password', { required: 'true' })}
              />
            </Paper>

            <Button
              variant="contained"
              size="small"
              type="submit"
              disabled={!!Object.keys(errors).length}
            >
              {t('form.submit')}
            </Button>
            <Divider />
            <Button variant="contained" color="error" size="small" onClick={() => setConfirm(true)}>
              {t('form.delProfile')}
            </Button>
          </form>

          <ModalComponent open={confirm} setOpen={setConfirm}>
            <Confirm
              message={`${t('messages.deleteUser')}?`}
              action={handleDelete}
              cancelAction={handleConfirmNegative}
            />
          </ModalComponent>
        </Paper>
      ) : (
        <h1 className="float">Loading user info...</h1>
      )}
    </>
  );
}
export { EditProfile };
