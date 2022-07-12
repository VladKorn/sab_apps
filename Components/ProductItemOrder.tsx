import { useState, useContext } from "react";
import { BasketContext } from "./Basket/BasketContext";
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
import Counter from "./Counter";
import Colors from "../constants/colors";

interface Props {
	id: number;
	img: string;
	name: string;
	price: number;
	initialCount: number;
}

export const ProductItemOrder = (props: Props) => {
	const basketContext = useContext(BasketContext);
	const [count, setCount] = useState(0);

	const deleteProduct = () => {
		basketContext.basketApi({
			action: "setProduct",
			params: {
				productId: props.id,
				count: 0,
			},
		});
	};
	const onChange = (number, type) => {
		// console.log('number, type' ,number, type)
		basketContext.basketApi({
			action: "setProduct",
			params: {
				productId: props.id,
				count: number,
			},
		});
	};
	return (
		<View style={styles.box}>
			<TouchableOpacity
				style={{
					// flex: 1,
					alignItems: "center",
					justifyContent: "center",
					width: 20,
					height: "100%",
					marginRight: 5,
				}}
				onPress={deleteProduct}
			>
				<Image style={{}} source={require("../img/ico-delete.png")} />
			</TouchableOpacity>
			<Image
				style={styles.img}
				source={{ uri: "https://subexpress.ru/" + props.img }}
			/>
			<View
				style={{
					flex: 1,
					minHeight: 80,
					alignItems: "flex-start",
					justifyContent: "flex-start",
					// flexDirection: "row"
					// backgroundColor: "red",
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: "flex-start",
						justifyContent: "flex-start",
						flexDirection: "row",
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
						{props.name}
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						flexGrow: 1,

						alignItems: "flex-end",
						justifyContent: "flex-end",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							color: "#666774",
							fontFamily: "Neuron-Heavy",
							fontSize: 18,
							flexGrow: 1,
						}}
					>
						{props.price} руб.
					</Text>
				</View>
			</View>
			<Counter
				mode="v"
				onChange={onChange}
				InitialValue={props.initialCount}
			/>
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
		paddingBottom: 7,
		paddingLeft: 7,
		paddingRight: 7,
		paddingTop: 7,
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1,
		marginBottom: 5,
	},
	img: {
		width: 80,
		borderRadius: 10,
		height: 80,
		marginRight: 5,
		alignSelf: "center",
	},
	countContainer: {
		alignItems: "center",
		padding: 10,
	},
	countText: {
		color: "#FF00FF",
	},
});
export default ProductItemOrder;
AppRegistry.registerComponent("Subexpress", () => ProductItemOrder);
