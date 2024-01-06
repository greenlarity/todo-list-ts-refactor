import { useState } from 'react';
import styles from './modal.module.scss';
import Subtask from '../Create/Subtask';
import { selectTask, setTaskValue } from '../../features/todo/subtaskSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addItemToParent } from '../../features/todo/todoSlice';
import { TodoItem } from '../../types';


type ModalProps = {
    className: string,
    item: TodoItem
}


const Modal: React.FC<ModalProps> = ({ className, item }) => {

    const [showError, setShowError] = useState<boolean>(false);
    const currentTaskValue = useAppSelector(selectTask);
    const dispatch = useAppDispatch();

    const [modal, setModal] = useState<boolean>(false);

    const toggleModal = () => {
        setModal(!modal);
        dispatch(setTaskValue(''));
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
            children: [],
            status: 'opened'
            
        }
        if (currentTaskValue === '') {
            setShowError(true);
            return
        }
        else {
            dispatch(addItemToParent({ parentItem: item, newItem: newItem }));
            toggleModal();
            setShowError(false);
        }

    }

    return (
        <>
            <button onClick={toggleModal} className={className}>
                <img src="/src/assets/add-button.png" alt="Add item" />
            </button>

            {modal && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={toggleModal}></div>
                    <div className={styles['modal-content']}>
                        <h2 className={styles['modal-title']}>Добавить подзадачу</h2>
                        <Subtask className={styles['modal-input']} />
                        {showError && currentTaskValue === '' && (
                            <p className={styles['error-msg']}>Поле не должно быть пустым</p>
                        )}
                        <button className={styles['modal-btn']} onClick={handlePressBtn}>Ок</button>
                        <button
                            className={styles['close-modal']}
                            onClick={toggleModal}>
                            <img src="/src/assets/close-50.png" alt="Close" />
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Modal;