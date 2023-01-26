import React from 'react';

import { Divider, Paper } from '@mui/material';

import { BoardCardHeader } from './parts/BoardCardHeader/BoardCardHeader';

import { IBoardFaceDTO } from '@Rtk';

import styles from './board-card.module.scss';

function BoardCard(props: { board: IBoardFaceDTO }): JSX.Element {
  const { board } = props;

  return (
    <Paper className={styles.card} elevation={3}>
      <BoardCardHeader board={board} />

      <Divider style={{ margin: '.5rem 0' }} />

      <div className={styles.card__description}>{board.description}</div>
    </Paper>
  );
}
export { BoardCard };
