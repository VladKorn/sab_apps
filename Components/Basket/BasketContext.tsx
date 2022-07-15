import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tsBasketApi, tsBasket, MakeOrderData } from "../../interfaces";
import { AuthContext } from "./../Login/Login";
interface IBasketContext {
	basket: tsBasket;
	basketApi: (x: tsBasketApi) => any;
	makeOrder: (x: { address: any; date: any }) => any;
	setOrderData: (obj: { comment: string; promo: string }) => any;
}
export const BasketContext = createContext<IBasketContext | null>(null);
export const BasketContainer = ({ children }) => {
	const [basket, setBasket] = useState<tsBasket>({});
	const [isInit, setIsInit] = useState(false);
	const [comment, setComment] = useState("");
	const [promo, setPromo] = useState("");
	const authContext = useContext(AuthContext);

	const clearEmpty = (_basket: tsBasket): tsBasket => {
		let toClear = [];
		Object.keys(_basket).forEach((id) => {
			if (_basket[id].count === 0) {
				toClear.push(id);
			}
		});
		// console.log("toClear", toClear);
		const x = Object.assign({}, _basket);
		if (toClear.length > 0) {
			toClear.forEach((item) => {
				delete x[item];
			});
			setBasket(x);
			// console.log("basket2", x);
		}
		return x;
	};

	const setOrderData = (data) => {
		// console.log('setOrderData' , data)
		setComment(data.comment);
		setPromo(data.promo);
	};
	// const start = new Date().getTime();
	// 	const end = new Date().getTime();
	// 	console.log("storeBasket", end - start);
	useEffect(() => {
		storeBasket(basket);
		// (async () => {
		// 	console.log("getBasket3", await AsyncStorage.getItem("@basket"));
		// })();
	}, [basket]);
	useEffect(() => {}, [basket]);
	const storeBasket = async (_basket) => {
		if (isInit) {
			// console.log("storeBasket _basket", _basket);
			const __basket = clearEmpty(_basket);
			// console.log("storeBasket __basket", __basket);
			try {
				await AsyncStorage.setItem("@basket", JSON.stringify(__basket));
			} catch (e) {
				// Alert.alert(e);
			}
		}
	};
	const basketApi = (obj: tsBasketApi) => {
		if (obj.action === "setProduct") {
			setBasket((x) => {
				const z = Object.assign({}, x);
				z[obj.params.productId] = { count: obj.params.count };
				return z;
			});
		}
		if (obj.action === "clear") {
			setBasket({});
		}
		if (obj.action === "setBasket") {
			setBasket(obj.params.products);
		}
	};
	const makeOrder = async (obj: { address: any; date: any }) => {
		const data: MakeOrderData = {
			userId: authContext.user.id,
			promo: promo,
			products: basket,
			comment: `(from mobile app) ` + comment,
			address: obj.address,
			deliveryDate: obj.date,
		};
		// console.log("makeOrder data", data);

		// data.userId = user.id;
		// data.promo = promo;
		// data.comment = `(from mobile app) ` + comment;
		// data.address = obj.address;
		// data.products = basket;
		// data.deliveryDate = obj.date;

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
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((res) => {
				// console.log("order fetch res-", res);
				if (res.success) {
					// return "success";
					basketApi({ action: "clear" });
					// alert("ok");
				} else {
					// return "error";
					alert(res.error);
				}
				return res;
			});
		return success;
	};
	const getBasket = async () => {
		try {
			const locBasket = await AsyncStorage.getItem("@basket");
			const _basket = locBasket || JSON.stringify({});
			console.log("locBasket , _basket", locBasket, _basket);
			console.log("getBasket", await AsyncStorage.getItem("@basket"));
			setIsInit(true);
			if (_basket) {
				setBasket(JSON.parse(_basket));
			}
			console.log("getBasket", basket);
			return basket;
		} catch (e) {
			// Alert.alert(e);
		}
	};
	useEffect(() => {
		// basketApi({ action: "clear" });
		getBasket();
	}, []);

	return (
		<BasketContext.Provider
			value={{
				basket: basket,
				basketApi: basketApi,
				makeOrder: makeOrder,
				setOrderData: setOrderData,
			}}
		>
			{children}
		</BasketContext.Provider>
	);
};
