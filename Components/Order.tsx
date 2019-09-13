import React from "react";
import {
	View,
	ScrollView,
	Text,
	Animated,
	TextInput,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	Button
} from "react-native";
import Colors from "../constants/Colors.js";

import Modalt from "./Modal";

import ProductItemOrder from "./ProductItemOrder";
import appStyles from "./appStyles";

interface State {
	priceTotal: number;
	address: string;
	date: string;
	comment: string;
	promo: string;
	modalIsOpen: boolean;
	// data: any;
}
export default class Order extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			priceTotal: 0,
			address: "",
			date: "2019-08-11",
			comment: "",
			promo: "",
			// modalIsOpen: false,
			modalIsOpen: true
		};
		this.setDate = this.setDate.bind(this);
		this.makeOrder = this.makeOrder.bind(this);
	}
	static navigationOptions = {
		title: "Оформление заказа"
	};
	componentDidMount() {
		this.props.screenProps.getCatalog();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.screenProps !== this.props.screenProps) {
			let price = 0;
			const basket = this.props.screenProps.basket;
			const products = this.props.screenProps.products;
			Object.keys(basket).map(id => {
				price =
					price +
					parseInt(products[id].price) * parseInt(basket[id].count);
			});
			this.setState({ priceTotal: price });
		}
		if (
			this.state.address === "" &&
			this.props.screenProps.user.addresses
		) {
			this.setState({
				address: this.props.screenProps.user.addresses[0].address
			});
		}
	}

	setDate(newDate) {
		// this.setState({chosenDate: newDate});
		this.props.navigation.actions.goBack();
	}
	makeOrder() {
		// this.props.screenProps.makeOrder({

		// });
		// ${this.selectedYear}-${formatnum(getmnum(this.selectedMonth))}-${formatnum(this.selectedDay)} 00:00:00

		let data: any = {};
		data.fUserId = "1";
		data.userId = "1";
		data.siteName = "s1";
		data.comment = this.state.comment;
		data.address = this.state.address;
		data.deliveryDate = this.state.date;

		data.products = this.props.screenProps.basket;

		// const orderButton = document.querySelector(`.jsOrderButton`);
		// if(orderButton){orderButton.disabled = true;}

		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify(data));
		// console.log("order sended-", data);
		fetch(`https://subexpress.ru/apps_api/order.php`, {
			method: "POST",
			headers,
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				// console.log("order fetch res-", res);
				if (res.sucsess) {
					alert("ok");
					// if(Swal){
					//     Swal.fire({title: 'Спасибо! Ваш заказ принят. ', text:'' , type: 'success'});
					// }
				}
			});
	}
	render() {
		const basket = this.props.screenProps.basket;
		const products = this.props.screenProps.products;
		// console.log("addresses", this.props.screenProps.user.addresses);
		const items =
			Object.entries(basket).length !== 0 &&
			Object.entries(products).length !== 0
				? Object.keys(basket).map(key => {
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
				: [];

		return (
			<SafeAreaView style={appStyles.page}>
				<ScrollView
					style={{
						paddingVertical: 0,
						paddingLeft: 15,
						// paddingTop: 25,
						flex: 1,
						paddingRight: 15
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
						onChangeText={comment =>
							this.setState({ comment: comment })
						}
					/>
					<Text style={appStyles.sectTitle}>Промокод</Text>
					<TextInput
						placeholder="Ввести промокод"
						style={appStyles.input}
						onChangeText={promo => this.setState({ promo: promo })}
					/>
					<Text style={appStyles.sectTitle}>Сумма для оплаты</Text>
					<View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<Text>Сумма заказа</Text>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									marginLeft: "auto",
									color: Colors.gray
								}}
							>
								{this.state.priceTotal} руб
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<Text>Доставка </Text>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									marginLeft: "auto",
									color: Colors.gray
								}}
							>
								{this.state.priceTotal < 1500 ? 150 : 0} руб
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<Text>Общая сумма</Text>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									marginLeft: "auto",
									color: Colors.gray
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
						this.setState({ modalIsOpen: true });
						// this.props.navigation.navigate('Delivery')
					}}
					style={appStyles.buttonBottom}
				>
					<Text style={{ color: "white", fontSize: 20 }}>
						Перейти к доставке
					</Text>
				</TouchableOpacity>

				<Modalt
					// height={310}
					isOpen={this.state.modalIsOpen}
					isOpenHendler={isOpen => {
						this.setState({ modalIsOpen: isOpen });
					}}
				>
					<Text style={appStyles.modalText}>
						Даю согласие{"\n"}на обработку заказа{"\n"}на следующий
						{"\n"}рабочий день
					</Text>
				</Modalt>
			</SafeAreaView>
		);
	}
}
