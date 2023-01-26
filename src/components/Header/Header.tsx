import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import styles from './header.module.scss';
import { UserControl } from './UserControl/UserControl';
import { Logo } from './Logo/Logo';
import styled from '@emotion/styled';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const AuthControlWrapper = styled.div`
    display: flex;
    gap: 1rem;
  `;

  return (
    <header className={styles.header}>
      <Logo />
      {localStorage.getItem('token') && (
        <Button
          variant="outlined"
          color="success"
          size="small"
          sx={{ width: '10rem' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/boards');
          }}
        >
          {t('boards.boards')}
        </Button>
      )}
      {!isLoggedIn && (
        <AuthControlWrapper>
          <Button variant="contained" size="small" onClick={() => navigate('/signup')}>
            {t('header.buttons.signup')}
          </Button>

          <Button variant="contained" size="small" onClick={() => navigate('/signin')}>
            {t('header.buttons.signin')}
          </Button>
        </AuthControlWrapper>
      )}
      {isLoggedIn && <UserControl />}
    </header>
  );
}

export { Header };
