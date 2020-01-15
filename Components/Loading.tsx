import React from "react";
import Colors from "../constants/Colors.js";

import { ActivityIndicator, View, StyleSheet } from "react-native";


export default class Loading extends React.Component<any, any> {
	constructor(props) {
		super(props);
	}

	render() {
		// return null;
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={Colors.assent4} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		//   flex: 1,
		justifyContent: "center",
		alignItems: "center",
		//   backgroundColor: '#fff',
		paddingVertical: 20
	},

	circles: {
		flexDirection: "row",
		alignItems: "center"
	},
	progress: {
		margin: 10
	}
});
