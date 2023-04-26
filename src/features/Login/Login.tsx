import React, {useState} from "react";
import {useAppDispatch} from "../../app/store";
import {Button, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {loginTC} from "./auth-reducer";
import {globalStyles} from "../../../GlobalStyles";
import {Checkbox} from "expo-checkbox";
import {MaterialIcons} from "@expo/vector-icons";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

type FormInputsType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

const schema = yup
    .object({
        email: yup.string().required("Email is required").email("Must be a valid email"),
        password: yup
            .string()
            .required("Password is required")
            .min(3, "Password should be at least 3 characters")
            .max(20, "Password should be at most 20 characters"),
    })
    .required()
export const Login = () => {

    const dispatch = useAppDispatch()

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: FormInputsType) => {
        dispatch(loginTC(data))
    }

    const toggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <View style={styles.container}>
            <View style={styles.clarification}>
                <Text>To log in get registered
                    <Text style={{color: 'blue'}}
                          onPress={() => Linking.openURL("https://social-network.samuraijs.com/")}
                    > here
                    </Text>
                </Text>
                <Text>or use common test account credentials:</Text>
                <Text>Email: free@samuraijs.com</Text>
                <Text>Password: free</Text>
            </View>
            <View style={styles.form}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput style={[globalStyles.input, styles.formInput]}
                                   placeholder="email"
                                   onBlur={onBlur}
                                   onChangeText={onChange}
                                   value={value}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <View style={styles.password}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput style={[globalStyles.input, styles.formInput]}
                                       placeholder="password"
                                       onBlur={onBlur}
                                       onChangeText={onChange}
                                       value={value}
                                       secureTextEntry={!isPasswordVisible}
                            />
                        )}
                        name="password"
                    />
                    <TouchableOpacity onPress={toggleVisibility}>
                        {isPasswordVisible
                            ? <MaterialIcons name="visibility-off" size={24} color="black"/>
                            : <MaterialIcons name="visibility" size={24} color="black"/>}
                    </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

                <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <View style={styles.checkBox}>
                            <Checkbox onValueChange={onChange}
                                      value={value}
                            />
                            <Text>remember me</Text>
                        </View>
                    )}
                    name="rememberMe"
                />

                <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 50,
    },
    clarification: {
        marginTop: 150,
        alignItems: "center",
    },
    form: {
        justifyContent: "flex-start",
        gap: 20,
    },
    formInput: {
        height: 40,
        width: 200,
        paddingHorizontal: 10,
    },
    password: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    checkBox: {
        flexDirection: "row",
        gap: 20,
    },
    error: {
        color: "red",
    }
})