import { TodoItem } from "../../types";
import TodoElem from "../TodoItem/TodoElem";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Reorder, AnimatePresence } from 'framer-motion';
import { reorderItems, todoItems } from '../../features/todo/todoSlice';
import { useState } from 'react';
import FilterTask from '../FilterTasks/FilterTask';

const TodoList: React.FC<{ todoItems: TodoItem[] }> = () => {
    const [filterType, setFilterType] = useState('opened');

    const dispatch = useAppDispatch();
    const stateTodoItems = useAppSelector(todoItems);

    const handleReorder = (newItems: TodoItem[]) => {
        dispatch(reorderItems(newItems));
    }

    const filteredItems = stateTodoItems.filter(item => {
        return filterType.toLowerCase() === 'opened' ? item.status === 'opened' :
            filterType.toLowerCase() === 'closed' ? item.status === 'closed' :
                true;
    });

    return (
        <>
            <FilterTask setFilterType={setFilterType} />
            {filteredItems.length > 0 ? (
                <Reorder.Group axis='y' values={filteredItems} onReorder={handleReorder}>
                    <AnimatePresence>
                        <TodoElem todoItems={filteredItems} />
                    </AnimatePresence>
                </Reorder.Group>
            ) : (
                <p style={{margin: '0 auto', paddingTop: '100px', color: 'grey'}}>{filterType === 'opened' ? 'No opened tasks' : 'No closed tasks'}</p>
            )}

        </>

    )
};

export default TodoList;