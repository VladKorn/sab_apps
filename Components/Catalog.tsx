import { useState, useContext } from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
// import {AppContext} from "./BasketContext"
import { AppContext } from "./App/Context";

import CatalogCategories from "./CatalogCategories";

import appStyles from "./appStyles";
import Basket from "./Basket/Basket";
interface State {
	data: object;
	search: string;
	searchRes: Array<number>;
}
interface Props {}

const Catalog = (props: Props) => {
	let timer: any = null;
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchRes, setSearchRes] = useState([]);
	const appContext = useContext(AppContext);

	const search = (text: string) => {
		// console.log("search", text);
		setSearchText(text);
		fetch(`https://subexpress.ru/apps_api/search.php/?search=${text}`)
			.then((res) => res.json())
			.then((res) => {
				// console.log('res' , res)
				if (res.products) {
					setSearchRes(
						res.products.map((item) => {
							return parseInt(item);
						}) || []
					);
				} else {
					setSearchRes([]);
				}
				// console.log('searchRes' ,this.state.searchRes);
			});
	};
	// componentDidUpdate(prevProps , prevState){
	// 	console.log('componentDidUpdate navigation' , prevProps.navigation)
	// }
	const screenProps = appContext;
	return (
		<View style={{ flex: 1 }}>
			<View>
				{/* {getHeader()} */}
				{/* <AppContext.Provider value={screenProps.basket}> */}

				<CatalogCategories
					// getHeader={getHeader}
					catalog={screenProps.catalog}
					products={screenProps.products}
					favorite={screenProps.favorite}
					addToFavorite={screenProps.addToFavorite}
					basket={screenProps.basket}
					searchRes={searchRes}
					searchText={searchText}
					search={search}
				/>

				{/* {cats} */}
				{/* </AppContext.Provider> */}
			</View>
			<Basket />
		</View>
	);
};
export default Catalog;
