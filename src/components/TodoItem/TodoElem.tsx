import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeTodoItem, toggleSelectedItem } from '../../features/todo/todoSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { TodoItem } from "../../types";
import styles from './item.module.scss';
import CheckButton from '../CheckButton';
import Modal from '../Modal/Modal';
import { useState } from 'react';


const TodoElem: React.FC<{ todoItems: TodoItem[], depth?: number}> = ({ todoItems: items, depth = 0}) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleDelete = (id: string): void => {
        dispatch(removeTodoItem(id))
    }

    const handleCheckboxChange = (id: string): void => {
        dispatch(toggleSelectedItem(id));
    };

    const handleExpandToggle = (): void => {
        setExpanded(!expanded)
    }

    const paddingLeft = `${1 * depth}rem`;

    return (
        <>
            {items.map(item => (
                <div key={item.id}>
                    <div className={styles.item} style={{ paddingLeft }}>
                        <CheckButton
                            onChange={() => handleCheckboxChange(item.id)}
                            className={styles.checkbox}
                        />
                        <p className={styles.text}>
                            {item.title}
                        </p>
                        <p>{item.id}</p>

                        <button className={styles['item-btn']} onClick={handleExpandToggle}>{expanded? '^' : 'V'}</button>

                        <Modal className={styles['item-btn']} item={item}/>

                        <button
                            onClick={() => handleDelete(item.id)}
                            type="button"
                            className={styles['item-btn']}
                        >
                            <FontAwesomeIcon
                                size='2x'
                                color='white'
                                icon={faTrashAlt}
                            />
                        </button>
                    </div>

                    {expanded && item.children && item.children.length > 0 && (
                        <div className={styles['item-children']}>
                            <TodoElem
                                todoItems={item.children}
                                depth={depth + 1}
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    )
};

export default TodoElem;
