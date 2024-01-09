import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, TodoListState } from "../../types";

import data from './data.json'
import { RootState } from '../../store/store';

const initialState: TodoListState = {
    todoItems: data.todoItems,
    selectedItems: data.selectedItems,
    closedItems: data.closedItems,
};

export const todoSlice = createSlice({

    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodoItem(state, action: PayloadAction<TodoItem>) {

            state.todoItems.push(action.payload);
        },

        addItemToParent(state, action: PayloadAction<{ parentItem: TodoItem, newItem: TodoItem }>) {
            addItem(state.todoItems, action.payload.parentItem.id, action.payload.newItem)

        },
        removeTodoItem(state, action: PayloadAction<string>) {
            removeItem(state.todoItems, action.payload);
        },

        toggleSelectedItem(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            if (state.selectedItems.includes(itemId)) {
                state.selectedItems = state.selectedItems.filter(
                    (selectedId) => selectedId !== itemId
                );
            } else {
                state.selectedItems.push(itemId);
            }
        },
        deleteSelectedItems(state) {
            const selectedIds = state.selectedItems;
            state.todoItems = state.todoItems.filter(
                (item) => !selectedIds.includes(item.id)
            );
            state.selectedItems = [];
        },
        closedSelectedItems(state) {
            const selectedIds = state.selectedItems;
            state.todoItems = state.todoItems.map(item => {
                if (selectedIds.includes(item.id)) {
                    return {
                        ...item,
                        status: 'closed',
                        isClosed: true
                    };
                }
                return item;
            });
            state.selectedItems = [];

        },
        reorderItems: (state, action: PayloadAction<TodoItem[]>) => {
            state.todoItems = action.payload;
            // console.log(state.todoItems);
        }
    },
});

export const { addTodoItem, removeTodoItem, deleteSelectedItems, toggleSelectedItem, addItemToParent, reorderItems, closedSelectedItems } = todoSlice.actions

function removeItem(items: TodoItem[], id: string): void {

    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.id === id) {
            items.splice(i, 1);
            break
        } else {
            removeItem(element.children, id);
        }
    }
}

function addItem(items: TodoItem[], id: string, newItem: TodoItem): void {

    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.id === id) {
            // items.splice(i + 1, 0, newItem);
            element.children.push(newItem);
            break
        }
        else {
            addItem(element.children, id, newItem);
        }
    }
}

export const todoItems = (state: RootState) => state.todo.todoItems;



export default todoSlice.reducer