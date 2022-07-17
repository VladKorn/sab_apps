import { StrictMode, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import { View, Alert, StatusBar } from "react-native";
import { AppContext } from "./Context";

import * as Font from "expo-font";
import AppNav from "./AppNav";
import Loading from "../Loading";
import { BasketContext } from "../Basket/BasketContext";
import { NavigationContainer } from "@react-navigation/native";
// import { AsyncStorage } from "react-native";
import { AppContainer } from "./AppContainer";
import { AuthContext } from "./../Login/Login";
import { BasketContainer } from "./../Basket/BasketContext";
import { useGetData } from "./../../hooks/useGetData";

export const App = () => {
	const authContext = useContext(AuthContext);
	const [catalog, setCatalog] = useState({});
	const [favorite, setFavorite] = useState<number[]>([]);
	const [products, setProducts] = useState({});
	const [stocks, setStocks] = useState({});
	const [fontLoaded, setfontLoaded] = useState(false);
	const [isSavedLoginDataChecked, setIsSavedLoginDataChecked] = useState(
		false
	);
	const [userError, setUserError] = useState({});
	const res = useGetData({
		catalog: true,
		stocks: true,
	});
	useEffect(() => {
		if (res.isDataLoading) return;
		if (res.error) {
			console.log(res.error);
			return;
		}

		if (Object.keys(catalog).length === 0) {
			if (res.data) {
				console.log(
					"App useEffect res.isDataLoading",
					res.isDataLoading
				);
				setIsSavedLoginDataChecked(true);
				// console.log("fetch res stocks", res.stocks);
				setUserError(res.data.userError);
				setCatalog(res.data.catalog.cats);
				setProducts(res.data.catalog.products);
				setStocks(res.data.stocks);
				setFavorite(res.data.user.favorite || []);
			}
			// TODO forgot save
			// if (
			// 	data.user &&
			// 	data.user.id &&
			// 	loginData.mode !== "forgot" &&
			// 	loginData.save
			// ) {
			// 	// authContext.saveLoginData(loginData.log, res.user.pas);
			// }
		}
	}, [res.isDataLoading]);

	// useEffect(() => {
	// 	console.log("App useEffect authContext.user", authContext.user);
	// 	if (authContext.loginData) {
	// 		console.log("App authContext.loginData", authContext.loginData);
	// 		if (authContext.loginData.log && authContext.loginData.pas) {
	// 			getData(authContext.loginData);
	// 		}
	// 	}
	// }, [authContext.user]);

	useEffect(() => {
		// basketApi({action:'clear'})
		loadAssetsAsync();
		setTimeout(() => {
			setIsSavedLoginDataChecked(true);
		}, 5000);
	}, []);

	const loadAssetsAsync = async () => {
		await Font.loadAsync({
			Neuron: require("./../../assets/fonts/Neuron.otf"),
			"Neuron-Bold": require("./../../assets/fonts/Neuron-Bold.otf"),
			"Neuron-Heavy": require("./../../assets/fonts/Neuron-Heavy.otf"),
			Segoe: require("./../../assets/fonts/segoe-ui.ttf"),
		});

		setfontLoaded(true);
	};

	const addToFavorite = (id) => {
		let _favorite: Array<number> = favorite;
		let prodId = parseInt(id);
		if (favorite.includes(prodId)) {
			// console.log('favorite125' , typeof favorite);
			_favorite = favorite.filter((item) => {
				return item !== prodId;
			});
		} else {
			_favorite.push(prodId);
		}
		setFavorite(_favorite);
		let data: any = {};
		data.products = _favorite;
		data.userId = authContext.user.id;

		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify(data));
		// console.log('sended-', data)
		fetch(`https://subexpress.ru/apps_api/favorites.php`, {
			method: "POST",
			headers,
			body: formData,
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log('fetch res-', res);
				if (res.success) {
					// if(prod.count === 0){delete state.inBasket[prod.id]}
				}
			});

		// console.log("addToFavorite", favorite);
	};
	const sendMail = async (data) => {
		let success: boolean = false;
		data["userId"] = authContext.user.id;
		console.log("sendMail", data);
		await fetch(`https://subexpress.ru/apps_api/email.php`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log("fetch res-", res);

				if (res.success) {
					// console.log("fetch success");
					// if(prod.count === 0){delete state.inBasket[prod.id]}
				}
				success = res.success;
			});
		return success;
	};

	if (!fontLoaded || !isSavedLoginDataChecked) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Loading></Loading>
			</View>
		);
	}

	// if (!user.id) {
	// 	return (
	// 		<LoginForm
	// 			login={login}
	// 			userError={userError}
	// 		/>
	// 	);
	// }
	const context = {
		catalog: catalog,
		products: products,
		stocks: stocks,
		favorite: favorite,
		addToFavorite: addToFavorite,
		sendMail: sendMail,
	};
	// console.log("user", user);
	// console.log("user", user);
	// console.log("basket ctx", basket);

	if (!fontLoaded) return null;
	return (
		<>
			<StatusBar barStyle="dark-content" />

			<NavigationContainer>
				<AppContext.Provider value={context}>
					<BasketContainer>
						<AppNav key="app" screenProps={context} />
					</BasketContainer>
				</AppContext.Provider>
			</NavigationContainer>
		</>
	);
};
const AppWrap = () => {
	return (
		<AppContainer>
			<App />
		</AppContainer>
	);
};
export default AppWrap;

// Keystore credentials
//   Keystore password: 0f45834b5f014368a158de89bbf34ca1
//   Key alias:         QHZsYWRrb3JuL3N1YmV4cHJlc3M=
//   Key password:      6183fb8ef6ed47ac98e168eb30ec9062

//   Path to Keystore:  /work/sub_apps/subexpress/subexpress.jks

// firebase
// sub-apps
// Project ID: lknsdh2m1c

// basket1
// width: 22.5,
// height: 20,

// subexpress_expo
// subexpress-expo
// subexpress-expo@pc-api-5529830029204261862-925.iam.gserviceaccount.com
