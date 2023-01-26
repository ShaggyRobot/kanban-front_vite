import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForever from '@mui/icons-material/DeleteForever';

import { Fab, Paper } from '@mui/material';

import { CreateTask, Confirm, ModalComponent } from '@Components';
import { Task } from '../Task/Task';

import { useDeleteColumnMutation, useUpdateColumnMutation, IColumn } from '@Rtk';

import { animateStyles } from '../../utils/animateStyles';

import styles from './column.module.scss';

function Column(props: { boardId: string; column: IColumn; index: number }): JSX.Element {
  const { boardId, column, index } = props;

  const { t } = useTranslation();

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [title, setTitle] = useState(column.title);

  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const handleDelete = () => {
    deleteColumn({ boardId, columnId: column.id });
    setConfirm(false);
  };

  const editCard = (value?: string) => {
    const input = value || String(index + 1);
    input !== title &&
      updateColumn({
        boardId,
        columnId: column.id,
        body: {
          title: input,
          order: index + 1,
        },
      });
    setTitle(input);
    setEditActive(false);
  };

  return (
    <Draggable draggableId={column.id} key={column.id} index={index} isDragDisabled={editActive}>
      {(provided, snap) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.column__drag_wrap}
          style={{
            ...animateStyles(snap, provided.draggableProps.style),
          }}
        >
          <Paper
            className={styles.column}
            elevation={3}
            sx={{ backgroundColor: 'aliceblue' }}
            {...provided.dragHandleProps}
          >
            <div className={styles.column__header}>
              {editActive ? (
                <div className={styles.column__edit_wrapper}>
                  <textarea
                    className={styles.column__edit_input}
                    rows={1}
                    defaultValue={title}
                    ref={editInputRef}
                    onKeyDown={(e) => e.key === 'Enter' && editCard(editInputRef.current?.value)}
                    autoFocus
                    maxLength={54}
                  />

                  <div className={styles.column__edit_controls}>
                    <DoneIcon
                      color="success"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        editCard(editInputRef.current?.value);
                      }}
                    />
                    <ClearIcon
                      color="error"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setEditActive(false)}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={styles.column__title}
                  onClick={() => {
                    setEditActive(true);
                  }}
                >
                  {title}
                </div>
              )}
            </div>

            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.column__tasklist}
                >
                  {[...column.tasks]
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Task
                        key={task.id}
                        boardId={boardId}
                        columnId={column.id}
                        index={index}
                        task={task}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className={styles.create}>
              <Fab color="primary" size="medium" onClick={() => setOpen(true)}>
                <AddIcon />
              </Fab>
            </div>

            <div className={styles.column__delete}>
              <DeleteForever color="error" onClick={() => setConfirm(true)} />
            </div>

            <ModalComponent open={open} setOpen={setOpen}>
              <CreateTask
                boardId={boardId}
                columnId={column.id}
                modalClose={() => setOpen(false)}
              />
            </ModalComponent>

            <ModalComponent open={confirm} setOpen={setConfirm}>
              <Confirm
                message={`${t('messages.deleteColumn')}?`}
                action={handleDelete}
                cancelAction={() => setConfirm(false)}
              />
            </ModalComponent>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

export { Column };
