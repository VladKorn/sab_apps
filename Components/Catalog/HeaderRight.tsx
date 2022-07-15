import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import appStyles from "./../appStyles";
import { useContext } from "react";
import { BasketContext } from "../Basket/BasketContext";

const totalProductsCount = (basket): number => {
	if (!basket) return 0;
	let totalProductsCount = 0;
	Object.keys(basket).map((key) => {
		totalProductsCount = parseInt(basket[key].count) + totalProductsCount;
	});
	return totalProductsCount;
};

const HeaderRight = () => {
	const basketContext = useContext(BasketContext);
	const navigation = useNavigation();
	return (
		<View style={{ flexDirection: "row", marginTop: 17 }}>
			<TouchableOpacity
				onPress={() => {
					// @ts-ignore
					navigation.openDrawer();
				}}
			>
				<Image
					style={{
						width: 20,
						height: 24,
						marginRight: 20,
					}}
					source={require("../../img/ico-menu1.png")}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ width: 40, height: 40, marginRight: 25 }}
				onPress={() => {
					navigation.navigate("Order");
				}}
			>
				<Image
					style={{ width: 30, height: 24 }}
					source={require("../../img/ico-orders.png")}
				/>
				<View style={appStyles.bottonToOrderCount}>
					<Text style={appStyles.bottonToOrderCountText}>
						{/* {navigation.getScreenProps().basket
										? Object.entries(
												navigation.getScreenProps()
													.basket
										  ).length
										: null} */}
						{totalProductsCount(basketContext.basket)}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};
export default HeaderRight;
