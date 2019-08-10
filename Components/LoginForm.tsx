import React from "react";
import { StyleSheet, Text, View, TextInput, Button ,Image } from "react-native";
import Colors from '../constants/Colors';


interface State {
    log: string;
    pas: string;
}
export default class LoginForm extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            log: "webvladkorn@gmail.com",
            pas: "jFpidj"
        };
        this.onPressLearnMore = this.onPressLearnMore.bind(this);
    }
    onPressLearnMore(){
        this.props.login(this.state.log , this.state.pas);
    }
    render() {
        return (
            <View>
              
                <Image
                    source={require('../img/logo.png')}
                />
                <TextInput
                    placeholder="Лигин"
                    style={{ height: 40, borderColor: Colors.assent, borderBottomWidth: 5 }}
                    onChangeText={log => this.setState({ log })}
                    value={this.state.log}
                />
                    {/* placeholder="Пароль" */}
                <TextInput
                    placeholder="Пароль"
                    style={{ height: 40, borderColor: Colors.assent, borderBottomWidth: 5 }}
                    onChangeText={pas => this.setState({ pas })}
                    value={this.state.pas}
                />
                <Button
                    onPress={this.onPressLearnMore}
                    title="Вход / Регистрация"
                    color={Colors.assent}
                    accessibilityLabel="Вход / Регистрация"
                />
            </View>
        );
    }
}
