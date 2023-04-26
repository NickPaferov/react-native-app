import {ScrollView, StyleSheet} from 'react-native';
import {Main} from "./src/app/Main";
import {store} from "./src/app/store";
import {Provider} from "react-redux";
import React from "react";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ScrollView style={styles.container}>
                    <SafeAreaView>
                        <Main/>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaProvider>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
