import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import Colors from "../constants/Colors";
import appStyles from "./appStyles";
import Input from "./Input";


interface State {
    log: string;
    pas: string;
}
export default class LoginForm extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            // log: "webvladkorn@gmail.com",
            // pas: "jFpidj"
            log: "admin",
            pas: "ie1f32sq"
        };
        this.login = this.login.bind(this);
    }
    login() {
        this.props.login(this.state.log, this.state.pas);
    }
    // userError
    render() {
        return (
            <SafeAreaView style={[appStyles.page , {
                backgroundColor: "#F2F2F2",
                justifyContent: 'center',
                alignItems: 'center'
                }]}>
                <Image style={{width: 176.77 , height: 69.27}} source={require("../img/logo.png")} />
                <Input
                    placeholder="Логин"
                    autoFocus={true}
                    error={this.props.userError && this.props.userError.log }
                    center={true}
                    onChangeText={log => this.setState({ log })}
                    value={this.state.log}
                />
                {/* placeholder="Пароль" */}
                <Input 
                    placeholder="Пароль"
                    center={true}
                    error={this.props.userError && this.props.userError.pas }
                    onChangeText={pas => this.setState({ pas })}
                    value={this.state.pas}
                />
                
              
              
                <TouchableOpacity
                    onPress={this.login}
                    // color={Colors.assent}
                    style={appStyles.button}
                >
                    <Text style={appStyles.buttonText}>Вход / Регистрация</Text>

                </TouchableOpacity>
                <Text>Для юридических лиц</Text>
            </SafeAreaView>
        );
    }
}
