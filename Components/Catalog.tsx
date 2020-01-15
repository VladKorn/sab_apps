import React from "react";
import {
	View,
	Text,
	ScrollView,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet
} from "react-native";

import CatalogCategories from "./CatalogCategories";


import appStyles from "./appStyles";
import Basket from "./Basket";
interface State {
	data: object;
	search: string;
    searchRes: Array<number>;
}

export default class Catalog extends React.Component<any, State> {
    timer: any;
	constructor(props) {
		super(props);
		this.state = {
		
			data: [],
			search: "",
			searchRes: []
            // searchRes: [1949 ,1946 ,1355],
            
        };
        this.timer = null;
        this.search = this.search.bind(this);
        
	}

	search(text:string) {
        console.log("search", text);
        this.setState({search: text});
		fetch(
			`https://subexpress.ru/apps_api/search.php/?search=${text}`
		)
			.then(res => res.json())
			.then(res => {
                console.log('res' , res)
                if(res.products){
                    this.setState({
                        searchRes: res.products.map(item => {
                            return parseInt(item);
                        })|| []
                    });
                } else{
                    this.setState({
                        searchRes: []
                    });
                }
				// console.log('searchRes' ,this.state.searchRes);
			});
	}
	render() {
       
		return (
            <View style={{flex: 1}}>
            
			<View >
            {/* {getHeader()} */}
                <CatalogCategories
                    // getHeader={getHeader}
                    navigation={this.props.navigation}
                    catalog={this.props.screenProps.catalog}
                    products={this.props.screenProps.products}
                    favorite={this.props.screenProps.favorite}
                    addToFavorite={this.props.screenProps.addToFavorite}
                    basketApi={this.props.screenProps.basketApi}
                    searchRes={this.state.searchRes}
                    searchText={this.state.search}

                    search={this.search}
                />
				
				{/* {cats} */}
			</View>
            <Basket
					basket={this.props.screenProps.basket}
					products={this.props.screenProps.products}
					navigation={this.props.navigation}
				/>
        
            </View>
		);
	}
}
