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
import CheckBox from "./CheckBox";


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
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image style={{width: 176.77 , height: 69.27}} source={require("../img/logo.png")} />
                </View>
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
                
                <CheckBox 
                    style={{margin: 20}}
                    >
                    <Text style={[appStyles.text,{marginLeft: 20}]}>Запомнить меня</Text>
                </CheckBox>
                
                <TouchableOpacity
                    onPress={this.login}
                    // color={Colors.assent}
                    style={[appStyles.button , {marginBottom: 10 , marginTop: 20}]}
                >
                    <Text style={appStyles.buttonText}>Вход / Регистрация</Text>

                </TouchableOpacity>
                <View style={appStyles.hr} />
                <Text style={[appStyles.text , {marginBottom: 40 , marginTop: 20}]}>Для юридических лиц</Text>
            </SafeAreaView>
        );
    }
}
