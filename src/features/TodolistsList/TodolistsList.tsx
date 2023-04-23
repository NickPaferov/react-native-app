import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistAC,
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";
import {View} from "react-native";
import {globalStyles} from "../../../GlobalStyles";

export const TodolistsList = () => {
    const {tasks, todoLists} = useAppSelector(state => state)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch, removeTaskTC])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch, addTaskTC])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(todoListID, taskID, {status}))
    }, [dispatch, updateTaskTC])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(updateTaskTC(todoListID, taskID, {title}))
    }, [dispatch, updateTaskTC])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID))
    }, [dispatch, removeTodolistTC])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch, addTodolistAC])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(todoListID, title))
    }, [dispatch, changeTodoListTitleTC])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
    }, [dispatch, changeTodolistFilterAC])

    return <View style={{padding: 20}}>
        <View>
            {todoLists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                return (
                    <View key={tl.id}>
                        <View>
                            <TodoList
                                todoListID={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                removeTask={removeTask}
                                changeFilter={changeTodoListFilter}
                                addTask={addTask}
                                removeTodoList={removeTodoList}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        </View>
                    </View>
                )
            })}
        </View>
        <View style={[globalStyles.border, {paddingHorizontal: 15}]}>
            <AddItemForm addItem={addTodoList}/>
        </View>
    </View>
}