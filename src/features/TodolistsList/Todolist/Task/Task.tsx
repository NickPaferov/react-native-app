import React, {useCallback} from 'react';
import {TaskStatuses} from "../../../../api/todolist-api";
import {TaskDomainType} from "../../tasks-reducer";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {MaterialIcons} from "@expo/vector-icons";
import {Checkbox} from "expo-checkbox";

type TaskPropsType = TaskDomainType & {
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses) => void
    changeTaskTitle: (id: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((
    {
        id,
        status,
        title,
        entityStatus,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        ...props
    }
) => {

    const onClickRemoveTask = useCallback(() => removeTask(id), [removeTask, id])
    const onChangeChangeTaskStatus = useCallback((checked: boolean) => {
        changeTaskStatus(id, checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeTaskStatus, id])
    const onChangeChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(id, title)
    }, [changeTaskTitle, id])

    return (
        <View style={status === TaskStatuses.Completed ? {
            ...styles.taskContainer,
            opacity: 0.5
        } : {...styles.taskContainer}}>
            <Checkbox value={status === TaskStatuses.Completed}
                      onValueChange={onChangeChangeTaskStatus}
            />
            <EditableSpan title={title} changeTitle={onChangeChangeTaskTitle} entityStatus={entityStatus}/>
            <TouchableOpacity onPress={onClickRemoveTask}>
                <MaterialIcons name="delete-outline" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        gap: 20,
    },
})