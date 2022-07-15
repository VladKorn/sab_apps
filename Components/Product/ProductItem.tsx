import { useState, useEffect, useContext } from "react";
// import { BasketContext } from "./Basket/BasketContext";
import {
	View,
	Text,
	Button,
	Image,
	AppRegistry,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
} from "react-native";
import ProductCounter from "./ProductCounter";
import Colors from "../../constants/colors";
import Highlighter from "react-native-highlight-words";
import { useNavigation } from "@react-navigation/native";

interface Props {
	isFavorite: boolean;
	addToFavorite: (x: number) => void;
	id: number;
	searchWords: any;
	imgSmall: string;
	img: string;
	name: string;
	price: any;
}

export const ProductItem = (props: Props) => {
	// console.log("ProductItem props", props);
	const navigation = useNavigation();
	// const getCount = () => {
	// 	const item = props.basket[props.id];
	// 	if (item) {
	// 		return parseInt(item.count);
	// 	}
	// 	return 0;
	// };
	// const [count, setCount] = useState(getCount());
	const [isFavorite, setIsFavorite] = useState(props.isFavorite);

	const addToFavorite = () => {
		setIsFavorite(!isFavorite);
		props.addToFavorite(parseInt(props.id + ""));
	};
	return (
		<View style={styles.box}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("CategorySlider", {
						id: props.id,
						searchWords: props.searchWords,
					});
				}}
			>
				<View style={styles.imgWrap}>
					<Image
						style={styles.img}
						source={{
							uri: "https://subexpress.ru/" + props.imgSmall,
							cache: "force-cache",
						}}
					/>
				</View>
			</TouchableOpacity>
			<View
				style={{
					flex: 1,
					alignItems: "flex-start",
					justifyContent: "flex-start",
					// flexDirection: "row"
				}}
			>
				<View
					style={{
						flex: 1,
						width: "100%",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						flexDirection: "row",
						// backgroundColor: "blue"
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("CategorySlider", {
								id: props.id,
								searchWords: props.searchWords,
							});
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontFamily: "Neuron-Bold",
								color: "#666774",
								maxWidth: 150,
							}}
						>
							<Highlighter
								highlightStyle={{
									backgroundColor: "#DDDDDD",
									color: "black",
								}}
								searchWords={props.searchWords || []}
								textToHighlight={props.name
									.replace("&quot;", '"')
									.replace("&quot;", '"')}
							/>
						</Text>
					</TouchableOpacity>
					<TouchableHighlight
						onPress={addToFavorite}
						underlayColor="white"
						style={{
							alignSelf: "flex-start",
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
					</TouchableHighlight>
				</View>
				<View
					style={{
						flex: 1,
						flexGrow: 1,
						// backgroundColor: "red",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							color: Colors.assent,
							fontFamily: "Neuron-Bold",
							fontSize: 18,
							flexGrow: 1,
						}}
					>
						{props.price} руб.
					</Text>
					<View style={{ marginTop: -10 }}>
						<ProductCounter id={props.id} />
						{/* <Counter
								onChange={this.onChange}
								InitialValue={this.state.count}
							/> */}
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "row",
		backgroundColor: "#ffffff",
		// marginLeft: 55,
		paddingBottom: 15,
		paddingTop: 15,
		marginRight: 15,
		paddingRight: 10,
		marginLeft: 15,

		// width: '100%',

		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
		marginTop: 5,
	},
	img: {
		width: 100,
		borderRadius: 10,
		height: 100,
	},
	imgWrap: {
		backgroundColor: Colors.lightgray,
		width: 100,
		borderRadius: 10,
		height: 100,
		// marginLeft: -40,
		marginLeft: 5,
		marginTop: -10,
		marginBottom: -10,
		marginRight: 15,
	},
	countContainer: {
		alignItems: "center",
		padding: 10,
		// marginRight: 10
	},
	countText: {
		color: "#FF00FF",
	},
});
export default ProductItem;

AppRegistry.registerComponent("Subexpress", () => ProductItem);
