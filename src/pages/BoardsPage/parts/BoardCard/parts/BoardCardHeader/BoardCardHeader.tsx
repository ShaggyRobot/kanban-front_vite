import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';

import { ModalComponent, Confirm, EditBoard } from '@Components';

import { IBoardFaceDTO, useDeleteBoardMutation } from '@Rtk';

import styles from './board-card-header.module.scss';

function BoardCardHeader(props: { board: IBoardFaceDTO }): JSX.Element {
  const userId = localStorage.getItem('userId') || '';
  const { title, id: boardId, userId: ownerId } = props.board;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [deleteBoard] = useDeleteBoardMutation();

  const isOwner = (): boolean => userId === ownerId || !ownerId;

  const openDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirm(true);
  };

  const deleteHandler = () => {
    deleteBoard(boardId);
    setConfirm(false);
  };

  const editBoardHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div className={styles.header}>
      <div
        className={styles.header__title}
        onClick={() => {
          navigate(`/boards/${boardId}`);
        }}
      >
        {title}
      </div>

      {isOwner() && (
        <div className={styles.header__controls}>
          <div className={styles.edit}>
            <EditIcon color="success" onClick={(e) => editBoardHandler(e)} />
          </div>

          <div className={styles.delete}>
            <DeleteForever color="error" onClick={(e) => openDeleteConfirm(e)} />
          </div>
        </div>
      )}

      <ModalComponent open={open} setOpen={setOpen}>
        <EditBoard board={props.board} closeModal={() => setOpen(false)} />
      </ModalComponent>

      <ModalComponent open={confirm} setOpen={setConfirm}>
        <Confirm
          message={`${t('boards.deleteBoard')}?`}
          action={deleteHandler}
          cancelAction={() => setConfirm(false)}
        />
      </ModalComponent>
    </div>
  );
}
export { BoardCardHeader };
