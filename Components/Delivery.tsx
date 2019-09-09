import React from "react";
import {
    View,
    ScrollView,
    Text,
    Button,
    TextInput,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
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

    // data: any;
}

export default class Order extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            priceTotal: 0,
            address: "",
            date: "2019-08-11",
            comment: "",
            promo: ""
        };
        this.setAddress = this.setAddress.bind(this);
        this.setDate = this.setDate.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }
    static navigationOptions = {
        title: "Оформление заказа2"
    };
    componentDidMount() {
        this.props.screenProps.getCatalog();
        // console.log('this.props.navigation', this.props.navigation);
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

        let data = {};
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
                        paddingRight: 15
                        // marginTop: 35,
                    }}
                >

                    

                    <Text style={appStyles.sectTitle}>Адрес</Text>
                    {addressesItems}
                    <Text style={appStyles.sectTitle}>
                        Дата и время доставки
                    </Text>

                    <TouchableHighlight onPress={this.openDatePicker}>
                        <Text>{this.state.date}</Text>
                    </TouchableHighlight>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require("../img/ico-date.png")}
                        hideText="true"
                        customStyles={{
                            dateIcon: {
                                position: "absolute",
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                width: 18,
                                height: 21
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={date => {
                            this.setState({ date: date });
                        }}
                    />
                </ScrollView>
                <TouchableOpacity
                    onPress={this.makeOrder}
                    style={appStyles.buttonBottom}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>
                        Оформить заказ
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
