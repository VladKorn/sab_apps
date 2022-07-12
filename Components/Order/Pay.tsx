import {
	View,
	Text,
	ScrollView,
	Image,
	SafeAreaView,
	TouchableOpacity,
	Linking,
} from "react-native";
import { useState, useEffect } from "react";
import appStyles from "./../appStyles";

interface Props {
	qrcode: string;
	orderId: number;
	payUrl: string | null;
	refreshOrderData?: () => void;
}

export const Pay = (props: Props) => {
	const payByCard = async () => {
		if (props.payUrl) {
			Linking.openURL(props.payUrl);
			return null;
		}
		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify({ orderId: props.orderId }));
		const res = await fetch(
			`https://subexpress.ru/order/rest_api/orderCard.php`,
			{
				method: "post",
				body: formData,
				headers: headers,
			}
		).then((res) => res.json());
		if (res.redirect) {
			Linking.openURL(res.redirect);
		}
		console.log("Pay payByCard res", res);
	};

	return (
		<View style={{ display: "flex", alignItems: "center" }}>
			<TouchableOpacity
				onPress={payByCard}
				style={[{ marginTop: 10, marginBottom: 25 }]}
			>
				<Image
					style={{
						width: 300,
						height: 300,
					}}
					source={{
						uri: props.qrcode,
					}}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={payByCard}
				style={[appStyles.button, { marginTop: 10, marginBottom: 25 }]}
			>
				<Text style={appStyles.buttonText}>Оплатить</Text>
			</TouchableOpacity>
		</View>
	);
};
