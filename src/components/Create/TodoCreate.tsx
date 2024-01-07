import React, { useState } from 'react';
import styles from './create.module.scss';
import { TodoItem } from '../../types';
import { useAppDispatch } from '../../hooks/hooks';
import { addTodoItem } from '../../features/todo/todoSlice';
import { useSnackbar } from 'notistack';


const TodoCreate: React.FC = () => {
    const [textValue, setTextValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

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
            enqueueSnackbar('Task added successfully',
                {
                    variant: 'success',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                    style: { backgroundColor: '#00bfff', color: 'white' },
                });

        }
        else { alert("Нельзя вводить пустой текст") }
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setTextValue(e.currentTarget.value);
    }

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
        </>

    )
}

export default TodoCreate;