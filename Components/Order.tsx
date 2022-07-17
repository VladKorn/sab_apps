import { useState, useEffect, useContext } from "react";
import {
	View,
	ScrollView,
	Text,
	Animated,
	TextInput,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { BasketContext } from "./Basket/BasketContext";
import Colors from "../constants/colors";

import Modals from "./Modal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import appStyles from "./appStyles";
import { ProductsList } from "./Order/ProductsList";
import { AuthContext } from "./Login/Login";
import { AppContext } from "./App/Context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Delivery } from "./Delivery";
import { defaultOptions } from "./../layout/Header";
import { Loading } from "./Loading";
interface Props {}
export const Order = (props: Props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const basketContext = useContext(BasketContext);
	const authContext = useContext(AuthContext);
	const appContext = useContext(AppContext);
	const [priceTotal, setPriceTotal] = useState(0);
	const [basePrice, setBasePrice] = useState(0);
	const [comment, setComment] = useState("");
	const [promo, setPromo] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalFirstIsOpen, setModalFirstIsOpen] = useState(false);
	const [priceIsLoading, setPriceIsLoading] = useState(false);

	useEffect(() => {
		getTotalPrice();
		const didBlurSubscription = navigation.addListener(
			"willBlur",
			(payload) => {
				//   console.debug('willBlur', payload);

				setModalIsOpen(false);
				setModalFirstIsOpen(false);
			}
		);
	}, []);
	// componentDidUpdate
	useEffect(() => {
		getTotalPrice();
	}, [basketContext.basket, authContext]);
	useEffect(() => {
		// getTotalPrice();
		// getTotalPrice();

		if (route?.params?.action) {
			// console.log(props.screenProps.basket)
			if (
				route.params.action === "clear" &&
				Object.keys(basketContext.basket).length > 0
			) {
				basketContext.basketApi({ action: "clear" });
			}
		}
	});

	const getTotalPrice = async () => {
		setPriceIsLoading(true);
		let data: any = {};
		data.products = basketContext.basket;
		data.userId = authContext.user.id;

		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify(data));

		const res = await fetch(`https://subexpress.ru/basket_api/index.php`, {
			method: "POST",
			headers,
			body: formData,
		}).then((res) => res.json());
		// console.log("getTotalPrice", res);
		if (res.price && priceTotal !== res.price && !isNaN(res.price)) {
			setPriceTotal(res.price);
		}
		if (
			res.basePrice &&
			basePrice !== res.basePrice &&
			!isNaN(res.basePrice)
		) {
			setBasePrice(res.basePrice);
		}
		setPriceIsLoading(false);
		// console.log("getTotalPrice res", res);
	};

	const setDate = (newDate) => {
		// this.setState({chosenDate: newDate});
		navigation.goBack();
	};
	const basketEmpty = !(Object.entries(basketContext.basket).length > 0);
	if (basketEmpty) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={appStyles.text}>Корзина пуста</Text>
				<View style={{ marginTop: 20 }}>
					<TouchableOpacity
						style={appStyles.button}
						onPress={() => {
							navigation.navigate("Catalog");
						}}
					>
						<Text style={appStyles.buttonText}>
							Посмотреть все товары
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView style={appStyles.page}>
			<ScrollView
				style={{
					paddingVertical: 0,
					paddingLeft: 15,
					// paddingTop: 25,
					flex: 1,
					paddingRight: 15,
					// marginTop: 35,
				}}
			>
				<Text style={appStyles.sectTitle}>Ваш заказ</Text>
				<ProductsList products={appContext.products} />

				<Text style={appStyles.sectTitle}>Комментарий к заказу</Text>
				<TextInput
					placeholder="Добавить комментарий к заказу"
					style={appStyles.input}
					onChangeText={(comment) => setComment(comment)}
				/>
				<Text style={appStyles.sectTitle}>Промокод</Text>
				<TextInput
					placeholder="Ввести промокод"
					style={appStyles.input}
					onChangeText={(promo) => setPromo(promo)}
				/>
				<Text style={appStyles.sectTitle}>Сумма для оплаты</Text>
				<View style={{ paddingBottom: 30 }}>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text>Сумма заказа</Text>
						<Text
							style={{
								fontFamily: "Neuron-Heavy",
								marginLeft: "auto",
								color: Colors.gray,
							}}
						>
							{priceIsLoading ? (
								<Loading size={10} />
							) : (
								priceTotal.toFixed(2)
							)}{" "}
							руб
						</Text>
					</View>
					{basePrice !== priceTotal && (
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text>Скидка</Text>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									marginLeft: "auto",
									color: Colors.gray,
								}}
							>
								{/* TODO toFixed */}
								{priceIsLoading ? (
									<Loading size={10} />
								) : (
									(basePrice - priceTotal).toFixed(0)
								)}{" "}
								руб
							</Text>
						</View>
					)}
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text>Доставка </Text>
						<Text
							style={{
								fontFamily: "Neuron-Heavy",
								marginLeft: "auto",
								color: Colors.gray,
							}}
						>
							{priceIsLoading ? (
								<Loading size={10} />
							) : priceTotal < 1500 ? (
								150
							) : (
								0
							)}{" "}
							руб
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text>Общая сумма</Text>
						<Text
							style={{
								fontFamily: "Neuron-Heavy",
								marginLeft: "auto",
								color: Colors.gray,
							}}
						>
							{priceIsLoading ? (
								<Loading size={10} />
							) : priceTotal < 1500 ? (
								(priceTotal + 150).toFixed(2)
							) : (
								priceTotal.toFixed(2)
							)}{" "}
							руб
						</Text>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					basketContext.setOrderData({
						comment: comment,
						promo: promo,
					});
					priceTotal < 1000
						? setModalFirstIsOpen(true)
						: priceTotal < 1500
						? setModalIsOpen(true)
						: navigation.navigate("Delivery");
				}}
				style={appStyles.buttonBottom}
			>
				<Text style={{ color: "white", fontSize: 20 }}>
					Перейти к доставке
				</Text>
			</TouchableOpacity>

			<Modals
				height={390}
				isOpen={modalIsOpen}
				isOpenHendler={(isOpen) => {
					setModalIsOpen(isOpen);
				}}
			>
				<Text style={appStyles.modalText}>
					Ваш заказ менее {"\n"} 1500 рублей
				</Text>
				<Text style={appStyles.modalTextDesc}>
					Вы можете добавить позиции {"\n"}до нужной суммы или
					оформить заказ {"\n"}с доставкой 150 рублей
				</Text>
				<View style={{ flexDirection: "column" }}>
					<TouchableOpacity
						onPress={() => {
							setModalIsOpen(false);
						}}
						style={[
							appStyles.modalButton,
							{ backgroundColor: "white" },
						]}
					>
						<Text style={appStyles.modalButtonText}>
							Продолжить покупки
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setModalIsOpen(false);
							setTimeout(() => {
								navigation.navigate("Delivery");
							}, 500);
						}}
						style={appStyles.modalButton}
					>
						<Text
							style={[
								appStyles.modalButtonText,
								{ color: "white" },
							]}
						>
							Добавить доставку
						</Text>
					</TouchableOpacity>
				</View>
			</Modals>
			{/*  */}
			<Modals
				height={250}
				isOpen={modalFirstIsOpen}
				isOpenHendler={(isOpen) => {
					setModalFirstIsOpen(isOpen);
				}}
			>
				<Text style={appStyles.modalText}>
					Ваш заказ менее {"\n"} 1000 рублей
				</Text>
				<View style={{ flexDirection: "column", marginTop: 10 }}>
					<TouchableOpacity
						onPress={() => {
							setModalFirstIsOpen(false);
						}}
						style={appStyles.modalButton}
					>
						<Text
							style={[
								appStyles.modalButtonText,
								{ color: "white" },
							]}
						>
							Ок
						</Text>
					</TouchableOpacity>
				</View>
			</Modals>
		</SafeAreaView>
	);
};
const Stack = createNativeStackNavigator();
export const OrderNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				...defaultOptions,
			}}
		>
			<Stack.Screen
				name="OrderList"
				options={{ headerTitle: "Оформление заказа" }}
				component={Order}
			/>
			<Stack.Screen
				name="Delivery"
				component={Delivery}
				options={{ headerTitle: "Оформление заказа" }}
			/>
		</Stack.Navigator>
	);
};
