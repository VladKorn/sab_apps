import React from "react";

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
		Catalog: Catalog,
		News: News,
		Stocks: Stocks,
		Favorites: Catalog,
		OrderHistory: History,
		Addresses: News,
		User: News,
		Info: News,
		Contacts: Contacts,
		OrderByPhone: News,
		Order: Order,
		Delivery: Delivery,
		HistoryDetail: HistoryDetail
	},
	{
		initialRouteName: "Home",
        transitionConfig: nav => handleCustomTransition(nav),
        
        
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