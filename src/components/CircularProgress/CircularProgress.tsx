import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {StyleSheet, View} from "react-native";

export const CircularProgress = () => {
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={50}
                width={5}
                fill={100}
                tintColor="blue"
                backgroundColor="lightblue"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 350,
    },
})