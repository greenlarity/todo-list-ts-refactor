import { removeTodoItem, toggleSelectedItem } from '../../features/todo/todoSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { TodoItem } from "../../types";
import styles from './item.module.scss';
import CheckButton from '../CheckButton';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { Reorder, easeOut, motion } from 'framer-motion';


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

    const paddingLeft = `${1 * depth}rem`;

    return (
        <>
            {items.map(item => (
                <motion.div
                    key={item.id}
                    variants={variants}
                    animate='animate'
                    initial='initial'
                    exit='exit'
                    className={styles['item-containter']}
                >
                    <Reorder.Item
                        key={item.id}
                        value={item}
                        drag={item.status === 'opened'}

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
                    </Reorder.Item>

                    {expanded && item.children && item.children.length > 0 && (
                        <div className={styles['item-children']}>
                            <TodoElem
                                todoItems={item.children}
                                depth={depth + 1}
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </>
    )
};

export default TodoElem;
