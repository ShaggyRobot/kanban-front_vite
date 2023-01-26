import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import { Button, Divider, Link, Paper, TextField } from '@mui/material';

import { boardsApi, IServerError, useSignInMutation } from '@Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignIn() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [handleSignIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    const signinToast = toast.loading(`${t('messages.loggingIn')}...`);
    try {
      const signInBody = { login: values.login, password: values.password };
      const signInResponse = await handleSignIn(signInBody).unwrap();
      const { token } = signInResponse;
      const { userId, login } = jwtDecode(signInResponse.token) as {
        userId: string;
        login: string;
      };

      Object.entries({ userId, login, token }).forEach((entry) => {
        localStorage.setItem(entry[0], entry[1]);
      });

      toast.update(signinToast, {
        render: `${t('messages.success')} (*^o^)人 (^o^*)`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
      dispatch(boardsApi.util.invalidateTags(['boards']));
      navigate('/boards');
    } catch (error) {
      const { statusCode } = (error as IServerError).data;

      toast.update(signinToast, {
        render: (
          <div>
            {`${statusCode}`}
            <br />
            {t('messages.userNotFound')}
            <br />
            ¯\_(ツ)_/¯
          </div>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
    reset();
  };

  return (
    <Paper className={styles.form__container} elevation={3}>
      <h3>{t('form.log')}</h3>

      <form className={styles.form} id="form" onSubmit={handleSubmit(submitHandler)}>
        <Paper elevation={3}>
          <TextField
            error={!!errors.login}
            size="small"
            type="text"
            label={t('form.login')!}
            {...register('login', { required: 'true' })}
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

        <div>
          <Divider>{t('form.or')}</Divider>
        </div>

        <NavLink to="/signup" style={{ margin: 'auto' }}>
          <Link component="button" underline="hover">
            {t('form.register')}
          </Link>
        </NavLink>
      </form>
    </Paper>
  );
}

export { SignIn };
