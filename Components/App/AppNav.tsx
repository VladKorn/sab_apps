import {} from "react";
import "react-native-gesture-handler";

import { Text, StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
import { fromRight, fromBottom } from "react-navigation-transitions";
import { Button } from "react-native";
import HeaderRight from "../Catalog/HeaderRight";

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

// const Home = createStackNavigator(
// 	{
// 		// LoginForm: LoginForm,
// 		Home: HomeScreen,
// 		CategorySlider: CategorySlider,
// 		Catalog: {
// 			screen: Catalog,
// 			navigationOptions: ({ navigation }) => ({
// 				headerTitle: "Меню",
// 				headerRight: (
// 					<View style={{ flexDirection: "row", marginTop: 17 }}>
// 						<TouchableOpacity
// 							onPress={() => {
// 								navigation
// 									.dangerouslyGetParent()
// 									.dangerouslyGetParent()
// 									.dangerouslyGetParent()
// 									.openDrawer();
// 							}}
// 						>
// 							<Image
// 								style={{
// 									width: 20,
// 									height: 24,
// 									marginRight: 20
// 								}}
// 								source={require("../img/ico-menu1.png")}
// 							/>
// 						</TouchableOpacity>
// 						<TouchableOpacity
// 							style={{ width: 40, height: 40 }}
// 							onPress={() => {
// 								navigation.navigate("Order");
// 							}}
// 						>
// 							<Image
// 								style={{ width: 30, height: 24 }}
// 								source={require("../img/ico-orders.png")}
// 							/>
// 							<View style={appStyles.bottonToOrderCount}>
// 								<Text style={appStyles.bottonToOrderCountText}>
// 									{/* {navigation.getScreenProps().basket
// 										? Object.entries(
// 												navigation.getScreenProps()
// 													.basket
// 										  ).length
// 										: null} */}
// 									{totalProductsCount(
// 										navigation.getScreenProps().basket
// 									)}
// 								</Text>
// 							</View>
// 						</TouchableOpacity>
// 					</View>
// 				)
// 			})
// 		},
// 		News: News,
// 		Stocks: Stocks,
// 		Favorites: Catalog,
// 		OrderHistory: History,
// 		Addresses: Addresses,
// 		User: User,
// 		Info: Contacts,
// 		Contacts: Contacts,
// 		OrderByPhone: Contacts,
// 		Order: {
// 			screen: Order,
// 			navigationOptions: ({ navigation }) => ({
// 				headerRight: (
// 					<TouchableOpacity
// 						onPress={() => {
// 							navigation.navigate("Order", { action: "clear" });
// 							// navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().openDrawer()
// 						}}
// 					>
// 						<Image
// 							style={{ width: 18, height: 21, marginRight: 20 }}
// 							source={require("../img/ico-delete2.png")}
// 						/>
// 					</TouchableOpacity>
// 				)
// 			})
// 		},
// 		Delivery: Delivery,
// 		HistoryDetail: HistoryDetail
// 	},
// 	{
// 		initialRouteName: "Home",
// 		// initialRouteName: "User",
// 		transitionConfig: nav => handleCustomTransition(nav),
// 		defaultNavigationOptions: {
// 			headerBackImage: customHeaderBackImage,
// 			headerBackTitle: null,
// 			headerStyle: appStyles.headerStyle,
// 			headerTitleStyle: appStyles.headerTitle
// 		}
// 	}
// );
// const AppNavigator2 = createDrawerNavigator(
// 	{
// 		Home: Home
// 	},
// 	{
// 		contentComponent: Sidebar,
// 		drawerWidth: 310
// 	}
// );
const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();
// function AppNavigator2() {
// 	return (

// 	);
// }
// const AppNavigator = createDrawerNavigator(
// 	{
// 		Home: AppNavigator2
// 	},
// 	{
// 		contentComponent: SidebarCatalog,
// 		drawerPosition: "right",
// 		drawerWidth: 310
// 	}
// );

// 		defaultNavigationOptions: {
// 			headerBackImage: customHeaderBackImage,
// 			headerBackTitle: null,
// 			headerStyle: appStyles.headerStyle,
// 			headerTitleStyle: appStyles.headerTitle
// 		}
// const Nav = <Stack.Navigator>
// 	<Stack.Screen
// 		name="Catalog"
// 		options={{
// 			headerTitle: "Меню",
// 			headerRight: () => {
// 				console.log("_props.navigation", _props.navigation);
// 				return <HeaderRight basket={_props.screenProps.basket} />;
// 			},
// 		}}
// 	>
// 		{(props) => (
// 			<Catalog
// 				{...props}
// 				name={"Catalog"}
// 				screenProps={_props.screenProps}
// 			/>
// 		)}
// 	</Stack.Screen>
// </Stack.Navigator>;

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
					// headerStyle: appStyles.headerTitle,
				}}
			>
				<Drawer.Screen
					name="Home"
					options={{
						// header: null,
						headerShown: false,
						// headerBackTitle: null,
					}}
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
				>
					{(props) => (
						<History {...props} screenProps={_props.screenProps} />
					)}
				</Drawer.Screen>
				<Drawer.Screen
					name="Addresses"
					options={{ headerTitle: "Ареса доставок" }}
					component={Addresses}
				/>
				<Drawer.Screen
					name="User"
					options={{ headerTitle: "Пользователь" }}
				>
					{(props) => (
						<User {...props} screenProps={_props.screenProps} />
					)}
				</Drawer.Screen>
				<Drawer.Screen
					name="Info"
					options={{ headerTitle: "Информация" }}
					component={Info}
				></Drawer.Screen>
				<Drawer.Screen
					name="Contacts"
					options={{ headerTitle: "Контакты" }}
				>
					{(props) => (
						<Contacts {...props} screenProps={_props.screenProps} />
					)}
				</Drawer.Screen>
				<Drawer.Screen name="OrderByPhone">
					{(props) => (
						<Contacts {...props} screenProps={_props.screenProps} />
					)}
				</Drawer.Screen>
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