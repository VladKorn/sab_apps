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
import Loading from "./Loading";

interface State {
	log: string;
	pas: string;
	name: string;
	phone: string;
	save: boolean;
	isSignUp: boolean;
	isLoading: boolean;
	errorLog: boolean;
	errorPas: boolean;
}
export default class LoginForm extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			// log: null,
			// pas: null,
			log: "",
			pas: "",
			name: null,
			phone: null,
			save: true,
			isSignUp: false,
			isLoading: false,
			errorLog: false,
			errorPas: false
		};
		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	login() {
		this.setState({ isLoading: true });
		// console.log("this.props.login", this.props.login);
		this.props
			.login({
				isSignUp: this.state.isSignUp,
				name: this.state.name,
				phone: this.state.phone,
				log: this.state.log,
				pas: this.state.pas,
				save: this.state.save
			})
			.then(user => {
                // console.log('form user' , user);
                
				if (user && user.error) {
                    if (user.error === "log") {
						this.setState({ errorLog: true  ,isLoading: false});
					}
					if (user.error === "pas") {
						this.setState({ errorPas: true ,isLoading: false});
					}
				}
			});
	}
	onChange(isChecked) {
		console.log(isChecked);
		this.setState({ save: !this.state.save });
	}
	// userError
	render() {
		const isLoading = this.state.isLoading;
		// const isLoading = true;
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
				{this.state.isSignUp ? (
					<Input
						placeholder="Имя"
						autoFocus={true}
						center={true}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/>
				) : null}
				{this.state.isSignUp ? (
					<Input
						placeholder="Телефон"
						autoFocus={false}
						center={true}
						onChangeText={phone => this.setState({ phone })}
						value={this.state.phone}
					/>
				) : null}
				<Input
					placeholder={this.state.isSignUp ? "Email" : "Логин"}
					autoFocus={true}
					error={this.state.errorLog}
					center={true}
					onChangeText={log => this.setState({ log })}
					value={this.state.log}
				/>
				{!this.state.isSignUp ? (
					<Input
						placeholder="Пароль"
						center={true}
						error={this.state.errorPas}
						onChangeText={pas => this.setState({ pas })}
						value={this.state.pas}
					/>
				) : null}

				<CheckBox style={{ margin: 20 }} onChange={this.onChange}>
					<Text style={[appStyles.text, { marginLeft: 20 }]}>
						Запомнить меня
					</Text>
				</CheckBox>
				{isLoading ? (
					<Loading></Loading>
				) : (
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
				)}
				<View style={appStyles.hr} />

				<TouchableOpacity
					onPress={() => {
						this.setState({
							isSignUp: !this.state.isSignUp
						});
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
