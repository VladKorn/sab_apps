import React from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Image
} from "react-native";
import Colors from "../constants/Colors.js";
import appStyles from "./appStyles";
import { DrawerActions } from "react-navigation-drawer";

interface State {
	data: object;
	isLoading: boolean;
}
export default class SidebarCatalog extends React.Component<any, State> {
	render() {
		// console.log(JSON.stringify(this.props.navigation ) );

		const obj = {
			Catalog: {
				title: "Меню",
				img: require("../img/ico-menu1.png"),
				style: { width: 14, height: 18 }
			},
			News: {
				title: "Новости",
				img: require("../img/ico-menu2.png"),
				style: { width: 20, height: 18 }
			},
			Stocks: {
				title: "Акции",
				img: require("../img/ico-menu3.png"),
				style: { width: 14, height: 18 }
			},
			Favorites: {
				title: "Моя подборка",
				img: require("../img/ico-menu4.png"),
				style: { width: 20, height: 18 }
			},
			OrderHistory: {
				title: "История заказов",
				img: require("../img/ico-menu5.png"),
				style: { width: 18, height: 18 }
			},
			Addresses: {
				title: "Адреса доставок",
				img: require("../img/ico-menu6.png"),
				style: { width: 13, height: 18 }
			},
			User: {
				title: "Учётная запись",
				img: require("../img/ico-menu7.png"),
				style: { width: 20, height: 18 }
			},
			Info: {
				title: "Информация",
				img: require("../img/ico-menu8.png"),
				style: { width: 6, height: 18 }
			},
			Contacts: {
				title: "Контакты",
				img: require("../img/ico-menu9.png"),
				style: { width: 18, height: 18 }
			},
			OrderByPhone: {
				title: "Заказ по телефону",
				img: require("../img/ico-menu10.png"),
				style: { width: 16, height: 18 }
			}
		};

		const routes = Object.keys(
			this.props.screenProps.catalog
		).filter(item => {
			return (
				item !== "Home" && item !== "Order" && item !== "CategorySlider"
			);
		});
		const menu = routes.map((route, index) => {

			return (
				<TouchableOpacity><Text>{route}</Text></TouchableOpacity>
			);
		});

		return (
			<SafeAreaView style={appStyles.page}>
				<View
					style={{
						paddingLeft: 30,
						paddingRight: 30,
						paddingTop: 30
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.dispatch(
								DrawerActions.closeDrawer()
							);
						}}
					>
						<Image
							style={{ width: 20.91, height: 18.98 }}
							source={require("../img/ico-menu-close.png")}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("Catalog", {
								catId: 123
							});
						}}
					>
					</TouchableOpacity>
					{/*  */}
					{menu}
				</View>
			</SafeAreaView>
		);
	}
}
