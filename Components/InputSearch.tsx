import { useState, useEffect } from "react";
import {
	View,
	Image,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Text,
} from "react-native";
import appStyles from "./appStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "./../constants/colors";
interface Props {
	initialText?: string;
	search: (text: string) => void;
}

const InputSearch = (props: Props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const [text, setText] = useState(props.initialText || "");
	useEffect(() => {
		let timer = setTimeout(() => {
			props.search(text);
		}, 700);
		return () => {
			clearTimeout(timer);
		};
	}, [text]);
	useEffect(() => {
		if (props.initialText === "") {
			setText("");
		}
	}, [props.initialText]);
	const resetfilter = (
		<TouchableOpacity
			style={{
				margin: "auto",
				marginBottom: 20,
				marginTop: 15,
				flexDirection: "row",
				// justifyContent:'center',
				height: "auto",
				padding: 2,
			}}
			onPress={() => {
				navigation.navigate("Catalog", {
					catId: 0,
					innerCatId: 0,
					reset: Math.floor(Math.random() * 100) + 1,
				});
			}}
		>
			<Image
				style={{
					width: 20.91,
					height: 18.98,
					marginRight: 20,
				}}
				source={require("../img/ico-menu-close.png")}
			/>
			<Text>Сбросить фильтр</Text>
		</TouchableOpacity>
	);
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
			{/* TODO */}
			{/* {text || route.params?.catId ? resetfilter : null} */}
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
		position: "relative",
	},
	input: {
		height: 40,
		backgroundColor: "#F1F1F1",
		borderWidth: 1,
		borderColor: colors.gray,
		borderRadius: 50,
		maxWidth: 335,
		width: "100%",
		paddingLeft: 25,
		// color: appStyles.input.color,
	},
	button: {
		position: "absolute",
		zIndex: 3,
		right: 0,
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	img: {
		width: 18,
		height: 18,
	},
});
