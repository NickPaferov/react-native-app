import React from 'react';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {View} from "react-native";

export const Main = () => {

    return (
        <View style={{flex:1}}>
            <TodolistsList/>
        </View>
    )
}