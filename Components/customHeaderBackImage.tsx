import React from "react";
import {
	Image,
	StyleSheet
} from "react-native";
export default class customHeaderBackImage extends React.Component<any, any> {
	render() {
		const source = require("../img/back.png");
		return (
			<Image
				source={source}
				style={[styles.customHeaderBackImage, this.props.style]}
			/>
		);
	}
}
const styles = StyleSheet.create({
	customHeaderBackImage: {
		height: 23.5,
		width: 22.5,
		marginLeft: 22,
		marginRight: 12,
		marginVertical: 12,
		resizeMode: "contain"
	},
	customHeaderBackImageAlt: {
		tintColor: "#f00"
	}
});
