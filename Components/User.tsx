import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import appStyles from "./appStyles.js";
// import Input from "./Input";

export default class User extends Component<any , any> {
	static navigationOptions = {
		headerTitle: "Учетная запись"
	};
	render() {
		return (
			<View style={appStyles.paddings}>
				<Text style={appStyles.sectTitle}> {this.props.screenProps.user.company} </Text>
				<Text style={appStyles.text}> {this.props.screenProps.user.name} </Text>
				<Text style={appStyles.text}> {this.props.screenProps.user.lastName} </Text>

				<TouchableOpacity onPress={() => {
                    this.props.screenProps.logout()
                }} style={[appStyles.button , {margin: 10}]}>
					<Text style={appStyles.buttonText}> Выход </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({});
