import React, { Component } from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import appStyles from "./appStyles.js";
import Input from "./Input";
import { LoginData } from "../interfaces";

export default class User extends Component<any, any> {
	static navigationOptions = {
		headerTitle: "Учетная запись"
	};
	constructor(props) {
		super(props);
		this.state = {
			company: "",
			name: "",
			lastName: "",
			log: "",
			pas: ""
		};
		this.submit = this.submit.bind(this);
	}
	componentDidMount() {
		console.log("aruser", this.props.screenProps.user);
	}
	submit() {
		const userData = {
			userId: this.props.screenProps.user.id,
			company: this.state.company,
			name: this.state.name,
			lastName: this.state.lastName,
			log: this.state.log,
			pas: this.state.pas
		};
		fetch(`https://subexpress.ru/apps_api/?get=userupdate`, {
			method: "post",
			body: JSON.stringify({ userData: userData })
		})
			.then(res => res.json())
			.then(res => {
				console.log("userupdate res", res);
				if (res.user && res.user.id && res.user.updated) {
					if (this.state.log === "" && this.state.pas === "") {
                        this.props.screenProps.autoLogin();
                        Alert.alert("Изменения внесены");
					} else {
                        const loginData: LoginData = {
                            log: this.state.log || res.user.log,
							pas: this.state.pas || res.user.pas
                        };
                        // Alert.alert("pas "+ loginData.pas);

                        this.props.screenProps.saveLoginData(loginData.log , loginData.pas);
						this.props.screenProps.autoLogin();
                        Alert.alert("Изменения внесены");
					} 
						
					
				}
			});
	}

	render() {
		return (
			<ScrollView
				contentContainerStyle={{ flex: 1 }}
				style={[appStyles.ScrollView, { flex: 1 }]}
			>
				<View
					style={[
						appStyles.paddings,
						{
							paddingTop: 20,
							paddingBottom: 20,
							flex: 1,
							alignItems: "center"
						}
					]}
				>
					<Text style={[appStyles.text, { marginTop: 10 }]}>
						Название компании:
					</Text>
					<Input
						center={true}
						value={this.state.company}
						placeholder={this.props.screenProps.user.company}
						onChangeText={text => {
							this.setState({ company: text });
						}}
					/>
					<Text style={[appStyles.text, { marginTop: 10 }]}>
						Имя:
					</Text>
					<Input
						center={true}
						value={this.state.name}
						placeholder={this.props.screenProps.user.name}
						onChangeText={text => {
							this.setState({ name: text });
						}}
					/>
					<Text style={[appStyles.text, { marginTop: 10 }]}>
						Фамилия:
					</Text>
					<Input
						center={true}
						value={this.state.lastName}
						placeholder={this.props.screenProps.user.lastName}
						onChangeText={text => {
							this.setState({ lastName: text });
						}}
					/>
					<Text style={[appStyles.text, { marginTop: 10 }]}>
						E-Mail (Логин):
					</Text>
					<Input
						center={true}
						value={this.state.log}
						placeholder={this.props.screenProps.user.log}
						onChangeText={text => {
							this.setState({ log: text });
						}}
					/>
					<Text style={[appStyles.text, { marginTop: 10 }]}>
						Новый пароль:
					</Text>
					<Input
						center={true}
						placeholder={"Новый пароль"}
						onChangeText={text => {
							this.setState({ pas: text });
						}}
					/>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							onPress={() => {
								this.submit();
							}}
							style={[
								appStyles.button,
								{ margin: 10, minWidth: 120 }
							]}
						>
							<Text style={appStyles.buttonText}>Сохранить</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.goBack();
							}}
							style={[
								appStyles.button,
								{ margin: 10, minWidth: 120 }
							]}
						>
							<Text style={appStyles.buttonText}>Отмена</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						onPress={() => {
							this.props.screenProps.logout();
						}}
						style={[
							appStyles.button,
							{ margin: 10, marginTop: "auto" }
						]}
					>
						<Text style={appStyles.buttonText}>
							Выход из аккаунта
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({});
