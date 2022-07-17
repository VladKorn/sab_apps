import { useState, useEffect, useContext } from "react";
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
	ScrollView,
} from "react-native";
import Colors from "../../constants/colors";
import appStyles from "../appStyles";
import Input from "../Input";
import CheckBox from "../CheckBox";
import Loading from "../Loading";
import { LoginData } from "../../interfaces";
import { AuthContext } from "./Login";

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
interface Props {}
export const LoginForm = (props: Props) => {
	let keyboardDidShowListener: any;
	let keyboardDidHideListener: any;
	const authContext = useContext(AuthContext);
	const [log, setLog] = useState(""); //webvladkorn@gmail.com
	const [pas, setPas] = useState(""); //VwO4VO
	const [name, setName] = useState(null);
	const [phone, setPhone] = useState(null);
	const [save, setSave] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [errorLog, setErrorLog] = useState(false);
	const [errorPas, setErrorPas] = useState(false);
	const [mode, setMode] = useState<"signIn" | "signUp" | "forgot">("signIn");
	const [loginPasForgot, setLoginPasForgot] = useState(null);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		keyboardDidShowListener = Keyboard.addListener(
			"keyboardWillShow",
			(event) => {
				console.log(
					"event.endCoordinates.height",
					event.endCoordinates.height,
					Dimensions.get("window").height
				);
				setKeyboardHeight(event.endCoordinates.height);
			}
		);
		keyboardDidHideListener = Keyboard.addListener(
			"keyboardWillHide",
			() => {
				setKeyboardHeight(0);
			}
		);
	}, []);

	const login = () => {
		setIsLoading(true);
		if (mode === "forgot") {
			fetch(`https://subexpress.ru/apps_api/`, {
				method: "post",
				body: JSON.stringify({
					loginData: { log: log, mode: mode },
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res["error"]) {
						alert(res["error"]);
					}

					setLoginPasForgot('Новый пароль выслан на Вашу почту"');
					setIsLoading(false);

					// console.log('res' , res)
				})
				.catch((err) => {
					setIsLoading(false);
				});
			setIsLoading(false);
			return null;
		}

		// console.log("props.login", props.login);
		const loginData: LoginData = {
			// isSignUp: isSignUp,
			name: name,
			phone: phone,
			log: log,
			pas: pas,
			save: save,
			mode: mode,
		};
		authContext.login(loginData).then((user) => {
			console.log("form user", user);

			if (user && user.error) {
				if (user.error === "log") {
					setErrorLog(true);
					setIsLoading(false);
				}
				if (user.error === "pas") {
					setIsLoading(false);
					setErrorPas(true);
				}
			}
		});
	};
	const onChange = (isChecked) => {
		// console.log(isChecked);
		setSave(!save);
	};
	useEffect(() => {
		if (mode !== "signIn") {
			setIsLoading(false);
			setMode("signIn");
		}
	}, [loginPasForgot]);

	return (
		<ScrollView
			contentContainerStyle={{
				minHeight: "100%",
				backgroundColor: "#F2F2F2",
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Image
					style={{ width: 176.77, height: 69.27, margin: 20 }}
					source={require("./../../img/logo.png")}
				/>
			</View>
			{mode === "signUp" ? (
				<>
					<Input
						placeholder="Имя"
						autoFocus={true}
						center={true}
						onChangeText={setName}
						value={name}
					/>
				</>
			) : null}
			{mode === "signUp" ? (
				<Input
					placeholder="Телефон"
					autoFocus={false}
					center={true}
					onChangeText={setPhone}
					value={phone}
				/>
			) : null}
			<Input
				placeholder={
					mode === "signUp" || mode === "forgot" ? "Email" : "Логин"
				}
				autoFocus={true}
				error={errorLog}
				center={true}
				onChangeText={setLog}
				value={log}
			/>
			{mode === "signIn" && loginPasForgot ? (
				<Text style={appStyles.text}>{loginPasForgot}</Text>
			) : null}

			{mode === "signIn" || mode === "signUp" ? (
				<Input
					placeholder="Пароль"
					center={true}
					error={errorPas}
					onChangeText={setPas}
					value={pas}
				/>
			) : null}
			{mode !== "forgot" ? (
				<CheckBox style={{ margin: 10 }} onChange={onChange}>
					<Text style={[appStyles.text, { marginLeft: 20 }]}>
						Запомнить меня
					</Text>
				</CheckBox>
			) : null}

			{isLoading ? (
				<Loading></Loading>
			) : (
				<TouchableOpacity
					onPress={login}
					// color={Colors.assent}
					style={[
						appStyles.button,
						{ marginBottom: 10, marginTop: 20 },
					]}
				>
					<Text style={appStyles.buttonText}>
						{mode === "forgot" ? "Выслать" : null}
						{mode === "signUp" ? "Регистрация" : null}
						{mode === "signIn" ? "Вход" : null}
					</Text>
				</TouchableOpacity>
			)}
			<View style={[appStyles.hr, { marginTop: 30 }]} />
			<View
				style={{
					minHeight: keyboardHeight,
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						setMode("signIn");
					}}
				>
					<Text
						style={[
							appStyles.text,
							{ marginBottom: 10, marginTop: 10 },
							mode === "signIn"
								? { color: Colors.assent3 }
								: null,
						]}
					>
						Вход
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setMode("signUp");
					}}
				>
					<Text
						style={[
							appStyles.text,
							{ marginBottom: 10, marginTop: 10 },
							mode === "signUp"
								? { color: Colors.assent3 }
								: null,
						]}
					>
						Регистрация
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setMode("forgot");
					}}
				>
					<Text
						style={[
							appStyles.text,
							{ marginBottom: 30, marginTop: 10 },
							mode === "forgot"
								? { color: Colors.assent3 }
								: null,
						]}
					>
						Забили пароль?
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};
