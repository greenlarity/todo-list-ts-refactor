import { TodoItem } from "../../types";
import TodoElem from "../TodoItem/TodoElem";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AnimatePresence } from 'framer-motion';
import { reorderItems, todoItems } from '../../features/todo/todoSlice';
import { useState } from 'react';
import FilterTask from '../FilterTasks/FilterTask';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';



const TodoList: React.FC<{ todoItems: TodoItem[] }> = () => {
    const [filterType, setFilterType] = useState('opened');

    const dispatch = useAppDispatch();
    const stateTodoItems = useAppSelector(todoItems);


    const filteredItems = stateTodoItems.filter(item => {
        return filterType.toLowerCase() === 'opened' ? item.status === 'opened' :
            filterType.toLowerCase() === 'closed' ? item.status === 'closed' :
                true;
    });

    const moveNestedItem = (items: TodoItem[], source: DraggableLocation, destination: DraggableLocation): TodoItem[] => {
        const updatedItems = items.map((item) => {
            if (item.id === source.droppableId) {
                if (source.droppableId === destination.droppableId) {
                    const updatedChildren = Array.from(item.children);
                    const [removed] = updatedChildren.splice(source.index, 1);
                    updatedChildren.splice(destination.index, 0, removed);
                    return { ...item, children: updatedChildren };
                } else {
                    return item;
                }
            } else if (item.children.length > 0) {
                // Рекурсивное перемещение вложенных элементов
                const updatedChildren = moveNestedItem(item.children, source, destination);
                return { ...item, children: updatedChildren };
            }
            return item;
        });
        return updatedItems;
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const { source, destination, type } = result;
        const items = Array.from(stateTodoItems);

        if (type === 'TASK') {
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);
            dispatch(reorderItems(items));
        } else {
            const updatedItems = moveNestedItem(items, source, destination);
            dispatch(reorderItems(updatedItems));
        }
    };

    return (
        <>
            <FilterTask setFilterType={setFilterType} />
            {filteredItems.length > 0 ? (
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <AnimatePresence>
                        <TodoElem items={filteredItems} />

                    </AnimatePresence>
                </DragDropContext>

            ) : (
                <p style={{ margin: '0 auto', paddingTop: '100px', color: 'grey' }}>{filterType === 'opened' ? 'No opened tasks' : 'No closed tasks'}</p>
            )}
        </>

    )
}

export default TodoList;