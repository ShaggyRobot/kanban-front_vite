import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Divider, Paper } from '@mui/material';

import { animateStyles } from '../../utils/animateStyles';
import { TaskHeader } from './parts/TaskHeader/TaskHeader';
import { TaskControls } from './parts/TaskControls/TaskControls';

import { ITask } from '@Rtk';

import styles from './task.module.scss';

function Task(props: {
  task: ITask;
  boardId: string;
  columnId: string;
  index: number;
  dragDisabled: boolean;
}): JSX.Element {
  const { task, boardId, columnId, index, dragDisabled } = props;

  return (
    <Draggable draggableId={task.id} key={task.id} index={index} isDragDisabled={dragDisabled}>
      {(provided, snap) => {
        return (
          <div
            className={styles.task__wrapper}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={animateStyles(snap, provided.draggableProps.style)}
          >
            <Paper className={styles.task} {...provided.dragHandleProps}>
              <TaskHeader text={task.title} />

              <Divider></Divider>

              <div className={styles.task__description}>{task.description}</div>
            </Paper>

            <TaskControls task={task} columnId={columnId} boardId={boardId} />
          </div>
        );
      }}
    </Draggable>
  );
}
export { Task };
