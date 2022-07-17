import React from "react";
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import Colors from "../constants/colors";
import appStyles from "./appStyles";
// import { DrawerActions } from "react-navigation-drawer";

interface State {
	data: object;
	isLoading: boolean;
}
export const obj = {
	Catalog: {
		title: "Меню",
		img: require("../img/ico-menu1.png"),
		style: { width: 14, height: 18 },
	},
	News: {
		title: "Новости",
		img: require("../img/ico-menu2.png"),
		style: { width: 20, height: 18 },
	},
	Stocks: {
		title: "Акции",
		img: require("../img/ico-menu3.png"),
		style: { width: 14, height: 18 },
	},
	Favorites: {
		title: "Моя подборка",
		img: require("../img/ico-menu4.png"),
		style: { width: 20, height: 18 },
	},
	OrderHistory: {
		title: "История заказов",
		img: require("../img/ico-menu5.png"),
		style: { width: 18, height: 18 },
	},
	Addresses: {
		title: "Адреса доставок",
		img: require("../img/ico-menu6.png"),
		style: { width: 13, height: 18 },
	},
	User: {
		title: "Учётная запись",
		img: require("../img/ico-menu7.png"),
		style: { width: 20, height: 18 },
	},
	Info: {
		title: "Информация",
		img: require("../img/ico-menu8.png"),
		style: { width: 6, height: 18 },
	},
	Contacts: {
		title: "Контакты",
		img: require("../img/ico-menu9.png"),
		style: { width: 18, height: 18 },
	},
	OrderByPhone: {
		title: "Заказ по телефону",
		img: require("../img/ico-menu10.png"),
		style: { width: 16, height: 18 },
	},
};

export const Sidebar = (props) => {
	const routes = props.state.routeNames.filter((item) => {
		return (
			item !== "Home" &&
			item !== "Order" &&
			item !== "CategorySlider" &&
			item !== "Delivery" &&
			item !== "HistoryDetail"
		);
	});
	const menu = routes.map((route, index) => {
		const img = obj[route]
			? obj[route].img
			: require("../img/ico-menu3.png");

		return (
			<View
				key={route}
				style={{
					paddingTop: 10,
					paddingBottom: 10,
				}}
			>
				{route === "Info" ? (
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: "#E2E2E2",
							marginTop: 5,
							marginBottom: 25,
						}}
					></View>
				) : null}
				<TouchableOpacity
					onPress={() => {
						if (route === "Favorites") {
							props.navigation.navigate(route, {
								isFavorite: true,
							});
						} else {
							props.navigation.navigate(route);
						}
					}}
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
				>
					<View
						style={{
							marginRight: 25,
							alignItems: "center",
							width: 20,
						}}
					>
						{obj[route] ? (
							<Image style={obj[route].style} source={img} />
						) : null}
					</View>
					<Text
						style={{
							fontFamily: "Neuron-Bold",
							fontSize: 18,
							color: Colors.gray,
						}}
					>
						{obj[route] ? obj[route].title : route}
					</Text>
				</TouchableOpacity>
			</View>
		);
	});
	// const Menu = (props) => {
	// 	console.log("Menu props", props.state.routeNames);
	// 	return <DrawerItemList {...props} />;
	// };

	return (
		<DrawerContentScrollView {...props}>
			<SafeAreaView style={appStyles.page}>
				<View
					style={{
						paddingLeft: 30,
						paddingRight: 30,
						paddingTop: 30,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							props.navigation.closeDrawer();
						}}
					>
						<Image
							style={{ width: 20.91, height: 18.98 }}
							source={require("../img/ico-menu-close.png")}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate("Home");
						}}
						style={{
							width: "100%",
							// backgroundColor: 'red',
							marginBottom: 30,
							marginTop: 20,
							alignItems: "center",
						}}
					>
						<Image
							style={{ width: 176.77, height: 69.27 }}
							source={require("../img/logo.png")}
						/>
					</TouchableOpacity>

					{/* <Menu {...this.props} /> */}
					{menu}
				</View>
				<View
					style={{
						display: "flex",
						marginTop: "auto",
						height: 100,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: 12,
							marginTop: "auto",
							textAlign: "center",
							marginBottom: "auto",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						version: 1.1.6
					</Text>
				</View>
			</SafeAreaView>
		</DrawerContentScrollView>
	);
};
export default Sidebar;
