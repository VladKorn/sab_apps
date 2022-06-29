import React from "react";
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
import Colors from "../constants/colors";

import Modals from "./Modal";

import ProductItemOrder from "./ProductItemOrder";
import appStyles from "./appStyles";

interface State {
	priceTotal: number;
	comment: string;
	promo: string;
	modalIsOpen: boolean;
	modalFirstIsOpen: boolean;
}
export default class Order extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			priceTotal: 0,
			comment: "",
			promo: "",
			modalIsOpen: false,
			modalFirstIsOpen: false,
		};
		this.setDate = this.setDate.bind(this);
		this.makeOrder = this.makeOrder.bind(this);
	}

	componentDidMount() {
		this._totalPrice();
		const didBlurSubscription = this.props.navigation.addListener(
			"willBlur",
			(payload) => {
				//   console.debug('willBlur', payload);
				this.setState({
					modalIsOpen: false,
					modalFirstIsOpen: false,
				});
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		this._totalPrice();
		const nav = this.props.navigation;
		if (nav && nav.state && nav.state.params && nav.state.params.action) {
			// console.log(this.props.screenProps.basket)
			if (
				nav.state.params.action === "clear" &&
				Object.keys(this.props.screenProps.basket).length > 0
			) {
				this.props.screenProps.basketApi({ action: "clear" });
			}
		}
	}
	_totalPrice() {
		let price = 0;
		const basket = this.props.screenProps.basket;
		const products = this.props.screenProps.products;
		Object.keys(basket).map((id) => {
			const addToPrice =
				parseInt(products[id].price) * parseInt(basket[id].count);
			if (!isNaN(addToPrice)) {
				price = price + addToPrice;
			}
		});
		// console.log('basket' , basket, this.state.priceTotal , price);
		if (this.state.priceTotal !== price && !isNaN(price)) {
			this.setState({ priceTotal: price });
		}
	}
	setDate(newDate) {
		// this.setState({chosenDate: newDate});
		this.props.navigation.actions.goBack();
	}
	makeOrder() {}
	render() {
		const basket = this.props.screenProps.basket;
		const products = this.props.screenProps.products;
		// console.log("addresses", this.props.screenProps.user.addresses);
		const items =
			Object.entries(basket).length !== 0 &&
			Object.entries(products).length !== 0 ? (
				Object.keys(basket).map((key) => {
					let item = products[key];
					return (
						<ProductItemOrder
							key={item.id}
							id={item.id}
							name={item.name}
							img={item.img}
							price={item.price}
							count={parseInt(basket[item.id].count)}
							basketApi={this.props.screenProps.basketApi}
						/>
					);
				})
			) : (
				<Text style={appStyles.text}>Корзина пуста</Text>
			);

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
					{items}

					<Text style={appStyles.sectTitle}>
						Комментарий к заказу
					</Text>
					<TextInput
						placeholder="Добавить комментарий к заказу"
						style={appStyles.input}
						onChangeText={(comment) =>
							this.setState({ comment: comment })
						}
					/>
					<Text style={appStyles.sectTitle}>Промокод</Text>
					<TextInput
						placeholder="Ввести промокод"
						style={appStyles.input}
						onChangeText={(promo) =>
							this.setState({ promo: promo })
						}
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
								{this.state.priceTotal} руб
							</Text>
						</View>
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
								{this.state.priceTotal < 1500 ? 150 : 0} руб
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
								{this.state.priceTotal < 1500
									? this.state.priceTotal + 150
									: this.state.priceTotal}{" "}
								руб
							</Text>
						</View>
					</View>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						this.props.screenProps.setOrderData({
							comment: this.state.comment,
							promo: this.state.promo,
						});
						this.state.priceTotal < 1000
							? this.setState({ modalFirstIsOpen: true })
							: this.state.priceTotal < 1500
							? this.setState({ modalIsOpen: true })
							: this.props.navigation.navigate("Delivery");
					}}
					style={appStyles.buttonBottom}
				>
					<Text style={{ color: "white", fontSize: 20 }}>
						Перейти к доставке
					</Text>
				</TouchableOpacity>

				<Modals
					height={390}
					isOpen={this.state.modalIsOpen}
					isOpenHendler={(isOpen) => {
						this.setState({ modalIsOpen: isOpen });
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
								this.setState({ modalIsOpen: false });
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
								this.setState({ modalIsOpen: false });
								setTimeout(() => {
									this.props.navigation.navigate("Delivery");
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
					isOpen={this.state.modalFirstIsOpen}
					isOpenHendler={(isOpen) => {
						this.setState({ modalFirstIsOpen: isOpen });
					}}
				>
					<Text style={appStyles.modalText}>
						Ваш заказ менее {"\n"} 1000 рублей
					</Text>
					<View style={{ flexDirection: "column", marginTop: 10 }}>
						<TouchableOpacity
							onPress={() => {
								this.setState({ modalFirstIsOpen: false });
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
	}
}
