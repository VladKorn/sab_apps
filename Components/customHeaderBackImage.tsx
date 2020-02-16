import React from "react";
import {
	Image,
	StyleSheet
} from "react-native";

const customHeaderBackImage: React.FC  = ()=>{
		const source = require("../img/back.png");
		return (
			<Image
				source={source}
				style={{
                    height: 23.5,
                    width: 22.5,
                    marginLeft: 20,
                    marginRight: 12,
                    marginVertical: 12,
                    marginTop: 16,
                    resizeMode: "contain",

                }}
			/>
		);
}


export default customHeaderBackImage;