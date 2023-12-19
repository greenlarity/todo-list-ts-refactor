import { TodoItem } from "../../types";
import TodoElem from "../TodoItem/TodoElem";


const TodoList: React.FC<{ todoItems: TodoItem[] }> = ({ todoItems: items }) => {
    return (
        <>
            <TodoElem todoItems={items}/>
        </>
    )
};

export default TodoList;