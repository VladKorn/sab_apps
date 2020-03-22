import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	SafeAreaView,
	Keyboard,
	Dimensions,
	ScrollView
} from "react-native";
import Colors from "../constants/Colors";
import appStyles from "./appStyles";
import Input from "./Input";
import CheckBox from "./CheckBox";
import Loading from "./Loading";
import { LoginData } from "../interfaces";

interface State {
	log: string;
	pas: string;
	name: string;
	phone: string;
	save: boolean;
	// isSignUp: boolean;
	isLoading: boolean;
	errorLog: boolean;
	errorPas: boolean;
	keyboardHeight: number;
	mode: "signIn" | "signUp" | "forgot";
	loginPasForgot: string | null;
}
export default class LoginForm extends React.Component<any, State> {
	keyboardDidShowListener: any;
	keyboardDidHideListener: any;
	constructor(props) {
		super(props);
		this.state = {
			log: "",
			pas: "",
			name: null,
			phone: null,
			save: true,
			isLoading: false,
			errorLog: false,
			errorPas: false,
			mode: "signIn",
			loginPasForgot: null,
			keyboardHeight: 0
		};
		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			"keyboardWillShow",
			event => {
				console.log(
					"event.endCoordinates.height",
					event.endCoordinates.height,
					Dimensions.get("window").height
				);
				this.setState({ keyboardHeight: event.endCoordinates.height });
			}
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			"keyboardWillHide",
			() => {
				this.setState({ keyboardHeight: 0 });
			}
		);
	}
	login() {
		this.setState({ isLoading: true });
		if (this.state.mode === "forgot") {
			fetch(`https://subexpress.ru/apps_api/`, {
				method: "post",
				body: JSON.stringify({
					loginData: { log: this.state.log, mode: this.state.mode }
				})
			})
				.then(res => res.json())
				.then(res => {
					if (res["error"]) {
						alert(res["error"]);
					}
					this.setState({
						loginPasForgot: "Новый пароль выслан на Вашу почту"
					});
					// console.log('res' , res)
				});
			this.setState({ isLoading: false });
			return null;
		}

		// console.log("this.props.login", this.props.login);
		const loginData: LoginData = {
			// isSignUp: this.state.isSignUp,
			name: this.state.name,
			phone: this.state.phone,
			log: this.state.log,
			pas: this.state.pas,
			save: this.state.save,
			mode: this.state.mode
		};
		this.props.login(loginData).then(user => {
			// console.log('form user' , user);

			if (user && user.error) {
				if (user.error === "log") {
					this.setState({ errorLog: true, isLoading: false });
				}
				if (user.error === "pas") {
					this.setState({ errorPas: true, isLoading: false });
				}
			}
		});
	}
	onChange(isChecked) {
		// console.log(isChecked);
		this.setState({ save: !this.state.save });
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.loginPasForgot !== prevState.loginPasForgot &&
			this.state.mode !== "signIn"
		) {
			this.setState({ mode: "signIn", isLoading: false });
		}
	}
	// userError
	render() {
		const isLoading = this.state.isLoading;
		// const isLoading = true;
		return (
			// <SafeAreaView
			// 	style={[
			// 		appStyles.page,
			// 		{
			// 			backgroundColor: "#F2F2F2",
			// 			justifyContent: "center",
			// 			alignItems: "center"
			// 		}
			// 	]}
			// >

			<ScrollView
				contentContainerStyle={{
					// flex: 1,
					minHeight: "100%",
					backgroundColor: "#F2F2F2",
					justifyContent: "flex-end",
					alignItems: "center"
					// height: 2000
				}}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Image
						style={{ width: 176.77, height: 69.27, margin: 20 }}
						source={require("../img/logo.png")}
					/>
				</View>
				{this.state.mode === "signUp" ? (
					<>
						<Input
							placeholder="Имя"
							autoFocus={true}
							center={true}
							onChangeText={name => this.setState({ name })}
							value={this.state.name}
						/>
					</>
				) : null}
				{this.state.mode === "signUp" ? (
					<Input
						placeholder="Телефон"
						autoFocus={false}
						center={true}
						onChangeText={phone => this.setState({ phone })}
						value={this.state.phone}
					/>
				) : null}
				<Input
					placeholder={
						this.state.mode === "signUp" ||
						this.state.mode === "forgot"
							? "Email"
							: "Логин"
					}
					autoFocus={true}
					error={this.state.errorLog}
					center={true}
					onChangeText={log => this.setState({ log })}
					value={this.state.log}
				/>
				{this.state.mode === "signIn" && this.state.loginPasForgot ? (
					<Text style={appStyles.text}>
						{this.state.loginPasForgot}
					</Text>
				) : null}

				{this.state.mode === "signIn" ||
				this.state.mode === "signUp" ? (
					<Input
						placeholder="Пароль"
						center={true}
						error={this.state.errorPas}
						onChangeText={pas => this.setState({ pas })}
						value={this.state.pas}
					/>
				) : null}
				{this.state.mode !== "forgot" ? (
					<CheckBox style={{ margin: 10 }} onChange={this.onChange}>
						<Text style={[appStyles.text, { marginLeft: 20 }]}>
							Запомнить меня
						</Text>
					</CheckBox>
				) : null}

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
							{this.state.mode === "forgot" ? "Выслать" : null}
							{this.state.mode === "signUp"
								? "Регистрация"
								: null}
							{this.state.mode === "signIn" ? "Вход" : null}
						</Text>
					</TouchableOpacity>
				)}
				<View style={[appStyles.hr, { marginTop: 30 }]} />
				<View
					style={{
						minHeight: this.state.keyboardHeight,
						alignItems: "center"
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.setState({
								mode: "signIn"
							});
						}}
					>
						<Text
							style={[
								appStyles.text,
								{ marginBottom: 10, marginTop: 10 },
								this.state.mode === "signIn"
									? { color: Colors.assent3 }
									: null
							]}
						>
							Вход
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.setState({
								mode: "signUp"
							});
						}}
					>
						<Text
							style={[
								appStyles.text,
								{ marginBottom: 10, marginTop: 10 },
								this.state.mode === "signUp"
									? { color: Colors.assent3 }
									: null
							]}
						>
							Регистрация
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.setState({
								mode: "forgot"
							});
						}}
					>
						<Text
							style={[
								appStyles.text,
								{ marginBottom: 30, marginTop: 10 },
								this.state.mode === "forgot"
									? { color: Colors.assent3 }
									: null
							]}
						>
							Забили пароль?
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			// </SafeAreaView>
		);
	}
}
