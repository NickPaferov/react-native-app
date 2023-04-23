import React, {FC, useState} from 'react';
import {RequestStatusType} from "../../app/app-reducer";
import {Text, TextInput, View} from "react-native";
import {globalStyles} from "../../../GlobalStyles";
import {AntDesign} from "@expo/vector-icons";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
    entityStatus?: RequestStatusType
}

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((
    {
        title,
        changeTitle,
        entityStatus
    }
) => {

    const [newTitle, setNewTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetUserText = (text: string) => {
        setNewTitle(text)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    return editMode
        ? <View style={{flexDirection: "row"}}>
            <TextInput
                style={globalStyles.input}
                onChangeText={onChangeSetUserText}
                value={title}
            />
            <AntDesign name="checkcircleo" size={24} color="black" onPress={offEditMode}/>
        </View>
        : <View>
            <Text onLongPress={onEditMode}>{title}</Text>
        </View>
})