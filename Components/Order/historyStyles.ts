import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const styles = StyleSheet.create({
	step: {},
	stepImgWrap: {
		backgroundColor: "white",
		borderColor: "white",
		borderWidth: 2,
		width: 48,
		height: 48,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	steptext: {
		fontFamily: "Neuron",
		fontSize: 14,
		marginTop: 10,
		color: Colors.text,
		textAlign: "center",
	},
	stepLine: {
		height: 2,
		backgroundColor: "white",
		flex: 1,
		marginTop: 22,
	},
	infoItem: {
		flexDirection: "row",
		height: 80,
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1,
	},
	infoItemImgWrap: {
		justifyContent: "center",
		alignItems: "center",
		height: 80,
		width: 50,
		marginRight: 15,
	},
});
