import React from 'react';
import styles from './todo.module.scss'
import TodoHeader from '../components/Header/TodoHeader';
import TodoCreate from '../components/Create/TodoCreate';
import TodoList from '../components/TodoList/TodoList';
import { useAppSelector } from '../hooks/hooks';


const Todo: React.FC = () => {
    const tasks = useAppSelector((state) => state.todo.todoItems)
    return (
        <div className={styles.container}>
            <TodoHeader />
            <TodoCreate />
            <TodoList todoItems={tasks} />
        </div>
    );
};

export default Todo;