import React, {useCallback, useEffect} from 'react';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {View, Text, StyleSheet, Button} from "react-native";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from './app-reducer';
import {logoutTC} from '../features/Login/auth-reducer';
import {CircularProgress} from "../components/CircularProgress/CircularProgress";
import { LinearProgress } from 'react-native-elements';
import { Login } from '../features/Login/Login';

export const Main = () => {

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>Task manager</Text>
                {isLoggedIn && <Button
                    onPress={logoutHandler}
                    title="Log Out"
                    color="blue"
                />}
            </View>
            {status === 'loading' && <LinearProgress color="secondary" />}
            {isLoggedIn ? <TodolistsList/> : <Login/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "blue",
        padding: 20,
    },
    appName: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
})