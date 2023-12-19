import { useState } from 'react';
import styles from './modal.module.scss';
import Subtask from '../Create/Subtask';
import { selectTask } from '../../features/todo/subtaskSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addItemToParent } from '../../features/todo/todoSlice';
import { TodoItem } from '../../types';


type ModalProps = {
    className: string,
    item: TodoItem
}


const Modal: React.FC<ModalProps> = ({ className, item}) => {

    const currentTaskValue = useAppSelector(selectTask);
    const dispatch = useAppDispatch();

    const [modal, setModal] = useState<boolean>(false);

    const hello = "hello";

    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handlePressBtn = () => {
        const newItem: TodoItem = {
            id: Math.floor(Math.random() * 100).toString(),
            title: currentTaskValue,
            completed: false,
            children: []
        }
        dispatch(addItemToParent({parentItem: item, newItem: newItem}));
        toggleModal();
    }

    return (
        <>
            <button onClick={toggleModal} className={className}>
                +
            </button>

            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleModal}></div>
                    <div className={styles['modal-content']}>
                        <h2 className={styles['modal-title']}>Добавить подзадачу</h2>
                        <Subtask className={styles['modal-input']}/>
                        <button className={styles['modal-btn']} onClick={handlePressBtn}>Ок</button>
                        <button
                            className={styles['close-modal']}
                            onClick={toggleModal}>
                            X
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Modal;