import { TodoItem } from "../../types";
import TodoElem from "../TodoItem/TodoElem";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Reorder, AnimatePresence } from 'framer-motion';
import { reorderItems, todoItems } from '../../features/todo/todoSlice';

const TodoList: React.FC<{ todoItems: TodoItem[] }> = ({ todoItems: items }) => {

    const dispatch = useAppDispatch();
    const stateTodoItems = useAppSelector(todoItems);

    const handleReorder = (newItems: TodoItem[]) => {
        dispatch(reorderItems(newItems));
    }

    return (
        <Reorder.Group axis='y' values={stateTodoItems} onReorder={handleReorder}>
            <AnimatePresence>
                <TodoElem todoItems={items} />

            </AnimatePresence>
        </Reorder.Group>
    )
};

export default TodoList;