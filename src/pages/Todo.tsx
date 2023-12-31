import React from 'react';
import styles from './todo.module.scss'
import TodoHeader from '../components/Header/TodoHeader';
import TodoCreate from '../components/Create/TodoCreate';
import TodoList from '../components/TodoList/TodoList';
import { useAppSelector } from '../hooks/hooks';
import Footer from '../components/Footer/Footer';


const Todo: React.FC = () => {
    const tasks = useAppSelector((state) => state.todo.todoItems)
    return (
        <div className={styles.container}>
            <TodoHeader />
            <TodoCreate />
                <TodoList todoItems={tasks} />
            <Footer />
        </div>
    );
};

export default Todo;