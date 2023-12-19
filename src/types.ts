export interface TodoItem {
    id: string,
    title: string,
    completed?: boolean,
    children: TodoItem[]
}

export interface TodoListState {
    todoItems: TodoItem[],
    selectedItems: string[],
}

export interface SubtaskState {
    taskValue: string,
}