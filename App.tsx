import React from "react";
import { View, Alert , StatusBar} from "react-native";

import * as Font from "expo-font";
// import LoginForm from "./Components/LoginForm";
import AppContainer from "./Components/AppContainer";
import Loading from "./Components/Loading";

// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage  } from "react-native";
import CryptoJS from "crypto-js";

import { MakeOrderData, tsBasketApi, tsBasket , LoginData} from "./interfaces";
interface User {
	id: number;
}


interface State {
	user: User;
	catalog: object;
	basket: tsBasket;
	products: object;
	isLoading: boolean;
	fontLoaded: boolean;
	stocks: object;
	favorite: Array<number>;
	userError: object;
	comment: string;
    promo: string;
    isSavedLoginDataChecked: boolean;
}
export default class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			user: { id: null },
			catalog: {},
			favorite: [],
			products: {},
			stocks: {},
			basket: null,
			isLoading: false,
            fontLoaded: false,
            isSavedLoginDataChecked: false,
			userError: {},
			comment: "",
            promo: "",
		};

		// bind functions..
		this.getCatalog = this.getCatalog.bind(this);
		this.basketApi = this.basketApi.bind(this);
		this.getData = this.getData.bind(this);
		this.openProduct = this.openProduct.bind(this);
		this.addToFavorite = this.addToFavorite.bind(this);
		this.setOrderData = this.setOrderData.bind(this);
		this.login = this.login.bind(this);
		this.makeOrder = this.makeOrder.bind(this);
		this.sendMail = this.sendMail.bind(this);
		this.logout = this.logout.bind(this);
        this.autoLogin = this.autoLogin.bind(this);
        this.saveLoginData = this.saveLoginData.bind(this);
        
    }
 
	componentDidMount() {
        // console.log('componentDidMount');
		this.loadAssetsAsync();
		this.autoLogin();
		const getBasket = async () => {
			try {
				const basket = await AsyncStorage.getItem("@basket") || JSON.stringify({});
				// console.log('basket1' , basket);
				if (basket) {
					this.setState({ basket: JSON.parse(basket) });
				}
				return basket;
			} catch (e) {
				Alert.alert(e);
			}
		};
        getBasket();
        setTimeout(()=>{
            this.setState({isSavedLoginDataChecked: true});
        }, 5000)
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
	basketApi(obj: tsBasketApi) {
		const storeBasket = async basket => {
			try {
				await AsyncStorage.setItem("@basket", JSON.stringify(basket));
			} catch (e) {
				Alert.alert(e);
			}
		};
		let basket = this.state.basket;
		if (obj.action === "setProduct") {
			if (obj.params.count === 0) {
				delete basket[obj.params.productId];
			} else {
				basket[obj.params.productId] = { count: obj.params.count };
			}
			this.setState({ basket: basket });
			// console.log("this.state.basket", this.state.basket);
			storeBasket(basket);
		}
		if (obj.action === "clear") {
			this.setState({ basket: {} });
			storeBasket({});
		}
		if (obj.action === "setBasket") {
			this.setState({ basket: obj.params.products });
			storeBasket({});
		}
	}
	openProduct() {}
	getCatalog() {}
	async getData(loginData: LoginData) {
        // let res = false;
		const getData = async (loginData:LoginData) => {
			// console.log("getData", loginData);
			return await fetch("https://subexpress.ru/apps_api/", {
				method: "post",
				body: JSON.stringify({ loginData: loginData })
			})
				.then(res => res.json())
				.then(res => {
                    this.setState({isSavedLoginDataChecked: true});
					if (res.user && res.user.error) {
                        // alert("getData fetch " + res.user.error);
                        // console.log('user' , res.user.error)
                        // return res.user;
                        
					}
					// console.log("fetch res stocks", res.stocks);
					this.setState({
						isLoading: false,
						userError: res.userError,
						catalog: res.catalog.cats,
						products: res.catalog.products,
						user: res.user,
						stocks: res.stocks,
						favorite: res.user.favorite || []
					});
					if (res.user && res.user.id && loginData.mode !== 'forgot' && loginData.save) {
						this.saveLoginData(loginData.log, res.user.pas);
					}

                    console.log('getData res' , res);
                    return res.user;
				})
				.catch(error => {
					// console.error(error);
                    alert("getData fetch error" + error);
				});
		};
        return await getData(loginData);
        // console.log('getData await res' , getData ,res);
		// return res;
	}
	setOrderData(data) {
		// console.log('setOrderData' , data)
		this.setState({ comment: data.comment, promo: data.promo });
	}
	async makeOrder(obj: MakeOrderData) {
		// console.log("makeOrder");
		const data: MakeOrderData = {
			userId: this.state.user.id,
			promo: this.state.promo,
			products: this.state.basket,
			comment: `(from mobile app) ` + this.state.comment,
			address: obj.address,
			deliveryDate: obj.date
		};
		// data.userId = this.state.user.id;
		// data.promo = this.state.promo;
		// data.comment = `(from mobile app) ` + this.state.comment;
		// data.address = obj.address;
		// data.deliveryDate = obj.date;

		// data.products = this.state.basket;

		let headers = new Headers();
		headers.set("Accept", "application/json");
		let formData = new FormData();
		formData.append("json", JSON.stringify(data));

		// console.log("order sended-", JSON.stringify(data));
		const success = await fetch(
			`https://subexpress.ru/apps_api/order.php`,
			{
				method: "POST",
				headers,
				body: formData
			}
		)
			.then(res => res.json())
			.then(res => {
				// console.log("order fetch res-", res);
				if (res.sucsess) {
					return "success";
					// alert("ok");
				} else {
					return "error";
				}
			});
		return success;
	}
	
	async login(loginData: LoginData) {
		if (loginData.save && loginData.mode !== 'signUp') {
            this.saveLoginData(loginData.log, loginData.pas);
			// console.log('storeData' , storeData);
		}
		// const res = await this.getData(loginData);
        return await this.getData(loginData);
        
        // return 'resasd';

	}
	autoLogin() {
        // console.log('_autoLogin');
		let loginData: LoginData = { log: '', pas: '' };
		const getLoginData = async loginData => {
			try {
				const cryptedLog = await AsyncStorage.getItem("@log");
				const cryptedPas = await AsyncStorage.getItem("@pas");
				const decryptedLog = CryptoJS.AES.decrypt(
					cryptedLog,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				const decryptedPas = CryptoJS.AES.decrypt(
					cryptedPas,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				// console.log('decryptedLog' , decryptedLog);
				// console.log("autoLogin @pas", decryptedPas);
				// console.log("autoLogin @log", decryptedLog);
				if (
					cryptedLog !== null &&
					cryptedLog !== "" &&
					cryptedPas !== null
				) {
					if (!loginData.isSignUp) {
						loginData["log"] = decryptedLog;
						loginData["pas"] = decryptedPas;
                    }
                    
                    
                    
				}
			} catch (e) {
				// alert("getLoginData" + e);
            }
            
            this.login(loginData);
		};
		getLoginData(loginData);
	}
	saveLoginData(log, pas) {
		// console.log("saveLoginData", log, pas);
		const storeData = async (log, pas) => {
			try {
                if(log){
                    const encryptedLog = CryptoJS.AES.encrypt(
                        log,
                        "F24czi3II092Xnrhc"
                    ).toString();
                    await AsyncStorage.setItem("@log", encryptedLog);
                }
                if(pas){
                    const encryptedPas = CryptoJS.AES.encrypt(
                        pas,
                        "F24czi3II092Xnrhc"
                    ).toString();
                    // console.log('encryptedLog' , encryptedLog)
                    await AsyncStorage.setItem("@pas", encryptedPas);
                }
			} catch (e) {
				alert("saveLoginData error " + e);
				// saving error
			}
		};
		storeData(log, pas);
	}
	logout() {
		AsyncStorage.setItem("@log", "");
		AsyncStorage.setItem("@pas", "");
		// this.login({pas: '' , log: ''});
		this.setState({ user: { id: null } });
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
		// console.log('sended-', data)
		fetch(`https://subexpress.ru/apps_api/favorites.php`, {
			method: "POST",
			headers,
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				// console.log('fetch res-', res);
				if (res.sucsess) {
					// if(prod.count === 0){delete state.inBasket[prod.id]}
				}
			});

		// console.log("addToFavorite", this.state.favorite);
	}
	async sendMail(data) {
		let success: boolean = false;
		data["userId"] = this.state.user.id;
		// console.log("sendMail", data);
		await fetch(`https://subexpress.ru/apps_api/email.php`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(res => {
				// console.log('fetch res-', res.success);

				if (res.success) {
					// console.log("fetch sucsess");
					// if(prod.count === 0){delete state.inBasket[prod.id]}
				}
				success = res.success;
			});
		return success;
	}
	render() {
		if (!this.state.fontLoaded || !this.state.isSavedLoginDataChecked) {
			return (<View style={{flex:1 , justifyContent: 'center'}}><Loading></Loading></View>);
		}

		// if (!this.state.user.id) {
		// 	return (
		// 		<LoginForm
		// 			login={this.login}
		// 			userError={this.state.userError}
		// 		/>
		// 	);
		// }
		return this.state.fontLoaded ? (
            <>
<StatusBar barStyle="dark-content" /> 

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
					setOrderData: this.setOrderData,
					addToFavorite: this.addToFavorite,
					sendMail: this.sendMail,
                    logout: this.logout,
                    login: this.login,
                    autoLogin: this.autoLogin,
                    saveLoginData: this.saveLoginData,
				}}
			/>
               
            </>
		) : null;
	}
}

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
