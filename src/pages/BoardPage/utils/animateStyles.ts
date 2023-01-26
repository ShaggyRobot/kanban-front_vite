import { DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

const animateStyles = (
  snap: DraggableStateSnapshot,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => {
  const { isDragging, isDropAnimating } = snap;
  if (isDropAnimating) {
    return {
      ...draggableStyle,
      transition: `all .2s ease`,
    };
  }

  return {
    borderRadius: '4px',
    ...draggableStyle,
    ...(isDragging && {
      boxShadow: '0px 0px 12px 0px #3c3b048c',
      transition: `${draggableStyle?.transition}, box-shadow .2s ease`,
    }),
  };
};

export { animateStyles };
