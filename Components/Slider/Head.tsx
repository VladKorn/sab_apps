import { useState, useEffect, useContext, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import appStyles from "./../appStyles";
import { AppContext } from "./../App/Context";
import { useRoute, useNavigation } from "@react-navigation/native";

interface Props {
	slidesLength: number;
	productIndex: number;
	catName: string;
	currentProductId: number;
	onClose: () => void;
}
export const Head = (props: Props) => {
	const appContext = useContext(AppContext);
	const navigation = useNavigation();

	const [isFavorite, setIsFavorite] = useState(
		appContext.favorite.includes(props.currentProductId)
	);
	const setFvorite = () => {
		setIsFavorite(!isFavorite);
	};
	useEffect(() => {
		appContext.addToFavorite(props.currentProductId);
	}, [isFavorite]);

	const close = () => {
		props.onClose();
		navigation.goBack();
	};

	return (
		<View style={styles.topBar}>
			<TouchableOpacity onPress={close}>
				<Image
					source={require("./../../img/ico-close.png")}
					style={{
						width: 20.91,
						height: 18.98,
						marginRight: 30,
					}}
				/>
			</TouchableOpacity>
			<Text style={{ fontFamily: "Neuron", fontSize: 24 }}>
				{props.catName} {props.productIndex + 1} / {props.slidesLength}{" "}
				{/* {props.currentProductId} */}
			</Text>
			<TouchableOpacity
				onPress={setFvorite}
				style={{
					alignItems: "center",
					justifyContent: "center",
					width: 30,
					height: 30,
					marginLeft: "auto",
				}}
			>
				<Image
					style={{ width: 20, height: 17.67 }}
					source={
						isFavorite
							? require("./../../img/favorite-active.png")
							: require("./../../img/favorite.png")
					}
				/>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	topBar: {
		// flex: 1,
		// justifyContent: 'center',
		position: "absolute",
		width: "100%",
		zIndex: 3,
		top: 15,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
		alignItems: "center",
		// justifyContent: 'center',
		height: 70,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#E2E2E2",
	},
});
