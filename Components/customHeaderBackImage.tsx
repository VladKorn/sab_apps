import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
const screenHeight = Math.round(Dimensions.get("window").height);
const CustomHeaderBackImage: React.FC = () => {
	const source = require("../img/back.png");
	return (
		<Image
			source={source}
			style={{
				height: screenHeight > 600 ? 23.5 : 18,
				width: screenHeight > 600 ? 22.5 : 18,
				marginLeft: 20,
				marginRight: 12,
				marginVertical: 12,
				marginTop: 16,
				resizeMode: "contain",
			}}
		/>
	);
};

export default CustomHeaderBackImage;
