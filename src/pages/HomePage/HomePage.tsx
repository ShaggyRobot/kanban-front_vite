import React from 'react';
import { useTranslation } from 'react-i18next';

import { Paper } from '@mui/material';

import img1 from '../../assets/1.png';
import img3 from '../../assets/3.png';
import logo from '../../assets/rsslogo_round.svg';

import tg_icon from '../../assets/tg_icon.svg';
import gh_icon from '../../assets/gh_icon.svg';
import e_icon from '../../assets/email.svg';

import react_logo from '../../assets/react.svg';
import redux_logo from '../../assets/redux.svg';
import eslint_logo from '../../assets/eslint.svg';
import ts_logo from '../../assets/TS.svg';
import sass_logo from '../../assets/sass.png';
import bdnd_logo from '../../assets/bdnd.png';

import styles from './home-page.module.scss';

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className={styles.home_page}>
      <h1>KanBan</h1>
      <div className={styles.home_page__wrapper}>
        <Paper elevation={5} className={styles.section}>
          <div className={styles.text_wrapper}>
            <p>{t('aboutKanban.p1')}</p>
            <p>{t('aboutKanban.p2')}</p>
            <p>{t('aboutKanban.p3')}</p>
          </div>

          <div className={styles.img_wrapper}>
            <img src={img1} alt="" />
          </div>
        </Paper>

        <Paper elevation={5} className={styles.section}>
          <div className={styles.img_wrapper}>
            <img className={styles.logo} src={logo} alt="" />
          </div>

          <div className={styles.text_wrapper}>
            <p className={styles.rss_about}>{t('aboutRSS.p1')}</p>
            <p>{t('aboutRSS.p2')}</p>
            <p>{t('aboutRSS.p3')}</p>
            <span className={styles.subtitle}>&quot;{t('aboutRSS.p4')}&quot;</span>
            <p>{t('aboutRSS.p5')}</p>
          </div>
        </Paper>

        <Paper elevation={5} className={styles.section}>
          <div className={styles.text_wrapper}>
            <div className={styles.hi}>{t('hi')}</div>

            <div className={styles.contacts}>
              <a href="https://t.me/ChitinousCruciform">
                <div className={styles.icon}>
                  <img src={tg_icon} alt="Telegram" />
                </div>
              </a>

              <a href="https://github.com/ShaggyRobot">
                <div className={styles.icon}>
                  <img src={gh_icon} alt="Github" />
                </div>
              </a>

              <a href="mailto: shaggyrobot@gmail.com">
                <div className={styles.icon}>
                  <img src={e_icon} alt="Email" />
                </div>
              </a>
            </div>

            <div className={styles.hi}>{t('tech')}</div>

            <div className={styles.tech_list}>
              <a href="https://reactjs.org/">
                <div className={styles.technology} title="React">
                  <img src={react_logo} alt="React" />
                </div>
              </a>

              <a href="https://redux-toolkit.js.org/">
                <div className={styles.technology} title="Redux Toolkit">
                  <img src={redux_logo} alt="Redux" />
                </div>
              </a>

              <a href="https://www.typescriptlang.org/">
                <div className={styles.technology} title="TypeScript">
                  <img src={ts_logo} alt="TypeScript" />
                </div>
              </a>

              <a href="https://eslint.org/">
                <div className={styles.technology} title="ESLint">
                  <img src={eslint_logo} alt="ESLint" />
                </div>
              </a>

              <a href="https://sass-lang.com/">
                <div className={styles.technology} title="Sass">
                  <img src={sass_logo} alt="Sass" />
                </div>
              </a>

              <a href="https://github.com/atlassian/react-beautiful-dnd">
                <div className={styles.technology} title="react-beautiful-dnd">
                  <img src={bdnd_logo} alt="Beautiful drag and drop" />
                </div>
              </a>
            </div>
          </div>

          <div className={styles.img_wrapper}>
            <img src={img3} alt="" />
          </div>
        </Paper>
      </div>
    </div>
  );
}

export { HomePage };
