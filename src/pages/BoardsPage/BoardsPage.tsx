import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { CreateBoard, ModalComponent } from '@Components';
import { BoardCard } from './parts/BoardCard/BoardCard';

import { useGetBoardsQuery } from '@Rtk';

import styles from './boards-page.module.scss';

function BoardsPage() {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetBoardsQuery();

  return (
    <div className={`${styles.boards} page`}>
      {isLoading ? (
        <h1 className="float">Loading...</h1>
      ) : (
        <div className={styles.boards__wrapper}>
          {data &&
            [...data!]
              .sort((a, b) => a.title.localeCompare(b.title, language, { numeric: true }))
              .map((board) => <BoardCard key={board.id} board={board} />)}

          <ModalComponent open={open} setOpen={setOpen}>
            <CreateBoard modalClose={() => setOpen(false)} />
          </ModalComponent>

          <div className={styles.create}>
            <Fab onClick={() => setOpen(true)}>
              <AddIcon />
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
}

export { BoardsPage };
