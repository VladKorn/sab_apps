import React from "react";
import { View, Text, ScrollView, SafeAreaView , TextInput} from "react-native";
import ProductItem from "./ProductItem";
import appStyles from "./appStyles";

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
            search: 's',
            // searchRes: [], 
            searchRes: [1949 ,1946 ,1355], 
        };
        this.onSearch = this.onSearch.bind(this);

        
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 500)
    }
    shouldComponentUpdate(nextProps, nextState){
        // console.log(nextProps.screenProps.favorite.length , this.props.screenProps.favorite.length);
        // if(nextProps.screenProps.favorite.length !== this.props.screenProps.favorite.length){
        //     return true
        // } else{
        //     return this.state.isLoading
        // }
        if(nextState.search.length !== this.state.search.length){
            return true;
        }else{

            return this.state.isLoading 
        }
    }
    static navigationOptions = {
        title: "Меню"
    };
    onSearch(text){
        if(text.length > 2){
            this.setState({search: text});

            fetch(`https://subexpress.ru/apps_api/search.php/?search=${text}`).then(res=>res.json()).then(res=>{
                this.setState({searchRes: res.products.map(item=>{return parseInt(item)})});
                console.log('searchRes' ,this.state.searchRes);
            });
        }
    }
    render() {
        console.log('render');

        if (this.state.isLoading) {
            return( <Text>Loading...</Text>);
        }
        const catId = this.props.navigation.state.params ? this.props.navigation.state.params.catId : false;
        // console.log('nav',this.props.screenProps.catalog[123]);
        
        let catalog = {};
        if(catId && this.props.screenProps.catalog[catId] ){
            catalog[catId] = this.props.screenProps.catalog[catId];
        } else {
            catalog = this.props.screenProps.catalog ;
        }
        // let products = []
        // if(){

        // }else{

        // }
        const products = this.props.screenProps.products;
        // console.log('products' , products);
        let cats = catalog
            ? Object.keys(catalog).map(key => {
                  let cat = catalog[key];
                  let items = cat.products
                      ? cat.products.map(pkey => {
                            let item = products[pkey];
                            // console.log('item' , this.state.searchRes ,pkey);
                            if(!this.state.searchRes.includes(parseInt (pkey)) ){return false}
                            const isFavorite = this.props.screenProps.favorite.includes(parseInt(item.id) )
                            // console.log('render' , item.id);
                            return (

                                <ProductItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    price={item.price}
                                    basketApi={this.props.screenProps.basketApi}
                                    addToFavorite={this.props.screenProps.addToFavorite}
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
                {/* <Text>{this.props.navigation}</Text> */}
                <ScrollView style={{
                   
                }}>
                    <View>
                        <Text>{this.state.search}{this.state.searchRes.length}</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) =>this.onSearch(text)}
                            // value={this.state.text}
                        />
                    </View>
                    {cats}


                </ScrollView>
            </SafeAreaView>
        );
    }
}
