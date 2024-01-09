import { TodoItem } from "../../types";
import TodoElem from "../TodoItem/TodoElem";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AnimatePresence } from 'framer-motion';
import { reorderItems, todoItems } from '../../features/todo/todoSlice';
import { useState } from 'react';
import FilterTask from '../FilterTasks/FilterTask';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';



const TodoList: React.FC<{ todoItems: TodoItem[] }> = () => {
    const [filterType, setFilterType] = useState('opened');

    const dispatch = useAppDispatch();
    const stateTodoItems = useAppSelector(todoItems);


    const filteredItems = stateTodoItems.filter(item => {
        return filterType.toLowerCase() === 'opened' ? item.status === 'opened' :
            filterType.toLowerCase() === 'closed' ? item.status === 'closed' :
                true;
    });

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(stateTodoItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(reorderItems(items));
        console.log(result.destination.index);
    }

    return (
        <>

            <FilterTask setFilterType={setFilterType} />

            {filteredItems.length > 0 ? (
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <AnimatePresence>
                        <TodoElem todoItems={filteredItems} />
                    </AnimatePresence>
                </DragDropContext>

            ) : (
                <p style={{ margin: '0 auto', paddingTop: '100px', color: 'grey' }}>{filterType === 'opened' ? 'No opened tasks' : 'No closed tasks'}</p>
            )}
        </>

    )
};

export default TodoList;