import React, {FC} from 'react';
import {FilterValuesType} from '../../features/TodolistsList/todolists-reducer';
import {Button, View} from "react-native";

type ButtonsBlockPropsType = {
    filter: FilterValuesType
    setFilterValue: (filter: FilterValuesType) => () => void
}

export const ButtonsBlock: FC<ButtonsBlockPropsType> = React.memo((
    {
        filter,
        setFilterValue
    }) => {

    return (
        <View style={{gap: 10}}>
            <Button
                onPress={setFilterValue("all")}
                title="all"
                color={filter === "all" ? "blue" : "lightgrey"}
            />
            <Button
                onPress={setFilterValue("active")}
                title="active"
                color={filter === "active" ? "blue" : "lightgrey"}
            />
            <Button
                onPress={setFilterValue("completed")}
                title="completed"
                color={filter === "completed" ? "blue" : "lightgrey"}
            />
        </View>
    )
})