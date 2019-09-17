import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import appStyles from "./appStyles";

interface Props {
	id: number;
	price: number;
	count: number;
	img: string;
	address: string;
	date: string;
	status: StatusTypes;
    canceled: string;
    desc: string;
    products: Array<object>;
    navigation: any;
    basketApi: any;
}
type StatusTypes = "N" | "P" | "F";

// STATUS_ID == "N"  - принят
// STATUS_ID == "P"  - оплачен
// STATUS_ID == "F"  - выполнен
const HistiryListItem: React.FC<Props> = props => {
	return (
		<TouchableOpacity
			onPress={() => {
				props.navigation.navigate("HistoryDetail", {
					pageData: props
				});
			}}
			style={{
				height: 110,
				borderColor: "#D6D6D6",
				borderWidth: 1,
				...appStyles.borderRadius,
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: "white",
				paddingLeft: 10,
				paddingRight: 10,
				marginBottom: 5,
				marginTop: 5,
				position: "relative"
			}}
		>
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
					position: "absolute",
					top: -6,
					right: -5,
					justifyContent: "center",
					alignItems: "center",
					paddingLeft: 5,
					paddingRight: 5,
					borderRadius: 5
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
					{props.status === "N" && props.canceled === "N"
						? "ПРИНЯТ"
						: null}
					{props.status === "P" && props.canceled === "N"
						? "ГОТОВИМ"
						: null}
					{props.status === "F" && props.canceled === "N"
						? "ВЫПОЛНЕН"
						: null}
					{props.canceled === "Y" ? "ОТМЕНЕН" : null}
				</Text>
			</View>
			<View
				style={{
					width: 80,
					height: 80,
					...appStyles.borderRadius,
					backgroundColor: Colors.lightgray
				}}
			>
				<Image
					style={{ width: 80, height: 80, ...appStyles.borderRadius }}
					source={{ uri: props.img }}
				/>
			</View>
			<View style={{ marginLeft: 18 }}>
				<Text
					style={{
						fontFamily: "Neuron",
						lineHeight: 17,
						fontSize: 16,
						color: Colors.text
					}}
				>
					Заказ №:{" "}
					<Text
						style={{
							fontFamily: "Neuron-Heavy",
							lineHeight: 17,
							fontSize: 16,
							color: Colors.text
						}}
					>
						{props.id}
					</Text>
				</Text>
				<View style={{ flexDirection: "row", width: 210 }}>
					<Text
						style={{
							fontFamily: "Neuron",
							lineHeight: 17,
							fontSize: 16,
							color: Colors.text
						}}
					>
						Адрес:{" "}
					</Text>
					<Text
						numberOfLines={1}
						style={{
							fontFamily: "Neuron-Heavy",
							fontSize: 16,
							color: Colors.text
						}}
					>
						{props.address}
					</Text>
				</View>
				<Text
					style={{
						fontFamily: "Neuron-Bold",
						lineHeight: 17,
						fontSize: 16,
						color: Colors.text
					}}
				>
					{props.count} шт. на {props.price} руб.
				</Text>
				<Text
					style={{
						fontFamily: "Neuron-Bold",
						lineHeight: 17,
						fontSize: 16,
						color: "#C4C4C4",
						marginTop: 5
					}}
				>
					{props.date}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
export default HistiryListItem;
