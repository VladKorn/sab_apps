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

import appStyles from "./appStyles";
import { ProductsList } from "./Order/ProductsList";
import { AuthContext } from "./Login/Login";

export const Order = (props) => {
	const basketContext = useContext(BasketContext);
	const authContext = useContext(AuthContext);
	const [priceTotal, setPriceTotal] = useState(0);
	const [basePrice, setBasePrice] = useState(0);
	const [comment, setComment] = useState("");
	const [promo, setPromo] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalFirstIsOpen, setModalFirstIsOpen] = useState(false);

	useEffect(() => {
		getTotalPrice();
		const didBlurSubscription = props.navigation.addListener(
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
	}, [basketContext.basket]);

	useEffect(() => {
		getTotalPrice();
		// getTotalPrice();

		const nav = props.navigation;
		if (nav && nav.state && nav.state.params && nav.state.params.action) {
			// console.log(props.screenProps.basket)
			if (
				nav.state.params.action === "clear" &&
				Object.keys(basketContext.basket).length > 0
			) {
				basketContext.basketApi({ action: "clear" });
			}
		}
	});

	const getTotalPrice = async () => {
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
		// console.log("getTotalPrice res", res);
	};

	const setDate = (newDate) => {
		// this.setState({chosenDate: newDate});
		props.navigation.actions.goBack();
	};

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
				<ProductsList products={props.screenProps.products} />

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
							{priceTotal.toFixed(2)} руб
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
								{(basePrice - priceTotal).toFixed(2)} руб
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
							{priceTotal < 1500 ? 150 : 0} руб
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
							{priceTotal < 1500
								? (priceTotal + 150).toFixed(2)
								: priceTotal.toFixed(2)}{" "}
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
						: props.navigation.navigate("Delivery");
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
								props.navigation.navigate("Delivery");
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
export default Order;
