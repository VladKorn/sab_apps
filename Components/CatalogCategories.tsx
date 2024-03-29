import React, { Component } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import ProductItem from "./ProductItem";
import appStyles from "./appStyles";
import Loading from "./Loading";
import InputSearch from "./InputSearch";
import { ScrollView } from "react-native-gesture-handler";
export default class CatalogCategories extends Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
			search: "",
			searchRes: [],
			reset: 0
			// searchRes: [1949 ,1946 ,1355],
		};
		// this.search = this.search.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log("shouldComponentUpdate12 navigation state", nextProps.navigation.state);
		const reset = nextProps.navigation?.state?.params?.reset || false;
		if (reset !== this.state.reset) {
			this.setState({ reset: reset });
			this.props.search("");
		}
		// return true;
		// if(reset && this.props.searchText.length){
		// }
		// return true;
		// console.log(nextProps.screenProps.favorite.length , this.props.screenProps.favorite.length);
		// if(nextProps.favorite.length !== this.props.favorite.length){
		//     return true
		// }
		const isFavorites = this.props.navigation.state.params
			? this.props.navigation.state.params.isFavorite || false
			: false;
		if (isFavorites) {
			return true;
		}
		// return true;
		// if (Object.keys(nextProps.screenProps.basket).length !== Object.keys(this.props.screenProps.basket).length) {
		// 	return true;
		// }
		// console.log(this.props.navigation.state);
		if (nextProps.searchRes.length !== this.props.searchRes.length) {
			return true;
		}
		if (this.props.navigation.state.params) {
			if (
				nextProps.navigation.state.params.innerCatId !==
					this.props.navigation.state.params.innerCatId ||
				nextProps.navigation.state.params.catId !==
					this.props.navigation.state.params.catId
			) {
				return true;
			}
		} else {
			if (
				nextProps.navigation.state.params &&
				!this.props.navigation.state.params
			) {
				return true;
			}
			return this.state.isLoading;
		}
		return false;
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 310);
		setTimeout(() => {
			this.forceUpdate();
		}, 100);
	
		// const didBlurSubscription = this.props.navigation.addListener(
		// 	'didFocus',
		// 	payload => {
		// 	  console.log('didFocus', payload);
		// 	  setTimeout(()=>{
		// 		    console.log('setTimeout forceUpdate');
		// 		  this.forceUpdate()

		// 	  },1350)
		// 	//   console.log('didBlur', payload);
		// 	}
		//   );
		  
		  // Remove the listener when you are done
		//   didBlurSubscription.remove();
	  
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate", this.state.search);
		if (this.state.search) {
			if (this.props.navigation?.state?.params?.catId === 0) {
				this.setState({ search: "" });
			}
		}
	}

	render() {
		if (this.state.isLoading) {
			return null;
		}
		const catId = this.props.navigation.state.params
			? this.props.navigation.state.params.catId
			: false;
		const innerCatId = this.props.navigation.state.params
			? this.props.navigation.state.params.innerCatId
			: false;
		// console.log('nav',this.props.catalog[123]);

		let catalog = {};
		if (catId && this.props.catalog[catId]) {
			catalog[catId] = this.props.catalog[catId];
		} else {
			catalog = this.props.catalog;
		}
		const isFavorites = this.props.navigation.state.params
			? this.props.navigation.state.params.isFavorite || false
			: false;
		// console.log('isFavorites' , isFavorites);

		const products = this.props.products;
		let data = [];
		let nestedData = {};
		// console.log('products' , products);
		// console.log("catalog", catalog);

		catalog
			? Object.keys(catalog).map(key => {
					let cat = catalog[key];
					let items = [];

					if (cat.cats) {
						Object.keys(cat.cats).forEach(id => {
							if (![114, 115, 119, 121].includes(parseInt(id))) {
								const catNested = cat.cats[id];
								nestedData[id] = {
									title: catNested.name,
									data: []
								};
							}
						});
					}
					cat.products
						? cat.products.map(pkey => {
								let item = products[pkey];
								let isIncludet = true;
								let isNested = false;
								// console.log("item", item);

								// is in search
								if (this.props.searchRes.length > 0) {
									if (
										!this.props.searchRes.includes(
											parseInt(pkey)
										)
									) {
										isIncludet = false;
									}
								}
								// is in favorites
								if (
									isFavorites &&
									!this.props.favorite.includes(
										parseInt(item.id)
									)
								) {
									isIncludet = false;
								}

								// inner category
								if (innerCatId && cat?.cats) {
									// console.log('innerCatId' , innerCatId, cat.cats[innerCatId]);
									if (
										cat?.cats[innerCatId] &&
										cat.cats[innerCatId]?.products &&
										!cat.cats[innerCatId].products.includes(
											parseInt(item.id)
										)
									) {
										isIncludet = false;
									}
								}
								//   remove an item if it is contained in a nested category
								if (cat?.cats) {
									const cats = Object.keys(cat?.cats) || [];
									cats.forEach(id => {
										cat.cats[id].products.includes(
											parseInt(item.id)
										)
											? (isNested = true)
											: null;
									});
								}
								//End remove an item if it is contained in a nested category

								//
								const isFavorite = this.props.favorite.includes(
									parseInt(item.id)
								);
								// console.log('render' , item.id);
								const itemFields = {
									key: item.id,
									id: item.id,
									name: item.name,
									img: item.img,
									sort: item.sort,
									price: item.price,
									basketApi: this.props.basketApi,
									addToFavorite: this.props.addToFavorite,
									navigation: this.props.navigation,
									isFavorite: isFavorite,
									searchWords: this.props.searchText.split(
										" "
									)
								};
								if (isIncludet) {
									if (!isNested) {
										items.push(itemFields);
									} else {
										if (item.parentCategoryId === 114) {
											item.parentCategoryId = 113;
										}
										if (item.parentCategoryId === 115) {
											item.parentCategoryId = 113;
										}
										if (item.parentCategoryId === 119) {
											item.parentCategoryId = 118;
										}
										if (item.parentCategoryId === 121) {
											item.parentCategoryId = 120;
										}
										nestedData[
											item.parentCategoryId
										]?.data.push(itemFields);
										// itemsNested.push(itemFields);
									}
								}
						  })
						: [];

					items.sort((a, b) => (a.sort < b.sort ? -1 : 1));
					data.push({
						sort: cat.id,
						title: cat.name,
						data: items
					});
			  })
			: [];
		// return null;
		// console.log({ nestedData });
		Object.keys(nestedData).forEach(id => {
			nestedData[id].data.sort((a, b) => (a.sort < b.sort ? -1 : 1));
			data.push({
				sort: id,
				title: nestedData[id].title,
				data: nestedData[id].data
			});
		});
		data.sort((a, b) => (a.sort < b.sort ? -1 : 1));
		// console.log({ data });

		return (
			<SectionList
				// ListHeaderComponent={this.props.getHeader}
				ListHeaderComponent={
					<InputSearch
						initialText={this.props.searchText}
						search={this.props.search}
						navigation={this.props.navigation}
					></InputSearch>
				}
				sections={data}
				keyExtractor={(item: any, index) => item.id + index}
				stickySectionHeadersEnabled={false}
				renderItem={({ item }) => (
					<ProductItem {...item} basket={this.props.basket} />
				)}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={[appStyles.sectTitle, { marginLeft: 25 }]}>
						{title}
					</Text>
				)}
			/>
		);
	}
}
