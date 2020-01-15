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
        this.onChangeSearch = this.onChangeSearch.bind(this);
        
	}
    onChangeSearch(){
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.search();
        }, 700);
    }
	componentDidMount() {
		
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
					})|| []
				});
				// console.log('searchRes' ,this.state.searchRes);
			});
	}
	render() {
        const getHeader = () => {
            return <View style={{ alignItems: "center" ,paddingTop: 25  }}>
            <View
                style={{
                    maxWidth: 335,
                    flexDirection: "row",
                    justifyContent: "center",
                    position: "relative",
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
                    onChangeText={text =>{
                        this.setState({ search: text });
                        this.onChangeSearch();
                        }
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
        </View>;
        };
		return (
            <View style={{flex: 1}}>
            
			<View >
            {/* {getHeader()} */}
                <CatalogCategories
                    getHeader={getHeader}
                    navigation={this.props.navigation}
                    catalog={this.props.screenProps.catalog}
                    products={this.props.screenProps.products}
                    favorite={this.props.screenProps.favorite}
                    addToFavorite={this.props.screenProps.addToFavorite}
                    basketApi={this.props.screenProps.basketApi}
                    searchRes={this.state.searchRes}
                    search={this.state.search}
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
