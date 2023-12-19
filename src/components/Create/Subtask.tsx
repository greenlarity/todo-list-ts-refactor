import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setTaskValue } from '../../features/todo/subtaskSlice';

type SubtaskProps = {
    className: string,
}

const Subtask:React.FC<SubtaskProps> = ({className}) => {

    const taskValue = useAppSelector((state) => state.subtask.taskValue);

    const dispatch = useAppDispatch();

    const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch(setTaskValue(e.currentTarget.value));
    }

    return (
        <div>
            <input 
            type="text" 
            value={taskValue}
            className={className}
            onChange={handleInput}
            />
        </div>
    )
}

export default Subtask