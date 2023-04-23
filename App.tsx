import {StyleSheet, View} from 'react-native';
import {Main} from "./src/app/Main";
import {store} from "./src/app/store";
import {Provider} from "react-redux";
import React from "react";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Main/>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: "#fff",
    },
})
