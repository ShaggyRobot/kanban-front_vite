import React, { useState } from 'react';
import { t } from 'i18next';

import { IconButton, Menu } from '@mui/material';

import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';

import { ModalComponent, Confirm, UpdateTask } from '@Components';

import { ITask, useDeleteTaskMutation } from '@Rtk';

import styles from '../../task.module.scss';

function TaskControls(props: { task: ITask; columnId: string; boardId: string }): JSX.Element {
  const { boardId, columnId, task } = props;

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const menuOpen = !!anchorEl;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editTaskHandler = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const deleteTaskHandler = () => {
    deleteTask({ boardId, columnId, taskId: task.id });

    setAnchorEl(null);
    setConfirm(false);
  };

  const handleConfirmNegative = () => {
    setAnchorEl(null);
    setConfirm(false);
  };

  return (
    <div className={styles.task__controls}>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        {isDeleting || isUpdating ? <CircularProgress size={24} /> : <MoreVertIcon />}
      </IconButton>

      <Menu
        className={styles.task__controls__menu}
        id="title-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        PaperProps={{ style: { borderRadius: '1.5rem', display: 'flex' } }}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
      >
        <div className={styles.task__edit}>
          <IconButton size="small" onClick={() => editTaskHandler()}>
            <EditIcon color="success" />
          </IconButton>
        </div>

        <div className={styles.task__delete}>
          <IconButton size="small" onClick={() => setConfirm(true)}>
            <DeleteForever color="error" />
          </IconButton>
        </div>
      </Menu>

      <ModalComponent open={confirm} setOpen={setConfirm}>
        <Confirm
          message={`${t('tasks.delete')}?`}
          action={deleteTaskHandler}
          cancelAction={handleConfirmNegative}
        />
      </ModalComponent>

      <ModalComponent open={open} setOpen={setOpen}>
        <UpdateTask
          boardId={boardId}
          columnId={columnId}
          task={task}
          setIsUpdating={setIsUpdating}
          modalClose={() => setOpen(false)}
        />
      </ModalComponent>
    </div>
  );
}
export { TaskControls };
