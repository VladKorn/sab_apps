import React from "react";
import {
    View,
    ScrollView,
    Text,
    Animated,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from "react-native";
import {BlurView} from 'expo-blur';
import Colors from "../constants/Colors.js";

import DatePicker from "react-native-datepicker";

import ProductItemOrder from "./ProductItemOrder";
import appStyles from "./appStyles";
import { processFontFamily } from "expo-font";
interface State {
    priceTotal: number;
    address: string;
    date: string;
    comment: string;
    promo: string;
    intensity: any;
    // data: any;
}
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class Order extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            priceTotal: 0,
            address: "",
            date: "2019-08-11",
            comment: "",
            promo: "",
            intensity: new Animated.Value(0),
        };
        this.setAddress = this.setAddress.bind(this);
        this.setDate = this.setDate.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }
    static navigationOptions = {
        title: "Оформление заказа"
    };
    componentDidMount() {
        this._blur();
        this.props.screenProps.getCatalog();
        
    }
    _blur = () => {
        let { intensity } = this.state;
        Animated.timing(intensity, {duration: 800, toValue: 100}).start(() => {
        //   Animated.timing(intensity, {duration: 2500, toValue: 0}).start(this._animate);
        });
      }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.screenProps !== this.props.screenProps) {
            let price = 0;
            const basket = this.props.screenProps.basket;
            const products = this.props.screenProps.products;
            Object.keys(basket).map(id => {
                price =
                    price +
                    parseInt(products[id].price) * parseInt(basket[id].count);
            });
            this.setState({ priceTotal: price });
        }
        if (
            this.state.address === "" &&
            this.props.screenProps.user.addresses
        ) {
            this.setState({
                address: this.props.screenProps.user.addresses[0].address
            });
        }
    }
    setAddress(address) {
        this.setState({ address: address });
        // console.log('addr' , this.state.address);
    }
    setDate(newDate) {
        // this.setState({chosenDate: newDate});
        this.props.navigation.actions.goBack();
    }
    makeOrder() {
        // this.props.screenProps.makeOrder({

        // });
        // ${this.selectedYear}-${formatnum(getmnum(this.selectedMonth))}-${formatnum(this.selectedDay)} 00:00:00

        let data: any = {};
        data.fUserId = "1";
        data.userId = "1";
        data.siteName = "s1";
        data.comment = this.state.comment;
        data.address = this.state.address;
        data.deliveryDate = this.state.date;

        data.products = this.props.screenProps.basket;

        // const orderButton = document.querySelector(`.jsOrderButton`);
        // if(orderButton){orderButton.disabled = true;}

        let headers = new Headers();
        headers.set("Accept", "application/json");
        let formData = new FormData();
        formData.append("json", JSON.stringify(data));
        // console.log("order sended-", data);
        fetch(`https://subexpress.ru/apps_api/order.php`, {
            method: "POST",
            headers,
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                // console.log("order fetch res-", res);
                if (res.sucsess) {
                    alert('ok')
                    // if(Swal){
                    //     Swal.fire({title: 'Спасибо! Ваш заказ принят. ', text:'' , type: 'success'});
                    // }
                }
            });
    }
    openDatePicker() {}
    render() {
        const basket = this.props.screenProps.basket;
        const products = this.props.screenProps.products;
        const addresses = this.props.screenProps.user.addresses || [];
        // console.log("addresses", this.props.screenProps.user.addresses);
        const items =
            Object.entries(basket).length !== 0 &&
            Object.entries(products).length !== 0
                ? Object.keys(basket).map(key => {
                      let item = products[key];
                      return (
                          <ProductItemOrder
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              img={item.img}
                              price={item.price}
                              count={parseInt(basket[item.id].count)}
                              basketApi={this.props.screenProps.basketApi}
                          />
                      );
                  })
                : [];
        const addressesItems = addresses.map(item => {
            const isCurrent = item.address === this.state.address;
            return (
                <TouchableHighlight
                    key={item.address}
                    underlayColor="white"
                    onPress={() => {
                        this.setAddress(item.address);
                    }}
                >
                    <View
                        style={{
                            height: 80,
                            borderWidth: isCurrent ? 3 : 1,
                            flex: 1,
                            flexDirection: "row",
                            borderColor: isCurrent ? Colors.assent : "#D6D6D6",
                            marginBottom: 10,
                            borderRadius: 10,
                            alignItems: "center",
                            padding: 15
                        }}
                    >
                        <Image
                            style={{ marginRight: 20 }}
                            source={
                                isCurrent
                                    ? require("../img/ico-address-active.png")
                                    : require("../img/ico-address.png")
                            }
                        />
                        <View>
                            <Text
                                style={{
                                    fontFamily: "Neuron-Bold",
                                    color: "#000000"
                                }}
                            >
                                {item.address}
                            </Text>
                            <Text>
                                г. Москва, ул. Олимлар, дом 25а,{"\n"} квартира
                                15
                            </Text>
                        </View>
                        {isCurrent ? (
                            <Image
                                style={{
                                    marginRight: 20,
                                    marginLeft: "auto",
                                    width: 19,
                                    height: 22
                                }}
                                source={require("../img/ico-ok.png")}
                            />
                        ) : null}
                    </View>
                </TouchableHighlight>
            );
        });
        return (
            <SafeAreaView style={appStyles.page}>
                
                <ScrollView
                    style={{
                        paddingVertical: 0,
                        paddingLeft: 15,
                        // paddingTop: 25,
                        flex: 1,
                        paddingRight: 15,
                        // marginTop: 35,
                    }}
                >
                    <Text style={appStyles.sectTitle}>Ваш заказ</Text>
                    {items}

                    <Text style={appStyles.sectTitle}>
                        Комментарий к заказу
                    </Text>
                    <TextInput
                        placeholder="Добавить комментарий к заказу"
                        style={appStyles.input}
                        onChangeText={comment =>
                            this.setState({ comment: comment })
                        }
                    />
                    <Text style={appStyles.sectTitle}>Промокод</Text>
                    <TextInput
                        placeholder="Ввести промокод"
                        style={appStyles.input}
                        onChangeText={promo => this.setState({ promo: promo })}
                    />
                    <Text style={appStyles.sectTitle}>Сумма для оплаты</Text>
                    <View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text>Сумма заказа</Text>
                            <Text
                                style={{
                                    fontFamily: "Neuron-Heavy",
                                    marginLeft: "auto",
                                    color: Colors.gray
                                }}
                            >
                                {this.state.priceTotal} руб
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text>Доставка </Text>
                            <Text
                                style={{
                                    fontFamily: "Neuron-Heavy",
                                    marginLeft: "auto",
                                    color: Colors.gray
                                }}
                            >
                                {this.state.priceTotal < 1500 ? 150 : 0} руб
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text>Общая сумма</Text>
                            <Text
                                style={{
                                    fontFamily: "Neuron-Heavy",
                                    marginLeft: "auto",
                                    color: Colors.gray
                                }}
                            >
                                {this.state.priceTotal < 1500 ? this.state.priceTotal+150 : this.state.priceTotal} руб
                            </Text>
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('Delivery')}}
                    style={appStyles.buttonBottom}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>
                        Перейти к доставке
                    </Text>
                </TouchableOpacity>
                <AnimatedBlurView
                    style={StyleSheet.absoluteFill}
                    tint="light"
                    intensity={this.state.intensity}
                    blurRadius={0}
                />
                <Text>asdas</Text>
            </SafeAreaView>
        );
    }
}
