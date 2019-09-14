import React from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import appStyles from './appStyles.js'

function Header(props) {
	return (
		<SafeAreaView style={{...appStyles.SafeAreaView , backgroundColor: 'white'}}>
			<TouchableOpacity onPress={() => {
                this.props.navigation.goBack()
            }}>
				<Text>Back asda sd asasd asd </Text>
			</TouchableOpacity>
			<Text>{props.title}</Text>
		</SafeAreaView>
	);
}
export default Header;
