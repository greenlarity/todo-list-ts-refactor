export interface TodoItem {
    id: string,
    title: string,
    children: TodoItem[],
    status: string
}

export interface TodoListState {
    todoItems: TodoItem[],
    selectedItems: string[],
    closedItems: TodoItem[],
}

export interface SubtaskState {
    taskValue: string,
}