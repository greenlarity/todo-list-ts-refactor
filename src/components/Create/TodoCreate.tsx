import React, { useEffect, useState } from 'react';
import styles from './create.module.scss';
import { TodoItem } from '../../types';

import { useAppDispatch } from '../../hooks/hooks';
import { addTodoItem } from '../../features/todo/todoSlice';
import Popup from '../Popup/Popup';

const TodoCreate: React.FC = () => {
    const [textValue, setTextValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const [showPopup, setShowPopup] = useState(false);


    const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textValue.length >= 1) {
            const newItem: TodoItem = {
                children: [],
                id: Math.floor(Math.random() * 100).toString(),
                title: textValue,
                status: 'opened',
            }
            dispatch(addTodoItem(newItem))
            setTextValue('');
            setShowPopup(true);
        }
        else { alert("Нельзя вводить пустой текст") }

    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setTextValue(e.currentTarget.value);
    }

    useEffect(() => {
        if (showPopup) {
            const timeout = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [showPopup]);

    return (
        <>
            <form className={styles['create-wrapper']}
                onSubmit={handleAddTodo}>
                <input
                    className={styles['create-input']}
                    type="text"
                    value={textValue}
                    placeholder='Enter task'
                    onChange={handleInput}
                />
            </form>
            {showPopup && (
                <Popup showAnimation={true}/>
            )}
        </>

    )
}

export default TodoCreate;