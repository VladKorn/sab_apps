import React from "react";
import { View, ShadowPropTypesIOS, Text } from "react-native";
import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
	createDrawerNavigator
} from "react-navigation";
import { fromRight, fromBottom } from "react-navigation-transitions";
import * as Font from "expo-font";
import LoginForm from "./Components/LoginForm";
import HomeScreen from "./Components/HomeScreen";
import Catalog from "./Components/Catalog";
import News from "./Components/News";
import Stocks from "./Components/Stocks";
import Order from "./Components/Order";
import Delivery from "./Components/Delivery";

import CategorySlider from "./Components/CategorySlider";
import Sidebar from "./Components/Sidebar";
import SidebarCatalog from "./Components/SidebarCatalog";
import Contacts from "./Components/Contacts";
import History from "./Components/History";
import HistoryDetail from "./Components/HistoryDetail";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from "react-native";
import CryptoJS from "crypto-js";

interface State {
	user: object;
	catalog: object;
	basket: object;
	products: object;
	isLoading: boolean;
	fontLoaded: boolean;
	stocks: object;
	favorite: Array<number>;
	userError: object;
	// productId: number;
}
export default class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			catalog: {},
			favorite: [],
			products: {},
			stocks: {},
			basket: {
				"1231": { count: 3 },
				"1246": { count: 6 },
				"1247": { count: 1 }
			},
			isLoading: false,
			fontLoaded: false,
			userError: {}
		};

		// bind functions..
		this.getCatalog = this.getCatalog.bind(this);
		this.basketApi = this.basketApi.bind(this);
		this.getData = this.getData.bind(this);
		this.openProduct = this.openProduct.bind(this);
		this.addToFavorite = this.addToFavorite.bind(this);
		this.login = this.login.bind(this);
	}
	componentDidMount() {
		this.loadAssetsAsync();
		this.getData();
		// setTimeout(()=>{
		//     this.setState({  });

		// }, 5000)
	}
	loadAssetsAsync = async () => {
		await Font.loadAsync({
			Neuron: require("./assets/fonts/Neuron.otf"),
			"Neuron-Bold": require("./assets/fonts/Neuron-Bold.otf"),
			"Neuron-Heavy": require("./assets/fonts/Neuron-Heavy.otf"),
			Segoe: require("./assets/fonts/segoe-ui.ttf")
		});

		this.setState({ fontLoaded: true });
	};
	basketApi(obj) {
		let basket = this.state.basket;
		if (obj.action === "setProduct") {
			if (obj.params.count === 0) {
				delete basket[obj.params.productId];
			} else {
				basket[obj.params.productId] = { count: obj.params.count };
			}
			this.setState({ basket: basket });
		}
	}
	openProduct() {}
	getCatalog() {}
	getData(log = "", pas = "") {
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem("@log");
				const value2 = await AsyncStorage.getItem("@pas");
				const decryptedLog = CryptoJS.AES.decrypt(
					value,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				const decryptedPas = CryptoJS.AES.decrypt(
					value2,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				// console.log('decryptedLog' , decryptedLog);
				if (value !== null) {
					log = decryptedLog;
					pas = decryptedPas;
					// console.log("@log", log);
					// console.log("@pas", pas);
					// value previously stored
					//

					const req = {
						// log: "admin",
						// pas: "ie1f32sq"
						log,
						pas
					};

					return fetch("https://subexpress.ru/apps_api/", {
						method: "post",
						body: JSON.stringify(req)
					})
						.then(res => res.json())
						.then(res => {
							// console.log('res.user' , res.userError);
							this.setState(
								{
									isLoading: false,
									userError: res.userError,
									catalog: res.catalog.cats,
									products: res.catalog.products,
									user: res.user,
									stocks: res.stocks,
									favorite: res.favorite
								},
								function() {}
							);

							// console.log('favorite' , res);
						})
						.catch(error => {
							console.error(error);
						});
				}
			} catch (e) {
				// error reading value
			}
		};
		getData();
	}
	makeOrder(obj) {
		// console.log("makeOrder", obj);
	}
	addToFavorite(id) {
		let favorite: Array<number> = this.state.favorite;
		let prodId = parseInt(id);
		if (favorite.includes(prodId)) {
			// console.log('favorite125' , typeof favorite);
			favorite = favorite.filter(item => {
				return item !== prodId;
			});
		} else {
			favorite.push(prodId);
		}

		this.setState({ favorite: favorite });
		let data: any = {};
		data.products = favorite;
		data.userId = this.state.user.id;

		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify(data));
		let fetchOptions = { method: "POST", headers, body: formData };
		// console.log('sended-', data)
		fetch(`https://subexpress.ru/apps_api/favorites.php`, fetchOptions)
			.then(res => res.json())
			.then(res => {
				// console.log('fetch res-', res);
				if (res.sucsess) {
					// if(prod.count === 0){delete state.inBasket[prod.id]}
				}
			});

		// console.log("addToFavorite", this.state.favorite);
	}
	// vladkorn
	// afihso323nc1
	login(log, pas, save) {
		this.getData(log, pas);
		if (save) {
			const storeData = async () => {
				try {
					const encryptedLog = CryptoJS.AES.encrypt(
						log,
						"F24czi3II092Xnrhc"
					).toString();
					const encryptedPas = CryptoJS.AES.encrypt(
						pas,
						"F24czi3II092Xnrhc"
					).toString();
					// console.log('encryptedLog' , encryptedLog)
					await AsyncStorage.setItem("@log", encryptedLog);
					await AsyncStorage.setItem("@pas", encryptedPas);
				} catch (e) {
					// saving error
				}
			};
			storeData();
			// console.log('storeData' , storeData);
		}
	}
	render() {
		// console.log("user", this.state.user);
		if (!this.state.fontLoaded) {
			return <Text>Loaging Font</Text>;
		}

		if (
			(this.state.user && Object.keys(this.state.user).length === 0) ||
			!this.state.user
		) {
			return (
				<LoginForm
					login={this.login}
					userError={this.state.userError}
				/>
			);
		}
		return this.state.fontLoaded ? (
			<AppContainer
				key="app"
				screenProps={{
					catalog: this.state.catalog,
					products: this.state.products,
					basket: this.state.basket,
					basketApi: this.basketApi,
					getCatalog: this.getCatalog,
					makeOrder: this.makeOrder,
					user: this.state.user,
					stocks: this.state.stocks,
					favorite: this.state.favorite,
					addToFavorite: this.addToFavorite
				}}
			/>
		) : null;
	}
}

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
		// Order: navOrder
		Order: Order,
		Delivery: Delivery,
		HistoryDetail: HistoryDetail
	},
	{
		initialRouteName: "Order",
		transitionConfig: nav => handleCustomTransition(nav)
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

// export default ()=><View style={{flex: 1}}><AppContainer/></View>;

// Keystore credentials
//   Keystore password: 0f45834b5f014368a158de89bbf34ca1
//   Key alias:         QHZsYWRrb3JuL3N1YmV4cHJlc3M=
//   Key password:      6183fb8ef6ed47ac98e168eb30ec9062

//   Path to Keystore:  /work/sub_apps/subexpress/subexpress.jks
