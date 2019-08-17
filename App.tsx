import React from "react";
import { View, ShadowPropTypesIOS } from "react-native";
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";
import { fromRight , fromBottom } from "react-navigation-transitions";
import * as Font from "expo-font";
import HomeScreen from "./Components/HomeScreen";
import Catalog from "./Components/Catalog";
import News from "./Components/News";
import Order from "./Components/Order";
import CategorySlider from "./Components/CategorySlider";
import Sidebar from "./Components/Sidebar";

interface State {
    user: object;
    catalog: object;
    basket: object;
    products: object;
    isLoading: boolean;
    fontLoaded: boolean;
    stocks: object;
    favorite: Array<number>;
    // productId: number;
}
export default class App extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            catalog: {},
            favorite: [1343, 1343, 1344, 1346, 1239, 1243, 1245, 1354],
            products: {},
            stocks: {},
            basket: {
                "1231": { count: 3 },
                "1246": { count: 6 },
                "1247": { count: 1 }
            },
            isLoading: false,
            fontLoaded: false
        };

        // bind functions..
        this.getCatalog = this.getCatalog.bind(this);
        this.basketApi = this.basketApi.bind(this);
        this.getData = this.getData.bind(this);
        this.openProduct = this.openProduct.bind(this);
        this.addToFavorive = this.addToFavorive.bind(this);
    }
    componentDidMount() {
        this.loadAssetsAsync();
        this.getData();
    }
    loadAssetsAsync = async () => {
        await Font.loadAsync({
            Neuron: require("./assets/fonts/Neuron.otf"),
            "Neuron-Bold": require("./assets/fonts/Neuron-Bold.otf"),
            "Neuron-Heavy": require("./assets/fonts/Neuron-Heavy.otf")
        });
        this.setState({ fontLoaded: true });
    };
    basketApi(obj) {
        let basket = this.state.basket;
        if (obj.action === "setProduct") {
            // console.log('params' , obj.action , obj.params);
            if (obj.params.count === 0) {
                delete basket[obj.params.productId];
            } else {
                basket[obj.params.productId] = { count: obj.params.count };
            }
            this.setState({ basket: basket });
        }
        // console.log('basket' , this.state.basket);
    }
    openProduct() {}
    getCatalog() {}
    getData() {
        // console.log("getData");
        const req = {
            log: "admin",
            pas: "ie1f32sq"
        };
        return fetch("https://subexpress.ru/apps_api/", {
            method: "post",
            body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then(res => {
                this.setState(
                    {
                        isLoading: false,
                        catalog: res.catalog.cats,
                        products: res.catalog.products,
                        user: res.user,
                        stocks: res.stocks
                    },
                    function() {

                    }
                );

                // console.log('res' , responseJson.user);
            })
            .catch(error => {
                console.error(error);
            });
    }
    makeOrder(obj) {
        // console.log("makeOrder", obj);
    }
    addToFavorive(id) {
        let favorite: Array<number> = this.state.favorite;
        favorite.push(id);
        this.setState({ favorite: favorite });
        // console.log("addToFavorive", this.state.favorite);
        
    }
    render() {
        return this.state.fontLoaded ? (
            <AppContainer
                key="app"
                screenProps={{
                    catalog: this.state.catalog,
                    products: this.state.products,
                    basket: this.state.basket,
                    basketApi: this.basketApi,
                    getCatalog: this.getCatalog,
                    makeOrder: this.makeOrder,
                    user: this.state.user,
                    stocks: this.state.stocks,
                    favorite: this.state.favorite,
                    addToFavorive: this.addToFavorive
                }}
            />
        ) : null;
    }
}



const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
   
    // Custom transitions go there
    if (nextScene.route.routeName === 'CategorySlider') {
      return fromBottom();
    } else{
        return fromRight();
    }
  }
const Home = createStackNavigator(
    {
       
        Home: HomeScreen,
        CategorySlider: CategorySlider,
        Order: Order,
        Catalog: {
            screen: Catalog,
            path: "catalog"
        },
        News: News
    },
    {
        initialRouteName: "Home",
        transitionConfig: (nav) => handleCustomTransition(nav)
    }
);
const AppNavigator = createDrawerNavigator(
    {
        Home: Home,
    },
    {
        contentComponent: Sidebar
    }
);


const AppContainer = createAppContainer(AppNavigator);

// export default ()=><View style={{flex: 1}}><AppContainer/></View>;
