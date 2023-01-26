import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as KanbanLogo } from './kanban_1.svg';

import styles from './logo.module.scss';

function Logo(): JSX.Element {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={`${animate && styles.animate} ${styles.logo}`}
      onMouseEnter={() => setAnimate(true)}
      onAnimationEnd={() => setAnimate(false)}
      title={t('header.toMain') ?? 'Go to main'}
      onClick={() => navigate('/home')}
    >
      <KanbanLogo />
    </div>
  );
}
export { Logo };
