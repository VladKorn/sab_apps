import React from "react";
import Colors from "../constants/Colors";
import appStyles from "./appStyles";
import { StyleSheet, Text, View, TextInput } from "react-native";
interface State {
    // text: string;
    isFocus: boolean;
}
export default class Input extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false
        };
    }
    render() {
        return (
            <TextInput
                autoFocus={this.props.autoFocus}
                placeholder={this.props.placeholder}
                placeholderTextColor={appStyles.input.color}
                style={[
                    appStyles.input,
                    this.props.center ? { textAlign: "center" } : {},
                    this.state.isFocus ? appStyles.inputFocus : {},
                    this.props.error ? appStyles.inputError : {},
                ]}
                onChangeText={this.props.onChangeText}
                onFocus={() => {
                    this.setState({ isFocus: true });
                }}
                onBlur={() => {
                    this.setState({ isFocus: false });
                }}
                
                value={this.props.value}
            />
        );
    }
}
