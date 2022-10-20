import { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
	View,
	Text,
	ScrollView,
	Image,
	SafeAreaView,
	TouchableOpacity,
	Linking,
} from "react-native";
import Colors from "../../constants/colors";
import appStyles from "../appStyles";
import { phone } from "../../constants/data.js";
import { HistoryDetailStatus } from "./HistoryDetailStatus";
import { HistoryDetailStepStatus } from "./HistoryDetailStepStatus";
import { styles } from "./historyStyles";
import { BasketContext } from "./../Basket/BasketContext";

import { tsBasketApi } from "../../interfaces";
import { Pay } from "./Pay";
import { getOrders } from "./getOrders";
import { HistoryDetailProductsList } from "./HistoryDetailProductsList";

interface OrderData {
	canceled: string;
	status: StatusTypes;
	id: number;
	payed: string;
	date: string;
	desc: string;
	price: number;
	products: any[];
	address: string;
	payData: any;
}
type StatusTypes = "N" | "P" | "V";

const getOrderStatus = async (id: number) => {
	return await fetch(
		`https://subexpress.ru/apps_api/pay.php?get=orderStatus&id=${id}`
	).then((res) => res.json());
};

const getOrder = async (id: number) => {
	console.log("getOrder", id);

	const res = await getOrders({ id: id });
	console.log("getOrders res", res);
	return res?.order || null;
};
interface _Props {}

export const HistoryDetail = (_props: _Props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const basketContext = useContext(BasketContext);
	const [data, setData] = useState<OrderData | null>(
		route?.params?.pageData || null
	);
	const [status, setStatus] = useState(null);

	console.log("data", data);
	console.log("data?.id", data?.id);

	if (!data?.id) return null;
	const refreshOrderData = () => {
		getOrder(data.id).then((res) => {
			console.log("res", res);
			if (res) {
				setData(res);
			}
		});
	};

	useEffect(() => {
		if (!data?.status) {
			refreshOrderData();
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			getOrderStatus(data?.id).then((res) => {
				// console.log("getOrderStatus res", res);
				if (res) {
					if (JSON.stringify(status) !== JSON.stringify(res)) {
						refreshOrderData();
					}
					setStatus(res);
				}
			});
			return () => clearInterval(interval);
		}, 5000);
	}, []);
	if (!data?.status) return null;

	// const [navigation, setNavigation] = useState({});
	// const [data, setData] = useState(null);

	const _repeatOrder = () => {
		// console.log("pageData", pageData.products);
		let products = {};
		data.products.forEach((item) => {
			typeof item === "object" && item.id
				? (products[item["id"]] = { count: item.count })
				: null;
		});
		// console.log("products", products);

		const data: tsBasketApi = {
			action: "setBasket",
			params: {
				products: products,
			},
		};
		basketContext.basketApi(data);
		setTimeout(() => {
			navigation.navigate("Order");
		}, 500);

		// console.log('basketApi' , pageData.basketApi);
	};
	const props: OrderData = data;
	console.log("props", props.payed);
	return (
		<SafeAreaView style={{ ...appStyles.SafeAreaView }}>
			<ScrollView>
				<View
					style={{
						backgroundColor: Colors.lightgray,
						...appStyles.paddings,
						paddingTop: 20,
						paddingBottom: 25,
					}}
				>
					<TouchableOpacity
						style={{ paddingLeft: 20 }}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Image
							style={{
								width: 20.91,
								height: 18.98,
								marginRight: 30,
							}}
							source={require("../../img/ico-close.png")}
						/>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text style={appStyles.sectTitle}>
							Заказ №: {props.id}
						</Text>
						<HistoryDetailStatus
							canceled={props.canceled}
							status={props.status}
						/>
					</View>
					<HistoryDetailStepStatus status={props.status} />
					{props.payed ? null : (
						<Pay
							qrcode={data.payData.QRCODE}
							payUrl={data.payData.PAYURL || null}
							orderId={props.id}
							refreshOrderData={refreshOrderData}
						/>
					)}
					{/* {props.status === "F" || props.canceled === "Y" ? ( */}
					<TouchableOpacity
						onPress={() => {
							_repeatOrder();
						}}
						style={[
							appStyles.button,
							{ marginTop: 20, marginBottom: 5 },
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
							{ marginTop: 10, marginBottom: 25 },
						]}
					>
						<Text style={appStyles.buttonText}>Позвонить нам</Text>
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
							paddingRight: 25,
						}}
					>
						<Text
							style={{
								color: Colors.text,
								fontFamily: "Neuron",
								fontSize: 16,
							}}
						>
							Оплачен{" "}
							<Text
								style={{
									color: Colors.text,
									fontFamily: "Neuron-Bold",
									fontSize: 16,
								}}
							>
								{props.payed ? "Наличными" : "Нет"}
							</Text>
						</Text>
						<Text
							style={{
								color: "#C4C4C4",
								fontFamily: "Neuron-Bold",
								fontSize: 16,
							}}
						>
							{props.date}
						</Text>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoItemImgWrap}>
							<Image
								style={{ width: 18, height: 24 }}
								source={require("../../img/ico-location.png")}
							/>
						</View>
						<View>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									color: Colors.text,
									marginTop: 15,
									marginBottom: 5,
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
								source={require("../../img/ico-message.png")}
							/>
						</View>
						<View>
							<Text
								style={{
									fontFamily: "Neuron-Heavy",
									color: Colors.text,
									marginTop: 15,
									marginBottom: 5,
								}}
							>
								Комментарий к заказу:
							</Text>
							<Text style={{ color: Colors.text }}>
								{props.desc}
							</Text>
						</View>
					</View>
					<HistoryDetailProductsList
						products={props.products}
						price={props.price}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
export default HistoryDetail;
