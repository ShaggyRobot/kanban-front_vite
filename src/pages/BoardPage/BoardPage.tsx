import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { Button, Drawer, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { CreateColumn, ModalComponent } from '@Components';

import { Column } from './parts/Column/Column';
import { Shared } from './parts/Shared/Shared';

import {
  useGetBoardQuery,
  useUpdateColumnMutation,
  useUpdateTaskMutation,
  IColumn,
  IServerError,
  ITaskUpdate,
} from '@Rtk';

import styles from './board.module.scss';

function BoardPage(): JSX.Element {
  const { id: boardId } = useParams();
  const userId = localStorage.getItem('userId');

  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetBoardQuery(boardId!);
  const [columns, setColumns] = useState<Array<IColumn>>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [updateColumn] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

  const drawerContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    data && setColumns(data.columns);
  }, [data]);

  const onDragEnd = async (res: DropResult) => {
    if (!res.destination) return;

    if (
      res.destination.droppableId === res.source.droppableId &&
      res.destination.index === res.source.index
    )
      return;

    if (res.type === 'task') {
      const startColumn = columns.find((column) => column.id === res.source.droppableId);
      const endColumn = columns.find((column) => column.id === res.destination!.droppableId);
      const draggedTask = startColumn?.tasks.find((task) => task.id === res.draggableId);

      if (startColumn?.id === endColumn?.id) {
        // * Same column ---------------------------------------------------------
        const newTasks = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order);
        const [dt] = newTasks.splice(res.source.index, 1);
        newTasks.splice(res.destination.index, 0, dt);

        const newColumn = {
          ...startColumn,
          tasks: newTasks.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newColumns = Array.from(columns);
        newColumns.splice(
          columns.findIndex((column) => column.id === startColumn!.id),
          1,
          newColumn as IColumn
        );

        setColumns(newColumns);
      } else {
        // * Different columns -------------------------------------------------
        const newTasksStart = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order);
        const newTasksEnd = Array.from(endColumn!.tasks).sort((a, b) => a.order - b.order);

        const [dragged] = newTasksStart.splice(res.source.index, 1);
        newTasksEnd.splice(res.destination.index, 0, dragged);

        const newStartColumn = {
          ...startColumn,
          tasks: newTasksStart.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newEndColumn = {
          ...endColumn,
          tasks: newTasksEnd.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newColumns = Array.from(columns);
        newColumns.splice(
          columns.findIndex((column) => column.id === startColumn!.id),
          1,
          newStartColumn as IColumn
        );

        newColumns.splice(
          columns.findIndex((column) => column.id === endColumn!.id),
          1,
          newEndColumn as IColumn
        );

        setColumns(newColumns);
      }

      const taskId = res.draggableId;
      const body: ITaskUpdate = {
        title: draggedTask!.title,
        order: res.destination.index + 1,
        description: draggedTask!.description,
        columnId: res.destination.droppableId,
        boardId: boardId!,
        userId: userId!,
      };

      try {
        await updateTask({
          boardId: boardId!,
          columnId: startColumn!.id,
          taskId: taskId,
          body,
        }).unwrap();
      } catch (error) {
        const { statusCode, message } = (error as IServerError).data;

        toast(
          <div>
            {`${statusCode} ${message}`}
            <br />
            ¯\_(ツ)_/¯
          </div>,
          { autoClose: 2000 }
        );
      }
    }

    if (res.type === 'column') {
      // * Dragging columns ----------------------------------------------------
      const newColumns = Array.from(columns).sort((a, b) => a.order - b.order);

      const [draggedColumn] = newColumns.splice(res.source.index, 1);
      newColumns.splice(res.destination.index, 0, draggedColumn);

      setColumns([...newColumns].map((column, idx) => ({ ...column, order: idx + 1 })));

      updateColumn({
        boardId: boardId!,
        columnId: draggedColumn.id,
        body: { title: draggedColumn.title, order: res.destination.index + 1 },
      });
    }
  };

  const handleShared = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={`${styles.board}`} ref={drawerContainer} style={{ position: 'relative' }}>
      {isLoading ? (
        <h1 className="float" style={{ margin: 'auto' }}>
          Loading...
        </h1>
      ) : (
        <>
          <div className={styles.board__title}>
            <div className={styles.board__title_text}>{data?.title}</div>

            <Button
              variant="outlined"
              size="small"
              className={styles.board__title_icon}
              onClick={handleShared}
            >
              <CoPresentIcon />
            </Button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div
                  className={styles.board__columns_list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns &&
                    [...columns]
                      .sort((a, b) => a.order - b.order)
                      .map((column, idx) => (
                        <Column key={column.id} column={column} index={idx} boardId={boardId!} />
                      ))}

                  {provided.placeholder}

                  <div className={styles.create}>
                    <Fab onClick={() => setOpen(true)}>
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <ModalComponent open={open} setOpen={setOpen}>
            <CreateColumn boardId={boardId!} modalClose={() => setOpen(false)} />
          </ModalComponent>

          <Drawer
            anchor="right"
            variant="persistent"
            open={drawerOpen}
            BackdropProps={{
              style: {
                backdropFilter: 'blur(3px)',
              },
            }}
            PaperProps={{
              style: {
                position: 'absolute',
                top: 'auto',
                bottom: '0',
                margin: '1rem 0',
                height: 'calc(100% - 4rem)',
                padding: '1rem',
                borderRadius: '4px 0 0 4px',
                boxShadow:
                  '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
              },
            }}
            ModalProps={{
              container: drawerContainer.current,
              style: {
                position: 'absolute',
              },
            }}
          >
            <Shared board={data} />
          </Drawer>
        </>
      )}
    </div>
  );
}
export { BoardPage };
