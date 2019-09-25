import React, { Component } from 'react'
import {
	View,
	Text
} from "react-native";
import ProductItem from "./ProductItem";
import appStyles from "./appStyles";

export default class CatalogCategories extends Component<any , any> {
    constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
			search: "",
			searchRes: []
			// searchRes: [1949 ,1946 ,1355],
		};
		// this.search = this.search.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps.screenProps.favorite.length , this.props.screenProps.favorite.length);
		// if(nextProps.screenProps.favorite.length !== this.props.screenProps.favorite.length){
		//     return true
		// } else{
		//     return this.state.isLoading
        // }
        // return true;
		// if (Object.keys(nextProps.screenProps.basket).length !== Object.keys(this.props.screenProps.basket).length) {
		// 	return true;        
        // }        
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
			}
			return true;
		} else {
			return this.state.isLoading;
		}
    }
                   
    componentDidMount(){
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 50);
    }    
    render() {
        if(this.state.isLoading){return null}
    
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
		// let products = []
		// if(){

		// }else{

		// }
		// console.log('params' , this.props.navigation.state.params);
		const isFavorites = this.props.navigation.state.params
			? this.props.navigation.state.params.isFavorite || false
			: false;

		const products = this.props.products;
		// console.log('products' , products);
		let cats = catalog
			? Object.keys(catalog).map(key => {
					let cat = catalog[key];
					let items = cat.products
						? cat.products.map(pkey => {
								let item = products[pkey];
								// console.log('item' , this.state.searchRes ,pkey);

								// is in search
								if (this.props.searchRes.length > 0) {
									if (
										!this.props.searchRes.includes(
											parseInt(pkey)
										)
									) {
										return false;
									}
								}
								// is in favorites
								if (
									isFavorites &&
									!this.props.favorite.includes(
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
								const isFavorite = this.props.favorite.includes(
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
											this.props.basketApi
										}
										addToFavorite={
											this.props.addToFavorite
										}
										navigation={this.props.navigation}
										isFavorite={isFavorite}
										searchWords={this.props.search.split(' ')}
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
        return (
            <View>
                {cats}
               
            </View>
        )
    }
}
