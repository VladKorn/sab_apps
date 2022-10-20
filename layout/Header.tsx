import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../constants/colors";
import {
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	View,
} from "react-native";
import appStyles from "./../components/appStyles";
import CustomHeaderBackImage from "./../components/customHeaderBackImage";
import { AppContext } from "./../components/App/Context";
import { AuthContext } from "./../components/Login/Login";

interface Props {}
const Address = () => {
	const authContext = useContext(AuthContext);
	const address = authContext.user?.address || "test";
	return (
		<View>
			{/* <View style={{}}> */}
			<Text style={{ ..._headerStyles.text, fontSize: 18 }}>
				{address}
			</Text>
			{/* </View> */}
		</View>
	);
};

export const Header = (props) => {
	const appContext = useContext(AppContext);
	const authContext = useContext(AuthContext);
	return (
		<SafeAreaView style={{ ...appStyles.SafeAreaView, paddingTop: 0 }}>
			<View style={_headerStyles.wrap}>
				<TouchableOpacity
					onPress={props.navigation.openDrawer}
					style={_headerStyles.icon}
				>
					<Image
						style={{
							marginRight: "auto",
							marginLeft: 20,
							width: 19,
							height: 22,
						}}
						source={require("./../img/ico-menu7.png")}
					/>
				</TouchableOpacity>
				<Address />
			</View>
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
export const _headerStyles = StyleSheet.create({
	wrap: {
		backgroundColor: "black",
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	text: {
		color: "white",
	},
	icon: {
		position: "absolute",
		left: 0,
	},
});

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
