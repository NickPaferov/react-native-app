import React, {useState} from 'react';
import {RequestStatusType} from "../../app/app-reducer";
import {TextInput, TouchableOpacity, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import {globalStyles} from "../../../GlobalStyles";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (text: string) => {
        setTitle(text)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <View style={{flexDirection: "row", marginVertical: 5, gap: 30}}>
            <TextInput
                style={globalStyles.input}
                onChangeText={onChangeSetTitle}
                value={title}
                placeholder="Title"
            />
            <TouchableOpacity onPress={onClickAddItem}>
                <Octicons name="diff-added" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
})