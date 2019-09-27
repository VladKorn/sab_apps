import React from "react";

import { Text , StyleSheet} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { fromRight, fromBottom } from "react-navigation-transitions";

import HomeScreen from "./HomeScreen";
import Catalog from "./Catalog";
import News from "./News";
import Stocks from "./Stocks";
import Order from "./Order";
import Delivery from "./Delivery";

import CategorySlider from "./CategorySlider";
import Sidebar from "./Sidebar";
import SidebarCatalog from "./SidebarCatalog";
import Contacts from "./Contacts";
import History from "./History";
import HistoryDetail from "./HistoryDetail";
import Addresses from "./Addresses";
import User from "./User";

import { TouchableOpacity, Image } from "react-native";

import customHeaderBackImage from "./customHeaderBackImage"
import appStyles from "./appStyles";


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

const Home = createStackNavigator(
	{
		// LoginForm: LoginForm,
		Home: HomeScreen,
		CategorySlider: CategorySlider,
		Catalog: {
			screen: Catalog,
			navigationOptions: ({ navigation }) => ({
                headerTitle: 'Меню',
				headerRight: (
					<TouchableOpacity
						onPress={() => {
                            navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().openDrawer()
						}}
					>
						<Image
							style={{ width: 20, height: 24 , marginRight: 20}}
							source={require("../img/ico-menu1.png")}
						/>
					</TouchableOpacity>
				)
			})
		},
		News: News,
		Stocks: Stocks,
		Favorites: Catalog,
		OrderHistory: History,
		Addresses: Addresses,
		User: User,
		Info: Contacts,
		Contacts: Contacts,
		OrderByPhone: Contacts,
        Order: {
            screen: Order,
            navigationOptions: ({ navigation }) => ({
				headerRight: (
					<TouchableOpacity
						onPress={() => {
                            navigation.navigate('Order',{'action': "clear"});
                            // navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().openDrawer()
						}}
					>
						<Image
							style={{ width: 18, height: 21 , marginRight: 20}}
							source={require("../img/ico-delete2.png")}
						/>
					</TouchableOpacity>
				)
			})
        },
		Delivery: Delivery,
		HistoryDetail: HistoryDetail
	},
	{
		initialRouteName: "Home",
		// initialRouteName: "User",
        transitionConfig: nav => handleCustomTransition(nav),
        defaultNavigationOptions: {
            headerBackImage: customHeaderBackImage,
            headerBackTitle: null,
            headerStyle: appStyles.headerStyle,
            headerTitleStyle: appStyles.headerTitle ,
          },
	}
);
const AppNavigator2 = createDrawerNavigator(
	{
		Home: Home
	},
	{
		contentComponent: Sidebar,
		drawerWidth: 310
	}
);
const AppNavigator = createDrawerNavigator(
	{
		Home: AppNavigator2
	},
	{
		contentComponent: SidebarCatalog,
		drawerPosition: "right",
		drawerWidth: 310
	}
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
