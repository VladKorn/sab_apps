import React from "react";
import { View, ShadowPropTypesIOS } from "react-native";
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";
import { fromRight, fromBottom } from "react-navigation-transitions";
import * as Font from "expo-font";
import LoginForm from "./Components/LoginForm";
import HomeScreen from "./Components/HomeScreen";
import Catalog from "./Components/Catalog";
import News from "./Components/News";
import Order from "./Components/Order";
import CategorySlider from "./Components/CategorySlider";
import Sidebar from "./Components/Sidebar";
import SidebarCatalog from "./Components/SidebarCatalog";


interface State {
    user: object;
    catalog: object;
    basket: object;
    products: object;
    isLoading: boolean;
    fontLoaded: boolean;
    stocks: object;
    favorite: Array<number>;
    userError: object;
    // productId: number;
}
export default class App extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            catalog: {},
            favorite: [1206, 1343, 1344, 1346, 1239, 1243, 1245, 1354],
            products: {},
            stocks: {},
            basket: {
                "1231": { count: 3 },
                "1246": { count: 6 },
                "1247": { count: 1 }
            },
            isLoading: false,
            fontLoaded: false,
            userError: {},
        };

        // bind functions..
        this.getCatalog = this.getCatalog.bind(this);
        this.basketApi = this.basketApi.bind(this);
        this.getData = this.getData.bind(this);
        this.openProduct = this.openProduct.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.login = this.login.bind(this);
        
    }
    componentDidMount() {
        this.loadAssetsAsync();
        this.getData();
        // setTimeout(()=>{
        //     this.setState({  });

        // }, 5000)
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
            if (obj.params.count === 0) {
                delete basket[obj.params.productId];
            } else {
                basket[obj.params.productId] = { count: obj.params.count };
            }
            this.setState({ basket: basket });
        }
    }
    openProduct() {}
    getCatalog() {}
    getData(log = '' , pas = '') {
        const req = {
            // log: "admin",
            // pas: "ie1f32sq"
            log,
            pas,
        };
        
        return fetch("https://subexpress.ru/apps_api/", {
            method: "post",
            body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then(res => {
                console.log('res.user' , res.userError);
                this.setState(
                    {
                        isLoading: false,
                        userError: res.userError,
                        catalog: res.catalog.cats,
                        products: res.catalog.products,
                        user: res.user,
                        stocks: res.stocks
                    },
                    function() {}
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
    addToFavorite(id) {
        let favorite: Array<number> = this.state.favorite;
        let prodId = parseInt(id);
        if (favorite.includes(prodId)) {
            favorite = favorite.filter(item=>{return item !== prodId});
        }else{
            favorite.push(prodId);
        }
        
        this.setState({ favorite: favorite });
        // console.log("addToFavorite", this.state.favorite);
    }
    login(log , pas){
        this.getData(log , pas);
    }
    render() {
        console.log('user' , this.state.user);
        if(this.state.user && Object.keys(this.state.user).length === 0 || !this.state.user){
            return( <LoginForm login={this.login}  userError={this.state.userError}/> )
        }
        return ( this.state.fontLoaded ?
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
                    addToFavorite: this.addToFavorite
                }}
            /> 
        : null
        );
    }
}

const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    // Custom transitions go there
    if (nextScene.route.routeName === "CategorySlider") {
        return fromBottom();
    } else {
        return fromRight();
    }
};
const Home = createStackNavigator(
    {
        // LoginForm: LoginForm,
        Home: HomeScreen,
        CategorySlider: CategorySlider,
        Catalog: {
            screen: Catalog
        },
        News: News,
        Stocks: News,
        Favorites: News,
        OrderHistory: News,
        Addresses: News,
        User: News,
        Info: News,
        Contacts: News,
        OrderByPhone: News,

        Order: Order
    },
    {
        initialRouteName: "Home",
        transitionConfig: nav => handleCustomTransition(nav)
    }
);
const AppNavigator2 = createDrawerNavigator(
    {
        Home: Home
    },
    {
        contentComponent: Sidebar,

    }
);
const AppNavigator = createDrawerNavigator(
    {
        Home: AppNavigator2
    },
    {
        contentComponent: SidebarCatalog,
        drawerPosition: 'right'


    }
);

const AppContainer = createAppContainer(AppNavigator);

// export default ()=><View style={{flex: 1}}><AppContainer/></View>;
