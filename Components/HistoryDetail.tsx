import React from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Linking
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import { phone } from "../constants/data.js";

import { tsBasketApi } from "../interfaces";

interface State {
	navigation: any;
	data: navigationProps;
}
interface navigationProps {
	canceled: string;
	status: StatusTypes;
	id: number;
	payed: string;
	date: string;
	desc: string;

	price: number;
	products: any;
	address: string;
}
type StatusTypes = "N" | "P" | "F";
export default class HistoryDetail extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			navigation: {},
			data: null
		};
	}
	static navigationOptions = {
		header: null
	};

	_repeatOrder() {
		const pageData = this.props.navigation.state.params.pageData;
		console.log("pageData", pageData.products);
		let products = {};
		pageData.products.map(item => {
			typeof item === 'object' && item.id ? products[item['id']] = { count: item.count }:null;
		});
		console.log("products", products);

		const data: tsBasketApi = {
			action: "setBasket",
			params: {
				products: products
			}
		};
		pageData.basketApi(data);
		setTimeout(() => {
			this.props.navigation.navigate("Order");
		}, 500);

		// console.log('basketApi' , pageData.basketApi);
	}
	render() {
		const props: navigationProps = this.props.navigation.state.params
			.pageData;
		// console.log("props", props);
		return (
			<SafeAreaView style={{ ...appStyles.SafeAreaView }}>
				<ScrollView>
					<View
						style={{
							backgroundColor: Colors.lightgray,
							...appStyles.paddings,
							paddingTop: 20,
							paddingBottom: 25
						}}
					>
						<TouchableOpacity
                            style={{paddingLeft: 20}}
							onPress={() => {
								this.props.navigation.goBack();
							}}
						>
							<Image
								style={{
									width: 20.91,
									height: 18.98,
									marginRight: 30
								}}
								source={require("../img/ico-close.png")}
							/>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<Text style={appStyles.sectTitle}>
								Заказ №: {props.id}
							</Text>
							<View
								style={{
									backgroundColor:
										props.canceled === "Y"
											? "#B8B8B8"
											: props.status === "N"
											? Colors.assent
											: props.status === "P"
											? Colors.assent3
											: props.status === "F"
											? Colors.assent4
											: Colors.assent3,
									height: 17,
									marginLeft: "auto",
									justifyContent: "center",
									alignItems: "center",
									paddingLeft: 5,
									paddingRight: 5,
									borderRadius: 5,
									marginTop: 15
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Neuron-Heavy",
										fontSize: 14,
										letterSpacing: 1
									}}
								>
									{props.status === "N" &&
									props.canceled === "N"
										? "ПРИНЯТ"
										: null}
									{props.status === "P" &&
									props.canceled === "N"
										? "ГОТОВИМ"
										: null}
									{props.status === "F" &&
									props.canceled === "N"
										? "ВЫПОЛНЕН"
										: null}
									{props.canceled === "Y" ? "ОТМЕНЕН" : null}
								</Text>
							</View>
						</View>
						<Text
							style={{
								textAlign: "center",
								marginTop: 30,
								marginBottom: 15
							}}
						>
							Предварительное время ожидания заказа
						</Text>
						<View
							style={{
								flexDirection: "row",
								maxWidth: 265,
								width: "100%",
								marginLeft: "auto",
								marginRight: "auto"
							}}
						>
							<View style={styles.step}>
								<View
									style={[
										styles.stepImgWrap,
										props.status === "N" ||
										props.status === "P" ||
										props.status === "F"
											? {
													backgroundColor:
														props.status === "P" ||
														props.status === "F"
															? Colors.assent
															: "white",
													borderColor: Colors.assent
											  }
											: null
									]}
								>
									<Image
										style={{ width: 20.82, height: 20.82 }}
										source={require("../img/ico-steps2.png")}
									/>
								</View>
								<Text
									style={[
										styles.steptext,
										props.status === "N"
											? { fontFamily: "Neuron-Heavy" }
											: null
									]}
								>
									Принят
								</Text>
							</View>
							<View
								style={[
									styles.stepLine,
									props.status === "P" || props.status === "F"
										? { backgroundColor: Colors.assent }
										: null
								]}
							/>
							<View style={styles.step}>
								<View
									style={[
										styles.stepImgWrap,
										props.status === "P" ||
										props.status === "F"
											? {
													backgroundColor:
														props.status === "F"
															? Colors.assent
															: "white",
													borderColor: Colors.assent
											  }
											: null
									]}
								>
									<Image
										style={{ width: 20.82, height: 20.82 }}
										source={require("../img/ico-steps2.png")}
									/>
								</View>
								<Text
									style={[
										styles.steptext,
										props.status === "P"
											? { fontFamily: "Neuron-Heavy" }
											: null
									]}
								>
									Готовим
								</Text>
							</View>
							<View
								style={[
									styles.stepLine,
									props.status === "F"
										? { backgroundColor: Colors.assent }
										: null
								]}
							/>
							<View style={styles.step}>
								<View
									style={[
										styles.stepImgWrap,
										props.status === "F"
											? {
													backgroundColor:
														Colors.assent,
													borderColor: Colors.assent
											  }
											: null
									]}
								>
									<Image
										style={{ width: 20.82, height: 20.82 }}
										source={require("../img/ico-steps3.png")}
									/>
								</View>
								<Text style={styles.steptext}>В пути</Text>
							</View>
							<View
								style={[
									styles.stepLine,
									props.status === "F"
										? { backgroundColor: Colors.assent }
										: null
								]}
							/>
							<View style={styles.step}>
								<View
									style={[
										styles.stepImgWrap,
										props.status === "F"
											? {
													borderColor: Colors.assent
											  }
											: null
									]}
								>
									<Image
										style={{ width: 20.82, height: 20.82 }}
										source={require("../img/ico-steps4.png")}
									/>
								</View>

								<Text
									style={[
										styles.steptext,
										props.status === "F"
											? { fontFamily: "Neuron-Heavy" }
											: null
									]}
								>
									Доставлен
								</Text>
							</View>
						</View>
						{/* {props.status === "F" || props.canceled === "Y" ? ( */}
							<TouchableOpacity
								onPress={() => {
									this._repeatOrder();
								}}
								style={[
									appStyles.button,
									{ marginTop: 20, marginBottom: 5 }
								]}
							>
								<Text style={appStyles.buttonText}>
                                    Повторить заказ
								</Text>
							</TouchableOpacity>
						{/* ) : ( */}
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(`tel:${phone}`);
								}}
								style={[
									appStyles.button,
									{ marginTop: 10, marginBottom: 25 }
								]}
							>
								<Text style={appStyles.buttonText}>
									Позвонить нам
								</Text>
							</TouchableOpacity>
						{/* )} */}
					</View>
					{/*  */}
					<View style={{ ...appStyles.paddings }}>
						<View
							style={{
								backgroundColor: "white",
								height: 74,
								...appStyles.borderRadius,
								...appStyles.shadow,
								transform: [{ translateY: -37 }],
								justifyContent: "center",
								paddingLeft: 25,
								paddingRight: 25
							}}
						>
							<Text
								style={{
									color: Colors.text,
									fontFamily: "Neuron",
									fontSize: 16
								}}
							>
								Оплачен{" "}
								<Text
									style={{
										color: Colors.text,
										fontFamily: "Neuron-Bold",
										fontSize: 16
									}}
								>
									{props.payed ? "Наличными" : "Нет"}
								</Text>
							</Text>
							<Text
								style={{
									color: "#C4C4C4",
									fontFamily: "Neuron-Bold",
									fontSize: 16
								}}
							>
								{props.date}
							</Text>
						</View>
						<View style={styles.infoItem}>
							<View style={styles.infoItemImgWrap}>
								<Image
									style={{ width: 18, height: 24 }}
									source={require("../img/ico-location.png")}
								/>
							</View>
							<View>
								<Text
									style={{
										fontFamily: "Neuron-Heavy",
										color: Colors.text,
										marginTop: 15,
										marginBottom: 5
									}}
								>
									Адрес:
								</Text>
								<Text style={{ color: Colors.text }}>
									{props.address}
								</Text>
							</View>
						</View>
						{/*  */}
						<View style={styles.infoItem}>
							<View style={styles.infoItemImgWrap}>
								<Image
									style={{ width: 24, height: 24 }}
									source={require("../img/ico-message.png")}
								/>
							</View>
							<View>
								<Text
									style={{
										fontFamily: "Neuron-Heavy",
										color: Colors.text,
										marginTop: 15,
										marginBottom: 5
									}}
								>
									Комментарий к заказу:
								</Text>
								<Text style={{ color: Colors.text }}>
									{props.desc}
								</Text>
							</View>
						</View>
						{/* products */}
						<View>
							{props.products
								? props.products.map(item => {
										return (
											<View
												key={item.id}
												style={{
													flexDirection: "row",
													height: 50,
													alignItems: "center",
													borderBottomColor:
														"#E2E2E2",
													borderBottomWidth: 1
												}}
											>
												<View
													style={{
														width: 65,
														alignItems: "center"
													}}
												>
													<Text
														style={{
															fontFamily:
																"Neuron",
															color:
																Colors.lightText
														}}
													>
														X{item.count}
													</Text>
												</View>
												<Text
													style={{
														fontFamily: "Neuron",
														color: Colors.lightText
													}}
												>
													{item.name}
												</Text>
												<Text
													style={{
														fontFamily: "Neuron",
														color: Colors.text,
														marginLeft: "auto"
													}}
												>
													{item.price * item.count}{" "}
													руб.
												</Text>
											</View>
										);
								  })
								: null}
							<View style={{ marginLeft: 65, paddingTop: 20 }}>
								<View
									style={{
										justifyContent: "space-between",
										flexDirection: "row"
									}}
								>
									<Text
										style={{
											fontFamily: "Neuron-Heavy",
											color: Colors.text
										}}
									>
										{" "}
										Общая сумма:
									</Text>
									<Text
										style={{
											fontFamily: "Neuron-Heavy",
											color: Colors.text
										}}
									>
										{" "}
										{props.price} руб.
									</Text>
								</View>
							</View>
						</View>
						{/*END products */}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	step: {},
	stepImgWrap: {
		backgroundColor: "white",
		borderColor: "white",
		borderWidth: 2,
		width: 48,
		height: 48,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	steptext: {
		fontFamily: "Neuron",
		fontSize: 14,
		marginTop: 10,
		color: Colors.text,
		textAlign: "center"
	},
	stepLine: {
		height: 2,
		backgroundColor: "white",
		flex: 1,
		marginTop: 22
	},
	infoItem: {
		flexDirection: "row",
		height: 80,
		borderBottomColor: "#E2E2E2",
		borderBottomWidth: 1
	},
	infoItemImgWrap: {
		justifyContent: "center",
		alignItems: "center",
		height: 80,
		width: 50,
		marginRight: 15
	}
});
