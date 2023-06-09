import React, {useCallback, useEffect} from 'react';
import {TodoListHeader} from "./ToddolistHeader/TodoListHeader";
import {Task} from "./Task/Task";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {ButtonsBlock} from "../../../components/ButtonsBlock/ButtonsBlock";
import {TaskStatuses} from '../../../api/todolist-api';
import {FilterValuesType} from "../todolists-reducer";
import {fetchTasksTC, TaskDomainType} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";
import {View} from "react-native";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskDomainType>
    filter: FilterValuesType
    entityStatus: RequestStatusType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    }, [])

    let tasksForRender = props.tasks
    if (props.filter === "active") {
        tasksForRender = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForRender = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTask = useCallback((taskID: string) =>
        props.removeTask(taskID, props.todoListID), [props.removeTask, props.todoListID])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses) =>
        props.changeTaskStatus(taskID, status, props.todoListID), [props.changeTaskStatus, props.todoListID])
    const changeTaskTitle = useCallback((taskID: string, title: string) =>
        props.changeTaskTitle(taskID, title, props.todoListID), [props.changeTaskTitle, props.todoListID])
    const setFilterValue = useCallback((filter: FilterValuesType) =>
        () => props.changeFilter(filter, props.todoListID), [props.changeFilter, props.todoListID])
    const removeTodoList = useCallback(() =>
        props.removeTodoList(props.todoListID), [props.removeTodoList, props.todoListID])
    const addTask = useCallback((title: string) =>
        props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle, props.todoListID])
    return (
        <View style={{paddingVertical: 15}}>
            <TodoListHeader
                title={props.title}
                entityStatus={props.entityStatus}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
            <AddItemForm
                addItem={addTask}
                entityStatus={props.entityStatus}
            />
            <View>
                {tasksForRender.map(t => {
                    return (
                        <Task
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            status={t.status}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            todoListId={props.todoListID}
                            description={t.description}
                            completed={t.completed}
                            startDate={t.startDate}
                            deadline={t.deadline}
                            addedDate={t.addedDate}
                            order={t.order}
                            priority={t.priority}
                            entityStatus={t.entityStatus}
                        />
                    )
                })}
            </View>
            <ButtonsBlock filter={props.filter} setFilterValue={setFilterValue}/>
        </View>
    )
})