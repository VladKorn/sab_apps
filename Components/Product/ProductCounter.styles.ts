import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
export const Styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	container_v: {
		flexDirection: "column",
		borderColor: Colors.gray,
		borderRadius: 50,
		borderWidth: 1,
		height: 78,
	},

	text: {
		height: 30,
		width: 30,
		textAlign: "center",
		fontFamily: "Neuron-Heavy",
		fontSize: 18,
		color: "#666774",
	},
	text_v: {
		height: 25,
		width: 30,
		textAlign: "center",
		fontFamily: "Neuron-Heavy",
		fontSize: 18,
		color: "#666774",
	},

	iconText: {
		fontSize: 22,
		marginTop: -3,
	},

	number: {
		minWidth: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	touchable_minus: {
		width: 40,
		height: 40,
		borderRadius: 100,
		// borderWidth: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		borderWidth: 0,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	touchable: {
		width: 40,
		height: 40,
		borderRadius: 100,
		borderColor: "#DCDCDC",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},

	touchable_v: {
		width: 40,
		height: 26,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	touchable_active: {
		width: 40,
		height: 40,
		borderRadius: 100,
		backgroundColor: Colors.assent,
		alignItems: "center",
		justifyContent: "center",
	},
});
