import React from "react";
import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";
import ProductItem from "./ProductItem";
import appStyles from "./appStyles";

interface State {
    data: object;
    isLoading: boolean;
}
export default class Catalog extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        };
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({isLoading: false});

        }, 1000)
    }
    shouldComponentUpdate(nextProps, nextState){
        // console.log(nextProps.screenProps.favorite.length , this.props.screenProps.favorite.length);
        // if(nextProps.screenProps.favorite.length !== this.props.screenProps.favorite.length){
        //     return true
        // } else{
        //     return this.state.isLoading
        // }
        return this.state.isLoading 
    }
    static navigationOptions = {
        title: "Меню"
    };
    render() {
        const catalog = this.props.screenProps.catalog;
        const products = this.props.screenProps.products;
        // console.log('products' , products);
        let cats = catalog
            ? Object.keys(catalog).map(key => {
                  let cat = catalog[key];
                  let items = cat.products
                      ? cat.products.map(pkey => {
                            let item = products[pkey];
                            // console.log('item' , item);
                        
                            const isFavorite = this.props.screenProps.favorite.includes(parseInt(item.id) )
                            console.log('render' , item.id);
                            return (

                                <ProductItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    price={item.price}
                                    basketApi={this.props.screenProps.basketApi}
                                    addToFavorive={this.props.screenProps.addToFavorive}
                                    navigation={this.props.navigation}
                                    isFavorite={isFavorite}
                                />
                            );
                        })
                      : [];
                  return (
                      <View key={cat.id}>
                          <Text style={[appStyles.sectTitle, {marginLeft: 25 }]} >{cat.name}</Text>
                          {items}
                      </View>
                  );
              })
            : [];
        // console.log('items' , this.state.data);
        return (
            // this.state.procunts.map
            <SafeAreaView style={appStyles.page}>
                <ScrollView style={{
                   
                }}>
                    {cats}


                </ScrollView>
            </SafeAreaView>
        );
    }
}
