import {} from "react";
import { useNavigation } from "@react-navigation/native";
interface Props {}

import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../constants/colors";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import appStyles from "./../components/appStyles";
import CustomHeaderBackImage from "./../components/customHeaderBackImage";

export const Header = (props: Props) => {
	const navigation = useNavigation();
	return (
		<SafeAreaView
			style={{ ...appStyles.SafeAreaView, backgroundColor: "white" }}
		>
			<TouchableOpacity
				onPress={() => {
					navigation.goBack();
				}}
			>
				<Text>Back asda sd asasd asd </Text>
			</TouchableOpacity>
			<Text>{"props.title"}</Text>
		</SafeAreaView>
	);
};
export default Header;

export const HeaderLeft = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.goBack();
			}}
		>
			<CustomHeaderBackImage />
		</TouchableOpacity>
	);
};

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const height = screenHeight > 600 ? 70 : 40;
export const headerStyles = StyleSheet.create({
	headerStyle: {
		backgroundColor: "white",
		shadowOpacity: 0,
		// borderBottomWidth: 0,

		// TODO shadowOpacity
		// shadowOpacity: 0,
		// shadowOffset: { height: 0 },

		shadowRadius: 0,
		elevation: 0,

		height: height,
		// marginLeft: 15,
		// marginRight: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightgray,
	},
	headerTitle: {
		fontFamily: "Neuron",
		fontSize: screenHeight > 600 ? 24 : 18,
		color: Colors.text,
		textAlign: "left",
		width: "100%",
		flex: 1,
		// marginTop: 4,
		lineHeight: height,
		// display: "flex",
		// alignItems: "center",
		// justifyContent: "center",
		// height: "100%",
		// backgroundColor: "red",
	},
});

export const defaultOptions = {
	headerLeft: HeaderLeft,
	headerStyle: headerStyles.headerStyle,
	headerTitleStyle: headerStyles.headerTitle,
};
