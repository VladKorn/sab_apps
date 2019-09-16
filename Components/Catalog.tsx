import React from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TextInput,
	Button,
	TouchableOpacity,
	Image,
	StyleSheet
} from "react-native";
import ProductItem from "./ProductItem";

import appStyles from "./appStyles";
import Basket from "./Basket";
interface State {
	data: object;
	isLoading: boolean;
	search: string;
	searchRes: Array<number>;
}

export default class Catalog extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
			search: "",
			searchRes: []
			// searchRes: [1949 ,1946 ,1355],
		};
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 500);
	}
	shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps.screenProps.favorite.length , this.props.screenProps.favorite.length);
		// if(nextProps.screenProps.favorite.length !== this.props.screenProps.favorite.length){
		//     return true
		// } else{
		//     return this.state.isLoading
		// }
		if (nextState.searchRes.length !== this.state.searchRes.length) {
			return true;
		} else if (this.props.navigation.state.params) {
			if (
				nextProps.navigation.state.params.innerCatId !==
					this.props.navigation.state.params.innerCatId ||
				nextProps.navigation.state.params.catId !==
					this.props.navigation.state.params.catId
			) {
			}
			return true;
		} else {
			return this.state.isLoading;
		}
	}
	search() {
		console.log("search", this.state.search);
		fetch(
			`https://subexpress.ru/apps_api/search.php/?search=${this.state.search}`
		)
			.then(res => res.json())
			.then(res => {
				this.setState({
					searchRes: res.products.map(item => {
						return parseInt(item);
					})
				});
				// console.log('searchRes' ,this.state.searchRes);
			});
	}
	render() {
		console.log("render");

		if (this.state.isLoading) {
			return <Text>Loading...</Text>;
		}
		const catId = this.props.navigation.state.params
			? this.props.navigation.state.params.catId
			: false;
		const innerCatId = this.props.navigation.state.params
			? this.props.navigation.state.params.innerCatId
			: false;
		// console.log('nav',this.props.screenProps.catalog[123]);

		let catalog = {};
		if (catId && this.props.screenProps.catalog[catId]) {
			catalog[catId] = this.props.screenProps.catalog[catId];
		} else {
			catalog = this.props.screenProps.catalog;
		}
		// let products = []
		// if(){

		// }else{

		// }
		// console.log('params' , this.props.navigation.state.params);
		const isFavorites = this.props.navigation.state.params
			? this.props.navigation.state.params.isFavorite || false
			: false;

		const products = this.props.screenProps.products;
		// console.log('products' , products);
		let cats = catalog
			? Object.keys(catalog).map(key => {
					let cat = catalog[key];
					let items = cat.products
						? cat.products.map(pkey => {
								let item = products[pkey];
								// console.log('item' , this.state.searchRes ,pkey);

								// is in search
								if (this.state.searchRes.length > 0) {
									if (
										!this.state.searchRes.includes(
											parseInt(pkey)
										)
									) {
										return false;
									}
								}
								// is in favorites
								if (
									isFavorites &&
									!this.props.screenProps.favorite.includes(
										parseInt(item.id)
									)
								) {
									return false;
								}

								// is in inner category
								// console.log('cat' , cat.cats[innerCatId]);
								if (innerCatId) {
									if (
										innerCatId &&
										cat.cats[innerCatId] &&
										cat.cats[innerCatId].products &&
										!cat.cats[innerCatId].products.includes(
											parseInt(item.id)
										)
									) {
										return false;
									}
								}
								//
								const isFavorite = this.props.screenProps.favorite.includes(
									parseInt(item.id)
								);
								// console.log('render' , item.id);
								return (
									<ProductItem
										key={item.id}
										id={item.id}
										name={item.name}
										img={item.img}
										price={item.price}
										basketApi={
											this.props.screenProps.basketApi
										}
										addToFavorite={
											this.props.screenProps.addToFavorite
										}
										navigation={this.props.navigation}
										isFavorite={isFavorite}
										searchWords={this.state.search.split(' ')}
									/>
								);
						  })
						: [];
					return (
						<View key={cat.id}>
							<Text
								style={[
									appStyles.sectTitle,
									{ marginLeft: 25 }
								]}
							>
								{cat.name}
							</Text>
							{items}
						</View>
					);
			  })
			: [];
		// console.log('items' , this.state.data);
		return (
            // this.state.procunts.map
            <View style={{}}>
			<ScrollView style={{ paddingTop: 25 , position: "relative" }}>
				<View style={{ alignItems: "center" }}>
					<View
						style={{
							maxWidth: 335,
							flexDirection: "row",
							justifyContent: "center",
							position: "relative"
						}}
					>
						{/* <Text>
								{this.state.search}
								{this.state.searchRes.length}
							</Text> */}
						<TextInput
							style={{
								height: 40,
								backgroundColor: "#F1F1F1",
								borderWidth: 0,
								borderRadius: 50,
								maxWidth: 335,
								width: "100%",
								paddingLeft: 25
								// color: appStyles.input.color,
							}}
							placeholderTextColor={appStyles.input.color}
							placeholder="Поиск"
							onChangeText={text =>
								this.setState({ search: text })
							}
							// value={this.state.text}
						/>
						<TouchableOpacity
							style={{
								position: "absolute",
								zIndex: 3,
								right: 0,
								height: 40,
								width: 40,
								justifyContent: "center",
								alignItems: "center"
							}}
							onPress={this.search}
						>
							<Image
								style={{ width: 18, height: 18 }}
								source={require("../img/ico-search.png")}
							/>
						</TouchableOpacity>
					</View>
				</View>
				
				
				{cats}
			</ScrollView>
            <Basket
					basket={this.props.screenProps.basket}
					products={this.props.screenProps.products}
					navigation={this.props.navigation}
				/>
        
            </View>
		);
	}
}
