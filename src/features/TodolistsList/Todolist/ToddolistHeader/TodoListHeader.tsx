import React from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {RequestStatusType} from "../../../../app/app-reducer";
import {TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

type TodoListHeaderPropsType = {
    title: string
    entityStatus: RequestStatusType
    removeTodoList: () => void
    changeTodoListTitle: (newTitle: string) => void
}

export const TodoListHeader: React.FC<TodoListHeaderPropsType> = React.memo((
    {
        title,
        entityStatus,
        changeTodoListTitle,
        ...props
    }
) => {
    return (
        <View style={{flexDirection: "row", gap: 20}}>
            <EditableSpan title={title} changeTitle={changeTodoListTitle} entityStatus={entityStatus}/>
            <TouchableOpacity onPress={props.removeTodoList}>
                <MaterialIcons name="delete-outline" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
})