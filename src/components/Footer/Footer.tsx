import React from 'react';
import { LangControl } from '@Components';

import logo from '@Assets/rsslogo.png';

import styles from './footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__rsslogo}>
        <span className={styles.footer__rsslogo_year}>2022</span>
        <img className={styles.footer__rsslogo} src={logo} alt="rsschool logo" />
      </div>
      <LangControl />
    </div>
  );
}

export { Footer };
