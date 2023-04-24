import {ScrollView, StyleSheet} from 'react-native';
import {Main} from "./src/app/Main";
import {store} from "./src/app/store";
import {Provider} from "react-redux";
import React from "react";

export default function App() {
    return (
        <Provider store={store}>
            <ScrollView style={styles.container}>
                <Main/>
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
