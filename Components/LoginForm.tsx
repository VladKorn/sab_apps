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
    save: boolean;
}
export default class LoginForm extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            // log: "webvladkorn@gmail.com",
            // pas: "jFpidj"
            log: "admin",
            pas: "ie1f32sq",
            save: true,
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        this.props.login(this.state.log, this.state.pas , this.state.save);
    }
    onChange(isChecked){
        console.log(isChecked);
        this.setState({save: !this.state.save});
        
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
                <Input 
                    placeholder="Пароль"
                    center={true}
                    error={this.props.userError && this.props.userError.pas }
                    onChangeText={pas => this.setState({ pas })}
                    value={this.state.pas}
                />
                
                <CheckBox 
                    style={{margin: 20}}
                    onChange={this.onChange}
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
