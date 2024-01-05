import { closedSelectedItems } from '../../features/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './footer.module.scss'


const Footer = () => {
    const selectedTask = useAppSelector((state) => state.todo.selectedItems);
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(closedSelectedItems());
    }
    return (
        <>
            {selectedTask.length > 0 && (
                <button
                    className={styles.footer}
                    onClick={handleDelete}
                    disabled={selectedTask.length === 0}
                >
                    Close selected
                </button>
            )}

        </>
    )
};

export default Footer