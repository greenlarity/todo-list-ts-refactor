import { removeTodoItem, toggleSelectedItem } from '../../features/todo/todoSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { TodoItem } from "../../types";
import styles from './item.module.scss';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { easeOut, motion } from 'framer-motion';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CheckButton from '../CheckButton/CheckButton';


const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { easeOut }
  }
}

const TodoElem: React.FC<{ todoItems: TodoItem[], depth?: number }> = ({ todoItems: items, depth = 0 }) => {

  const paddingLeft = `${1 * depth}rem`;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleDelete = (id: string): void => {
    dispatch(removeTodoItem(id));
  }

  const handleCheckboxChange = (id: string): void => {
    dispatch(toggleSelectedItem(id));

    setSelectedIds(selectedIds => {
      if (selectedIds.includes(id)) {
        return selectedIds.filter(itemId => itemId !== id);
      } else {
        return [...selectedIds, id];
      }
    });
  };

  const handleExpandToggle = (): void => {
    setExpanded(!expanded)
  }



  return (
    <>
      <Droppable droppableId='parentDroppableId'>
        {(parentProvided) => (
          <div ref={parentProvided.innerRef} {...parentProvided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item.id}
                    className={styles['item-containter']}
                  >
                    <motion.div
                      variants={variants}
                      animate='animate'
                      initial='initial'
                      exit='exit'
                    >
                      <div className={styles.item} style={{ paddingLeft }}>
                        {item.status === 'opened' && (
                          <CheckButton
                            onChange={() => handleCheckboxChange(item.id)}
                            className={styles.checkbox}
                          />
                        )}

                        <p className={styles.text}>
                          {item.title}
                        </p>

                        {item.children && item.children.length > 0 && (
                          <button
                            className={styles['item-btn']}
                            onClick={handleExpandToggle}>
                            {expanded ? <img src='/src/assets/icon-up-arrow.png' /> : <img src='/src/assets/icon-arrow-down.png' />}
                          </button>
                        )}

                        {item.status === 'opened' && !selectedIds.includes(item.id) &&
                          <Modal
                            className={styles['item-btn']}
                            item={item}
                          />
                        }

                        {item.status === 'opened' && !selectedIds.includes(item.id) && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            type="button"
                            className={styles['item-btn']}
                          >
                            <img src="/src/assets/bin.png" alt="Trash can" />
                          </button>
                        )}
                      </div>
                    </motion.div>

                    {expanded && item.children && item.children.length > 0 && (
                      <Droppable droppableId={`nestedDroppableId-${item.id}`}>
                        {(nestedProvided) => (
                          <div ref={nestedProvided.innerRef} {...nestedProvided.droppableProps}>
                            {item.children.map((childItem, childIndex) => (
                              <Draggable key={childItem.id} draggableId={childItem.id} index={childIndex}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles['item-children']}
                                  >
                                    <TodoElem
                                      todoItems={[childItem]}
                                      depth={depth + 2.5}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {nestedProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    )}

                  </div>
                )}
              </Draggable>
            ))}
            {parentProvided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  )
};

export default TodoElem;
