import { deleteSelectedItems } from '../features/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';



const Footer = () => {
    const selectedTask = useAppSelector((state) => state.todo.selectedItems);
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(deleteSelectedItems());
    }
    return (
        <>
            <button
                onClick={handleDelete}
                disabled={selectedTask.length === 0}
            >
                Delete selected
            </button>
        </>
    )
};

export default Footer