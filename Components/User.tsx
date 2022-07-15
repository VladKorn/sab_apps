import { useState, useContext } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import appStyles from "./appStyles";
import Input from "./Input";
import { LoginData } from "../interfaces";
import LoginForm from "./Login/LoginForm";
import { AuthContext } from "./Login/Login";

// static navigationOptions = {
//     headerTitle: "Учетная запись",
// };

export const User = (props) => {
	const authContext = useContext(AuthContext);
	const [company, setCompany] = useState("");
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [log, setLog] = useState("");
	const [pas, setPas] = useState("");

	const submit = () => {
		const userData = {
			userId: authContext.user.id,
			company: company,
			name: name,
			lastName: lastName,
			log: log,
			pas: pas,
		};
		fetch(`https://subexpress.ru/apps_api/?get=userupdate`, {
			method: "post",
			body: JSON.stringify({ userData: userData }),
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log("userupdate res", res);
				if (res.user && res.user.id && res.user.updated) {
					if (log === "" && pas === "") {
						props.screenProps.autoLogin();
						Alert.alert("Изменения внесены");
					} else {
						const loginData: LoginData = {
							log: log || res.user.log,
							pas: pas || res.user.pas,
						};
						// Alert.alert("pas "+ loginData.pas);

						props.screenProps.saveLoginData(
							loginData.log,
							loginData.pas
						);
						props.screenProps.autoLogin();
						Alert.alert("Изменения внесены");
					}
				}
			});
	};

	if (!authContext.user?.id) {
		return (
			// TODO userError
			<LoginForm login={authContext.login} userError={null} />
		);
	}
	return (
		<ScrollView contentContainerStyle={{ flex: 1 }} style={[{ flex: 1 }]}>
			<View
				style={[
					appStyles.paddings,
					{
						paddingTop: 20,
						paddingBottom: 20,
						flex: 1,
						alignItems: "center",
					},
				]}
			>
				<Text style={[appStyles.text, { marginTop: 10 }]}>
					Название компании:
				</Text>
				<Input
					center={true}
					value={company}
					placeholder={authContext.user.company}
					onChangeText={(text) => {
						setCompany(text);
					}}
				/>
				<Text style={[appStyles.text, { marginTop: 10 }]}>Имя:</Text>
				<Input
					center={true}
					value={name}
					placeholder={authContext.user.name}
					onChangeText={(text) => {
						setName(text);
					}}
				/>
				<Text style={[appStyles.text, { marginTop: 10 }]}>
					Фамилия:
				</Text>
				<Input
					center={true}
					value={lastName}
					placeholder={authContext.user.lastName}
					onChangeText={(text) => {
						setLastName(text);
					}}
				/>
				<Text style={[appStyles.text, { marginTop: 10 }]}>
					E-Mail (Логин):
				</Text>
				<Input
					center={true}
					value={log}
					placeholder={authContext.user.log}
					onChangeText={(text) => {
						setLog(text);
					}}
				/>
				<Text style={[appStyles.text, { marginTop: 10 }]}>
					Новый пароль:
				</Text>
				<Input
					center={true}
					placeholder={"Новый пароль"}
					onChangeText={(text) => {
						setPas(text);
					}}
				/>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={() => {
							submit();
						}}
						style={[
							appStyles.button,
							{ margin: 10, minWidth: 120 },
						]}
					>
						<Text style={appStyles.buttonText}>Сохранить</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							props.navigation.goBack();
						}}
						style={[
							appStyles.button,
							{ margin: 10, minWidth: 120 },
						]}
					>
						<Text style={appStyles.buttonText}>Отмена</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						authContext.logout();
					}}
					style={[
						appStyles.button,
						{ margin: 10, marginTop: "auto" },
					]}
				>
					<Text style={appStyles.buttonText}>Выход из аккаунта</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};
export default User;

const styles = StyleSheet.create({});
