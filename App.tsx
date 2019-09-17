import React from "react";
import { View, ShadowPropTypesIOS, Text, Alert } from "react-native";

import * as Font from "expo-font";
import LoginForm from "./Components/LoginForm";
import AppContainer from "./Components/AppContainer";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from "react-native";
import CryptoJS from "crypto-js";

import {MakeOrderData , tsBasketApi , tsBasket} from './interfaces';
interface User {
    id: number;
}
interface LoginData {
    log?: string
    pas?: string
    save?: boolean;
    name?: string,
    phone?: string,
    isSignUp?: false
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
}
export default class App extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			user: {id: null},
			catalog: {},
			favorite: [],
			products: {},
			stocks: {},
			basket: null,
			isLoading: false,
			fontLoaded: false,
			userError: {},
			comment: "",
			promo: ""
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
	}
	componentDidMount() {
		this.loadAssetsAsync();
		this.getData({});

		const getBasket = async () => {
			try {
				const basket = await AsyncStorage.getItem("@basket");
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
	basketApi(obj:tsBasketApi) {
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
            console.log('this.state.basket', this.state.basket);
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
	getData(loginData) {


        // log: null,
        // pas: null,
        // name: null,
        // phone: null,
        // save: true,
        // isSignUp: false

        // this._saveLoginData(loginData.log , loginData.pas);

		const getData = async (loginData) => {
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
                    if(!loginData.isSignUp){
                        loginData['log'] = decryptedLog;
                        loginData['pas'] = decryptedPas;
                    }
                    // console.log("@pas", decryptedPas);
                    // console.log("@log", decryptedLog);
					// value previously stored
					//

					
                    // console.log('getData' , loginData);

					return fetch("https://subexpress.ru/apps_api/", {
						method: "post",
						body: JSON.stringify(loginData)
					})
						.then(res => res.json())
						.then(res => {
                            if(res.error){alert(res.error)}
							// console.log('login res' , res);
							this.setState(
								{
									isLoading: false,
									userError: res.userError,
									catalog: res.catalog.cats,
									products: res.catalog.products,
									user: res.user,
									stocks: res.stocks,
									favorite: res.favorite
								}
                            );
                            if(loginData.isSignUp && loginData.save){
                                this._saveLoginData(loginData.log , res.user.pas);
                            }

							// console.log('login res' , res);
						})
						.catch(error => {
							console.error(error);
						});
				}
			} catch (e) {
                // error reading value
                alert(e);
			}
		};
		getData(loginData);
	}
	setOrderData(data) {
		// console.log('setOrderData' , data)
		this.setState({ comment: data.comment, promo: data.promo });
	}
	async makeOrder(obj: MakeOrderData) {
		console.log("makeOrder");
        const data:MakeOrderData={
            userId : this.state.user.id,
            promo : this.state.promo,
            products: this.state.basket,
            comment : `(from mobile app) ` + this.state.comment,
            address : obj.address,
            deliveryDate : obj.date,
        }
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

		console.log("order sended-", JSON.stringify(data));
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
		fetch(`https://subexpress.ru/apps_api/favorites.php`, { method: "POST", headers, body: formData })
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
        let success:boolean = false;
        data['userId'] = this.state.user.id;
		console.log("sendMail", data);
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
                    console.log('fetch sucsess');
					// if(prod.count === 0){delete state.inBasket[prod.id]}
                }
                success = res.success;
            });
        return success;
	}
	login(loginData:LoginData) {
        console.log('login', loginData.log , loginData.pas)
        this.getData(loginData);

		if (loginData.save&&!loginData.isSignUp) {
            this._saveLoginData(loginData.log , loginData.pas);
			// console.log('storeData' , storeData);
		}
    }
    _saveLoginData(log , pas){
        console.log('_saveLoginData' , log , pas);
        const storeData = async (log , pas) => {
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
        storeData(log , pas);
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
					setOrderData: this.setOrderData,
					addToFavorite: this.addToFavorite,
					sendMail: this.sendMail
				}}
			/>
		) : null;
	}
}


// Keystore credentials
//   Keystore password: 0f45834b5f014368a158de89bbf34ca1
//   Key alias:         QHZsYWRrb3JuL3N1YmV4cHJlc3M=
//   Key password:      6183fb8ef6ed47ac98e168eb30ec9062

//   Path to Keystore:  /work/sub_apps/subexpress/subexpress.jks


// basket1
// width: 22.5,
// height: 20,