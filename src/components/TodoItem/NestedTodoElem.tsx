import { Draggable } from 'react-beautiful-dnd';
import { TodoItem } from "../../types";

const NestedTodoElem: React.FC<{ item: TodoItem, index: number }> = ({ item, index }) => {
    // Логика отображения и управления состоянием вложенного элемента
    // ...

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.id}
                </div>
            )}
        </Draggable>
    );
};

export default NestedTodoElem;