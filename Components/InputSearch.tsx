import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native";
import appStyles from "./appStyles";

interface Props {
	initialText?: string;
	search: (text: string) => void;
}

const InputSearch = (props: Props) => {
	const [text, setText] = useState(props.initialText || "");
	useEffect(() => {
		let timer = setTimeout(() => {
			props.search(text);
		}, 700);
		return () => {
			clearTimeout(timer);
		};
	}, [text]);
	return (
		<View style={styles.cont}>
			<View style={styles.wrap}>
				{/* <Text>
                    {this.state.search}
                    {this.state.searchRes.length}
                </Text> */}
				<TextInput
					style={styles.input}
					placeholderTextColor={appStyles.input.color}
					placeholder="Поиск"
					onChangeText={setText}
					value={text}
				/>
				<TouchableOpacity
					style={styles.button}
					// onPress={this.search}
				>
					<Image
						style={styles.img}
						source={require("../img/ico-search.png")}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default InputSearch;

const styles = StyleSheet.create({
	cont: { alignItems: "center", paddingTop: 25 },
	wrap: {
		maxWidth: 335,
		flexDirection: "row",
		justifyContent: "center",
		position: "relative"
    },
    input:{
        height: 40,
        backgroundColor: "#F1F1F1",
        borderWidth: 0,
        borderRadius: 50,
        maxWidth: 335,
        width: "100%",
        paddingLeft: 25
        // color: appStyles.input.color,
    },
    button:{
        position: "absolute",
        zIndex: 3,
        right: 0,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    img:{
        width: 18, height: 18 
    }
});
