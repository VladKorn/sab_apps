import React, { Component } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import ProductItem from "./ProductItem";
import appStyles from "./appStyles";
import Loading from "./Loading";
import InputSearch from "./InputSearch";
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
        const reset = nextProps.navigation?.state?.params?.reset || false;
        // console.log("shouldComponentUpdate10" , this.props.searchText.length , reset);
        if(reset !== this.state.reset){
            this.setState({reset: reset})
            this.props.search('');
            
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
        }, 30);
        setTimeout(() => {
			this.forceUpdate()
		}, 100);
    }
    componentDidUpdate(prevProps , prevState){
        console.log('componentDidUpdate' , this.state.search)
        console.log('componentDidUpdate catId' , this.props.navigation?.state?.params?.catId)
        if(this.state.search){
            if(this.props.navigation?.state?.params?.catId === 0){

                this.setState({ search: '' });
                
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
		// console.log('products' , products);
		catalog
			? Object.keys(catalog).map(key => {
					let cat = catalog[key];
					let items = [];
					cat.products
						? cat.products.map(pkey => {
								let item = products[pkey];
								let isIncludet = true;
								// console.log('item' , this.state.searchRes ,pkey);

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

								// is in inner category
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
								//
								const isFavorite = this.props.favorite.includes(
									parseInt(item.id)
								);
								// console.log('render' , item.id);
								isIncludet
									? items.push({
											key: item.id,
											id: item.id,
											name: item.name,
											img: item.img,
											sort: item.sort,
											price: item.price,
											basketApi: this.props.basketApi,
											addToFavorite: this.props
												.addToFavorite,
											navigation: this.props.navigation,
											isFavorite: isFavorite,
											searchWords: this.props.searchText.split(
												" "
											)
									  })
									: null;
						  })
                        : [];
                    items.sort((a, b) => a.sort < b.sort ? -1 : 1)
					data.push({
						title: cat.name,
						data: items
					});
			  })
			: [];
		// return null;
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
				renderItem={({ item }) => <ProductItem {...item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={[appStyles.sectTitle, { marginLeft: 25 }]}>
						{title}
					</Text>
				)}
			/>
		);
	}
}
