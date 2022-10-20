import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../constants/colors";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
console.log({ screenWidth, screenHeight });

const appStyles = StyleSheet.create({
	borderRadius: {
		borderRadius: 17,
	},
	SafeAreaView: {
		// flex: 1,
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	page: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	headerStyle: {
		backgroundColor: "white",
		shadowOpacity: 0,
		// borderBottomWidth: 0,

		// TODO shadowOpacity
		// shadowOpacity: 0,
		// shadowOffset: { height: 0 },

		shadowRadius: 0,
		elevation: 0,

		height: screenHeight > 600 ? 70 : 40,
		marginLeft: 15,
		marginRight: 15,
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
		marginTop: 6,
	},
	paddings: {
		paddingLeft: 15,
		paddingRight: 15,
	},
	text: {
		fontSize: 20,
		fontFamily: "Neuron",
		color: "#666774",
	},
	sectTitle: {
		fontFamily: "Neuron-Heavy",
		fontSize: 22,
		color: Colors.gray,
		// color: '#666774',
		marginTop: 25,
		marginBottom: 5,
	},
	input: {
		borderBottomColor: "#E2E2E2",
		paddingTop: 10,
		paddingBottom: 10,
		width: "100%",
		maxWidth: 230,
		height: 40,
		fontSize: 20,
		fontWeight: "bold",
		color: "#666774",
		marginTop: 5,
		marginBottom: 15,
		borderColor: Colors.assent,
		// borderBottomWidth: 5,
		borderBottomWidth: 3,
	},
	inputFocus: {
		borderBottomColor: Colors.assent,
		borderBottomWidth: 5,
	},
	inputError: {
		borderBottomColor: "red",
	},
	hr: {
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1,
		width: "100%",
		maxWidth: 336,
		marginTop: 15,
		marginBottom: 15,
	},
	button: {
		backgroundColor: Colors.assent,
		height: 60,
		minWidth: 290,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	buttonText: {
		color: "#353539",
		fontSize: 20,
		fontFamily: "Segoe",
	},
	buttonBottom: {
		backgroundColor: Colors.assent,
		color: "white",
		width: "100%",
		height: 57,
		justifyContent: "center",
		alignItems: "center",
	},
	shadow: {
		marginTop: 100,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
		// TODO marginTop err
		// marginTop: 5,
	},
	breadCrumbs: {},
	modalText: {
		fontFamily: "Neuron-Heavy",
		fontSize: 22,
		color: Colors.text,
		textAlign: "center",
		lineHeight: 27,
	},
	modalTextDesc: {
		fontFamily: "Neuron",
		fontSize: 16,
		color: Colors.text,
		textAlign: "center",
		lineHeight: 19,
	},
	modalButton: {
		height: 48,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 110,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: Colors.assent,
		margin: 5,
	},
	modalButtonText: {
		fontSize: 20,
		fontFamily: "Neuron",
		color: Colors.text,
	},
	bottonToOrderCount: {
		backgroundColor: Colors.assent,
		borderRadius: 50,
		// justifyContent: "center",
		alignItems: "center",
		width: 23,
		height: 23,
		position: "absolute",
		top: -11,
		right: -11,
	},
	bottonToOrderCountText: {
		color: "white",
		fontSize: 20,
		fontFamily: "Neuron-Heavy",
		lineHeight: 24,
	},
});

export default appStyles;
