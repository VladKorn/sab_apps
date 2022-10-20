import {} from "react";
import "react-native-gesture-handler";

import { Text, StyleSheet, View } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
import { fromRight, fromBottom } from "react-navigation-transitions";
import { Button } from "react-native";
import HeaderRight from "../Catalog/HeaderRight";
import { Header } from "./../../layout/Header";

import { HomeNav } from "../HomeScreen";
import Catalog from "../Catalog";
import { News } from "../News";
import { Stocks } from "../Stocks";
import { OrderNav } from "../Order";
import { Delivery } from "../Delivery";

import CategorySlider from "../CategorySlider";
import Sidebar from "../Sidebar";
import SidebarCatalog from "../SidebarCatalog";
import Contacts from "../Contacts";
import History from "../Order/History";
import Addresses from "../Addresses";
import User from "../User";
import { Info } from "../Info/Info";
import { DeliveryInfo } from "./../Info/Delivery";
import { HeaderLeft, headerStyles } from "./../../layout/Header";

import { TouchableOpacity, Image } from "react-native";

import appStyles from "../appStyles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const handleCustomTransition = ({ scenes }) => {
	const prevScene = scenes[scenes.length - 2];
	const nextScene = scenes[scenes.length - 1];
	if (
		nextScene.route.routeName === "CategorySlider" ||
		nextScene.route.routeName === "HistoryDetail"
	) {
		return fromBottom();
	} else {
		return fromRight();
	}
};

const Drawer = createDrawerNavigator();
const AppNav = (_props) => {
	return (
		<>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerContent={(props) => <Sidebar {...props} />}
				screenOptions={{
					swipeEnabled: false,
					headerLeft: HeaderLeft,
					// headerBackImage: customHeaderBackImage,
					// headerBackTitle: null,
					headerStyle: headerStyles.headerStyle,
					headerTitleStyle: headerStyles.headerTitle,
					header: (props) => <Header {...props} />,
					// headerStyle: appStyles.headerTitle,
				}}
			>
				<Drawer.Screen
					name="Home"
					options={
						{
							// header: null,
							// headerShown: false,
							// headerBackTitle: null,
						}
					}
					component={HomeNav}
				/>
				<Drawer.Screen
					name="Catalog"
					component={Catalog}
					options={{
						headerTitle: "Меню",
						headerRight: () => {
							return <HeaderRight />;
						},
					}}
				></Drawer.Screen>
				<Drawer.Screen
					name="CategorySlider"
					options={{
						// header: null,
						headerShown: false,
						// headerBackTitle: null,
					}}
					component={CategorySlider}
				></Drawer.Screen>
				<Drawer.Screen
					name="News"
					options={{
						title: "Новости",
					}}
					component={News}
				></Drawer.Screen>
				<Drawer.Screen
					name="Stocks"
					component={Stocks}
					options={{ title: "Акции" }}
				></Drawer.Screen>
				<Drawer.Screen
					name="Favorites"
					options={{ headerTitle: "Избранное" }}
					component={Catalog}
				></Drawer.Screen>
				<Drawer.Screen
					name="OrderHistory"
					options={{
						headerTitle: "История заказов",
						// headerShown: false,
					}}
					component={History}
				/>
				<Drawer.Screen
					name="Addresses"
					options={{ headerTitle: "Ареса доставок" }}
					component={Addresses}
				/>
				<Drawer.Screen
					name="User"
					options={{ headerTitle: "Пользователь" }}
					component={User}
				/>
				<Drawer.Screen
					name="Info"
					options={{ headerTitle: "Информация" }}
					component={Info}
				></Drawer.Screen>
				<Drawer.Screen
					name="DeliveryInfo"
					options={{ headerTitle: "Доставка" }}
					component={DeliveryInfo}
				></Drawer.Screen>
				<Drawer.Screen
					name="Contacts"
					options={{ headerTitle: "Контакты" }}
					component={Contacts}
				/>

				<Drawer.Screen name="OrderByPhone" component={Contacts} />
				<Drawer.Screen
					name="Order"
					options={{
						headerShown: false,
					}}
					component={OrderNav}
				></Drawer.Screen>
				<Drawer.Screen
					name="Delivery"
					options={{ headerTitle: "Оформление заказа" }}
					component={Delivery}
				></Drawer.Screen>
			</Drawer.Navigator>
		</>
	);
};
// const AppContainer = createAppContainer(AppNavigator);
export default AppNav;
