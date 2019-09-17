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
    name: string;
    phone: string;
	save: boolean;
	isSignUp: boolean;
}
export default class LoginForm extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			log: null,
            pas: null,
            name: null,
            phone: null,
			save: true,
			isSignUp: false
		};
		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	login() {
		this.props.login({
			isSignUp: this.state.isSignUp,
			name: this.state.name,
			phone: this.state.phone,
			log: this.state.log,
			pas: this.state.pas,
			save: this.state.save
		});
	}
	onChange(isChecked) {
		console.log(isChecked);
		this.setState({ save: !this.state.save });
	}
	// userError
	render() {
		return (
			<SafeAreaView
				style={[
					appStyles.page,
					{
						backgroundColor: "#F2F2F2",
						justifyContent: "center",
						alignItems: "center"
					}
				]}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Image
						style={{ width: 176.77, height: 69.27 }}
						source={require("../img/logo.png")}
					/>
				</View>
				{this.state.isSignUp? <Input
					placeholder="Имя"
					autoFocus={true}
					error={this.props.userError && this.props.userError.name}
					center={true}
					onChangeText={name => this.setState({ name })}
					value={this.state.name}
				/> :null}
                {this.state.isSignUp? <Input
					placeholder="Телефон"
					autoFocus={false}
					error={this.props.userError && this.props.userError.phone}
					center={true}
					onChangeText={phone => this.setState({ phone })}
					value={this.state.phone}
				/>:null}
				<Input
					placeholder={this.state.isSignUp ? "Email":"Логин"}
					autoFocus={true}
					error={this.props.userError && this.props.userError.log}
					center={true}
					onChangeText={log => this.setState({ log })}
					value={this.state.log}
				/>
				{!this.state.isSignUp? <Input
					placeholder="Пароль"
					center={true}
					error={this.props.userError && this.props.userError.pas}
					onChangeText={pas => this.setState({ pas })}
					value={this.state.pas}
                />
                :null}

				<CheckBox style={{ margin: 20 }} onChange={this.onChange}>
					<Text style={[appStyles.text, { marginLeft: 20 }]}>
						Запомнить меня
					</Text>
				</CheckBox>

				<TouchableOpacity
					onPress={this.login}
					// color={Colors.assent}
					style={[
						appStyles.button,
						{ marginBottom: 10, marginTop: 20 }
					]}
				>
					<Text style={appStyles.buttonText}>
						{this.state.isSignUp ? "Регистрация" : "Вход"}{" "}
					</Text>
				</TouchableOpacity>
				<View style={appStyles.hr} />
				<TouchableOpacity
					onPress={() => {
						this.setState({ isSignUp: !this.state.isSignUp });
					}}
				>
					<Text
						style={[
							appStyles.text,
							{ marginBottom: 40, marginTop: 20 }
						]}
					>
						{this.state.isSignUp ? "Вход" : "Регистрация"}
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
