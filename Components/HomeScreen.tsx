import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";

import Colors from "../constants/Colors.js";
import ImageSlider from "react-native-image-slider";
import appStyles from "./appStyles";

export default class HomeScreen extends React.Component<any> {
    render() {
        const sliderImages = [];
        Object.keys(this.props.screenProps.stocks).map(item=>{
            sliderImages.push(this.props.screenProps.stocks[item].img);
        });
        const products = this.props.screenProps.products ? Object.keys(this.props.screenProps.products).slice(0 , 6).map(key=>{
            const item = this.props.screenProps.products[key];
            return(
                <View key={item.name}>
                     <Image
                        style={{width: 130, height: 130}}
                                source={ {uri : 'https://subexpress.ru' + item.img} }
                    />
                    <Text>{item.name}</Text>
                    <Text>{item.price} руб.</Text>
                </View>
            )
        }) : null;
       
        // console.log('sliderImages' , this.props.screenProps.stocks);
        return (
            <SafeAreaView style={appStyles.page}>
                <View
                    style={{
                        // flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 30,
                        paddingRight: 30,
                        height: 70
                    }}
                >
                    <TouchableOpacity
                        onPress={this.props.navigation.openDrawer}
                    >
                        <Image
                            style={{ width: 22, height: 19 }}
                            source={require("../img/ico-menu.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Order")}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../img/ico-stock.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Order");
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 24 }}
                            source={require("../img/ico-orders.png")}
                        />
                        <View
                            style={{
                                backgroundColor: Colors.assent,
                                borderRadius: 50,
                                // justifyContent: "center",
                                alignItems: "center",
                                width: 23,
                                height: 23,
                                position: "absolute",
                                top: -11,
                                right: -11
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                    fontFamily: "Neuron-Heavy",
                                    lineHeight: 24
                                }}
                            >
                                {
                                    Object.entries(
                                        this.props.screenProps.basket
                                    ).length
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height: 270}}>
                <ImageSlider
                    loopBothSides
                    images={sliderImages}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image
                                source={{ uri: item }}
                                style={styles.customImage}
                            />
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View>
                        </View>
                      )}
                />
                </View>
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <Text style={appStyles.sectTitle}>Новинки</Text>
                    <ScrollView
                    horizontal={true}
                    >
                    {products}
                    </ScrollView>
                    <Text style={appStyles.sectTitle}>Меню</Text>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    customSlide: {
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    customImage: {
        width: '100%',
        height: 270
    }
});
