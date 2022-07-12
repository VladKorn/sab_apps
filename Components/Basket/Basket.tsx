import { useState, useEffect, useContext, useRef } from "react";
import { View, Image, Text, TouchableOpacity, Animated } from "react-native";
import Colors from "../../constants/colors";
import { BasketContext } from "./BasketContext";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../App/Context";

// const Dimensions = require("Dimensions");
// const { width, height } = Dimensions.get("window");
const getTotalProductsCount = (basket): number => {
	let totalProductsCount = 0;
	Object.keys(basket).map((key) => {
		totalProductsCount = parseInt(basket[key].count) + totalProductsCount;
	});
	return totalProductsCount;
};

const Basket = () => {
	const basketContext = useContext(BasketContext);
	const appContext = useContext(AppContext);
	const navigation = useNavigation();

	const [isVisible, setIsVisible] = useState(false);
	const [totalProductsCount, setTotalProductsCount] = useState(
		getTotalProductsCount(basketContext.basket)
	);
	// const [translateY , setTranslateY] = useState(new Animated.Value(100))
	const translateY = useRef(new Animated.Value(100)).current;

	useEffect(() => {
		setTotalProductsCount(getTotalProductsCount(basketContext.basket));
		setIsVisible(true);

		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [basketContext]);
	useEffect(() => {
		isVisible ? _show() : _hide();
	}, [isVisible]);

	const _hide = () => {
		Animated.timing(translateY, {
			duration: 300,
			toValue: 100,
			useNativeDriver: true,
		}).start();
	};
	const _show = () => {
		Animated.timing(translateY, {
			duration: 300,
			toValue: 0,
			useNativeDriver: true,
		}).start();
	};
	if (Object.keys(appContext.products).length === 0) {
		return null;
	}

	let price = 0;
	Object.keys(basketContext.basket).map((key) => {
		price =
			parseInt(appContext.products[key].price) *
				basketContext.basket[key].count +
			price;
	});

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					zIndex: 3,
					// top: height,
					left: 0,
					right: 0,
					bottom: 0,
					top: "auto",
				},
				{ transform: [{ translateY: translateY }] },
			]}
		>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("Order");
				}}
				style={{
					backgroundColor: Colors.assent,
					height: 55,
					alignItems: "center",
					justifyContent: "flex-start",
					paddingLeft: 50,
					paddingRight: 50,
					flexDirection: "row",
				}}
			>
				<Image
					style={{
						width: 27,
						height: 21,
						// backgroundColor: 'red'

						marginBottom: 5,
						// marginTop: 10
					}}
					source={require("../../img/ico-basket2.png")}
				/>
				<Text
					style={{
						fontFamily: "Neuron-Heavy",
						fontSize: 26,
						color: "white",
						marginRight: "auto",
						marginLeft: 15,
						// backgroundColor: 'red',
						lineHeight: 26,
					}}
				>
					{totalProductsCount} шт.
				</Text>
				<Text
					style={{
						color: "white",
						fontFamily: "Neuron",
						fontSize: 20,
					}}
				>
					{" "}
					{price} руб.
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};
export default Basket;
